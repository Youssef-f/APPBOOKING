import Transport from "../models/Transport.js";
import Reservation from "../models/Reservation.js";

// Create a new transport
export const createTransport = async (req, res) => {
  try {
    const newTransport = new Transport(req.body);
    const savedTransport = await newTransport.save();
    res.status(201).json(savedTransport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all transports
export const getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.json(transports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single transport by ID
export const getTransport = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport)
      return res.status(404).json({ message: "Transport not found" });
    res.json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a transport
export const updateTransport = async (req, res) => {
  try {
    const updatedTransport = await Transport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTransport)
      return res.status(404).json({ message: "Transport not found" });
    res.json(updatedTransport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a transport
export const deleteTransport = async (req, res) => {
  try {
    const deletedTransport = await Transport.findByIdAndDelete(req.params.id);
    if (!deletedTransport)
      return res.status(404).json({ message: "Transport not found" });
    res.json({ message: "Transport successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAvailableSeats = async (req, res) => {
  try {
    const transportId = req.params.transportId;

    // Fetch the total seats for the transport
    const transport = await Transport.findById(transportId);
    if (!transport) return res.status(404).send("Transport not found");

    // Fetch all reservations for this transport
    const reservations = await Reservation.find({ transport: transportId });

    // Assuming each transport has a fixed number of seats (e.g., 1-100)
    let availableSeats = [];
    for (let i = 1; i <= transport.totalSeats; i++) {
      if (!reservations.some((res) => res.seatNumber === i.toString())) {
        availableSeats.push(i);
      }
    }

    res.json(availableSeats);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
