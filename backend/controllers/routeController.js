import Route from "../models/Route.js";
import Reservation from "../models/Reservation.js";

// Create a new route
export const createRoute = async (req, res) => {
  try {
    const newRoute = new Route(req.body);
    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all routes
export const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate("availableTransports");
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single route by ID
export const getRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate(
      "availableTransports"
    );
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a route
export const updateRoute = async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRoute)
      return res.status(404).json({ message: "Route not found" });
    res.json(updatedRoute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a route
export const deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute)
      return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Route successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusiestRoutes = async (req, res) => {
  try {
    const busiestRoutes = await Reservation.aggregate([
      {
        $group: {
          _id: "$transport",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 }, // Adjust the limit as needed
      {
        $lookup: {
          from: "transports",
          localField: "_id",
          foreignField: "_id",
          as: "transportDetails",
        },
      },
      { $unwind: "$transportDetails" },
    ]);
    res.json(busiestRoutes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
