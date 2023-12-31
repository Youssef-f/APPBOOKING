import express from "express";
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
  transport: { type: mongoose.Schema.Types.ObjectId, ref: "Transport" },
  travelDate: Date,
  seatNumber: String,
  travelClass: String, // e.g., 'Economy', 'Business' for flights
  bookingDate: Date,
  price: Number,
  agency: String,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
