import express from "express";
import { getTrainingStatusSummary } from "../controllers/getTrainingStatusController.js";
import {
  employeesSummary,
  assignedTrainingSummary,
  skillCategorySummary,
  skillMatrixSummary,
  skillProficiencySummary,
  trainingProviderSummary,
} from "../controllers/getMaintenanceSummary.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-training-summary", isAuthenticated, getTrainingStatusSummary);
router.get("/get-employees", isAuthenticated, employeesSummary);
router.get("/get-assigned-training", isAuthenticated, assignedTrainingSummary);
router.get("/get-skill-category", isAuthenticated, skillCategorySummary);
router.get("/get-skill-matrix", isAuthenticated, skillMatrixSummary);
router.get("/get-skill-proficiency", isAuthenticated, skillProficiencySummary);
router.get("/get-training-provider", isAuthenticated, trainingProviderSummary);

export default router;
