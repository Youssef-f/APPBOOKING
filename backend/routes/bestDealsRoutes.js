// routes/bestDealsRoutes.js
import express from "express";
import {
  getBestDeals,
  getAverageprice,
} from "../controllers/bestDealsController.js";

const router = express.Router();

router.get("/", getBestDeals);
router.get("/averageprice", getAverageprice);

export default router;
