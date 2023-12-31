import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import transportRoutes from "./routes/transportRoutes.js";
import passengerRoutes from "./routes/passengerRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import bestDealsRoutes from "./routes/bestDealsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB = process.env.MONGO_URL;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("db connected");
});

db.on("error", (err) => {
  console.log("error connecting");
});

app.get("/test", (req, res) => {
  res.json("ok");
});
app.use("/api/transports", transportRoutes);
app.use("/api/passengers", passengerRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/best-deals", bestDealsRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
