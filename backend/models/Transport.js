// models/Transport.js
import mongoose from "mongoose";

const transportSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'Flight', 'Bus', 'Train'
  company: String, // Airline or Transport Company
  departureTime: Date,
  arrivalTime: Date,
  origin: String,
  destination: String,
  totalSeats: Number,
  price: Number,
});

const Transport = mongoose.model("Transport", transportSchema);

export default Transport;
