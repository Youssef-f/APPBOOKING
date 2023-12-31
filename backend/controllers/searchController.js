// controllers/searchController.js
import Transport from "../models/Transport.js"; // Import your Transport model

export const searchTravels = async (req, res) => {
  try {
    const { destination, date } = req.query;

    // Parse the date from the query parameter (ensure the date format is consistent)
    // Example: date format "YYYY-MM-DD"
    const searchDate = new Date(date);

    // Query: find transports to the destination on the given date
    const results = await Transport.find({
      destination: destination,
      // Assuming you have a 'departureTime' or similar field in your Transport model
      departureTime: {
        $gte: searchDate,
        $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000), // Adds one day in milliseconds
      },
    });

    res.json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
