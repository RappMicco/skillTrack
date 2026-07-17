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
import {
  upcomingSummary,
  pendingSummary,
  ongoingSummary,
  completedSummary,
  getRecentTrainingSummary,
} from "../controllers/getTrainingStatusController.js";
import { getTopFiveExpertSkills } from "../controllers/skillMatrixController.js";

const router = express.Router();

router.get("/get-training-summary", isAuthenticated, getTrainingStatusSummary);
router.get("/get-employees", isAuthenticated, employeesSummary);
router.get("/get-assigned-training", isAuthenticated, assignedTrainingSummary);
router.get("/get-skill-category", isAuthenticated, skillCategorySummary);
router.get("/get-skill-matrix", isAuthenticated, skillMatrixSummary);
router.get("/get-skill-proficiency", isAuthenticated, skillProficiencySummary);
router.get("/get-training-provider", isAuthenticated, trainingProviderSummary);
// upcoming // pending // ongoing // completed
router.get("/get-upcoming-training", isAuthenticated, upcomingSummary);
router.get("/get-pending-training", isAuthenticated, pendingSummary);
router.get("/get-ongoing-training", isAuthenticated, ongoingSummary);
router.get("/get-completed-training", isAuthenticated, completedSummary);
router.get(
  "/get-recent-completed-trainings",
  isAuthenticated,
  getRecentTrainingSummary,
);
router.get("/get-top-skills", isAuthenticated, getTopFiveExpertSkills);

export default router;
