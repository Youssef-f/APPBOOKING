// models/Passenger.js
import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  identificationNumber: String, // Passport or other ID
});

const Passenger = mongoose.model("Passenger", passengerSchema);

export default Passenger;
