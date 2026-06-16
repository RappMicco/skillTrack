import express from "express";
import { getTrainingStatusSummary } from "../controllers/getTrainingStatusController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-training-summary", isAuthenticated, getTrainingStatusSummary);

export default router;
