import Reservation from "../models/Reservation.js";
import Transport from "../models/Transport.js";

// Create a new reservation
export const createReservation = async (req, res) => {
  console.log("Received reservation data:", req.body);
  try {
    const {
      passenger,
      transport: transportId,
      travelDate,
      seatNumber,
      travelClass,
    } = req.body;

    // Ensure that passengerId and transportId are provided
    if (!passenger || !transportId) {
      return res
        .status(400)
        .json({ message: "Passenger and Transport IDs are required" });
    }
    const existingReservation = await Reservation.findOne({
      transportId,
      seatNumber,
    });
    if (existingReservation) {
      return res.status(400).json({ message: "Seat is already booked" });
    }
    const transport = await Transport.findById(transportId);
    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }
    const price = transport.price;
    // Create a new reservation document
    const newReservation = new Reservation({
      passenger,
      transport: transportId,
      travelDate,
      seatNumber,
      travelClass,
      bookingDate: new Date(), // Set booking date to current date
      price,
    });

    // Save the reservation to the database
    const savedReservation = await newReservation.save();

    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Retrieve all reservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("passenger")
      .populate("transport");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single reservation by ID
export const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("passenger")
      .populate("transport");
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a reservation
export const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a reservation
export const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.json({ message: "Reservation successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPopularDestinations = async (req, res) => {
  try {
    const popularDestinations = await Reservation.aggregate([
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
          _id: "$transportDetails.destination",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json(popularDestinations);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    // You might want to check if the user canceling the reservation is the one who made it
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ message: "Reservation successfully cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTotalRevenueByAgency = async (req, res) => {
  try {
    const totalRevenue = await Reservation.aggregate([
      {
        $group: {
          _id: "$agency",
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);
    res.json(totalRevenue);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getAverageReservationsPerDay = async (req, res) => {
  try {
    const averageReservations = await Reservation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" } },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          averageCount: { $avg: "$count" },
        },
      },
    ]);
    res.json(averageReservations);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getMostPopularDestinations = async (req, res) => {
  try {
    const popularDestinations = await Reservation.aggregate([
      {
        $group: {
          _id: "$destination",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json(popularDestinations);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getReservationDistributionByDate = async (req, res) => {
  try {
    const distribution = await Reservation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
    ]);
    res.json(distribution);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getAverageBookingLeadTime = async (req, res) => {
  try {
    const leadTime = await Reservation.aggregate([
      {
        $project: {
          leadTimeDays: {
            $divide: [
              { $subtract: ["$travelDate", "$bookingDate"] },
              1000 * 60 * 60 * 24, // Convert milliseconds to days
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          averageLeadTime: { $avg: "$leadTimeDays" },
        },
      },
    ]);
    res.json(leadTime);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getTravelClassPreferences = async (req, res) => {
  try {
    const classPreferences = await Reservation.aggregate([
      {
        $group: {
          _id: "$travelClass",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(classPreferences);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
