import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getPopularDestinations,
  cancelReservation,
  getTotalRevenueByAgency,
  getAverageReservationsPerDay,
  getMostPopularDestinations,
  getReservationDistributionByDate,
  getAverageBookingLeadTime,
  getTravelClassPreferences,
} from "../controllers/reservationController.js";

const router = express.Router();
router.get("/popular-destinations", getPopularDestinations);
router.get("/total-revenue-by-agency", getTotalRevenueByAgency);
router.get("/average-reservations-per-day", getAverageReservationsPerDay);
router.get("/most-popular-destinations", getMostPopularDestinations);
router.get(
  "/reservation-distribution-by-date",
  getReservationDistributionByDate
);
router.get("/average-booking-lead-time", getAverageBookingLeadTime);
router.get("/travel-class-preferences", getTravelClassPreferences);
router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/:id", getReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.post("/", createReservation);
router.delete("/:id/cancel", cancelReservation);

export default router;
