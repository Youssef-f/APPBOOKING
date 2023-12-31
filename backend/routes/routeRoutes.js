import express from "express";
import {
  createRoute,
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
  getBusiestRoutes,
} from "../controllers/routeController.js";
import Reservation from "../models/Reservation.js"; // Adjust the path as necessary

const router = express.Router();
router.get("/busiest", getBusiestRoutes);
router.post("/", createRoute);
router.get("/", getAllRoutes);
router.get("/:id", getRoute);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

export default router;
