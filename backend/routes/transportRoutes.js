import express from "express";
import {
  getAllTransports,
  createTransport,
  getTransport,
  updateTransport,
  deleteTransport,
  getAvailableSeats,
} from "../controllers/transportController.js";

const router = express.Router();

router.get("/", getAllTransports);
router.post("/", createTransport);
router.get("/:id", getTransport);
router.put("/:id", updateTransport);
router.delete("/:id", deleteTransport);
router.get("/:transportId/available-seats", getAvailableSeats);

export default router;
