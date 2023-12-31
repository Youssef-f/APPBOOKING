// controllers/bestDealsController.js
import Reservation from "../models/Reservation.js"; // Adjust the model import as per your setup

export const getBestDeals = async (req, res) => {
  try {
    const bestDeals = await Reservation.aggregate([
      {
        $lookup: {
          from: "transports",
          localField: "transport",
          foreignField: "_id",
          as: "transportDetails",
        },
      },
      { $unwind: "$transportDetails" },
      {
        $group: {
          _id: {
            destination: "$transportDetails.destination",
            transportType: "$transportDetails.type",
          },
          averagePrice: { $avg: "$price" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 }, // Top 10 deals
    ]);

    res.json(bestDeals);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAverageprice = async (req, res) => {
  try {
    const averagePrices = await Reservation.aggregate([
      {
        $match: { price: { $exists: true, $ne: null } }, // Ensure price exists and is not null
      },
      {
        $lookup: {
          from: "transports",
          localField: "transport",
          foreignField: "_id",
          as: "transportDetails",
        },
      },
      { $unwind: "$transportDetails" },
      {
        $group: {
          _id: "$transportDetails.type",
          averagePrice: { $avg: "$price" },
        },
      },
    ]);
    res.json(averagePrices);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
