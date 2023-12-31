import Passenger from "../models/Passenger.js";

// Create a new passenger
export const createPassenger = async (req, res) => {
  try {
    const newPassenger = new Passenger(req.body);
    const savedPassenger = await newPassenger.save();
    res.status(201).json(savedPassenger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all passengers
export const getAllPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.json(passengers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single passenger by ID
export const getPassenger = async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);
    if (!passenger)
      return res.status(404).json({ message: "Passenger not found" });
    res.json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a passenger
export const updatePassenger = async (req, res) => {
  try {
    const updatedPassenger = await Passenger.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPassenger)
      return res.status(404).json({ message: "Passenger not found" });
    res.json(updatedPassenger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a passenger
export const deletePassenger = async (req, res) => {
  try {
    const deletedPassenger = await Passenger.findByIdAndDelete(req.params.id);
    if (!deletedPassenger)
      return res.status(404).json({ message: "Passenger not found" });
    res.json({ message: "Passenger successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
