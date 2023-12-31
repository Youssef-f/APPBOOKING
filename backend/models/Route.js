// models/Route.js
import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  origin: { type: String, index: true }, // Index added
  destination: { type: String, index: true }, // Index added
  availableTransports: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Transport" },
  ],
  routeDetails: String,
});

const Route = mongoose.model("Route", routeSchema);

export default Route;
