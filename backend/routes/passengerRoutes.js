import express from "express";
import {
  createPassenger,
  getAllPassengers,
  getPassenger,
  updatePassenger,
  deletePassenger,
} from "../controllers/passengerController.js";

const router = express.Router();

router.post("/", createPassenger);
router.get("/", getAllPassengers);
router.get("/:id", getPassenger);
router.put("/:id", updatePassenger);
router.delete("/:id", deletePassenger);

export default router;
