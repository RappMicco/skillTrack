import express from "express";
import { getTrainingStatusSummary } from "../controllers/getTrainingStatusController.js";
import { employeesSummary } from "../controllers/getMaintenanceSummary.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-training-summary", isAuthenticated, getTrainingStatusSummary);
router.get("/get-employees", isAuthenticated, employeesSummary);

export default router;
