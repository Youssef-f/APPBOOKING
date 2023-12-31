// routes/searchRoutes.js
import express from "express";
import { searchTravels } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchTravels);

export default router;
