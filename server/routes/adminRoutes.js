import express from "express";
import { createTraining } from "../controllers/trainingProviderController.js";
import { skillCategory } from "../controllers/skillController.js";
import { skillProficiency } from "../controllers/skillProficiency.js";
import { skillMatrix } from "../controllers/skillMatrixController.js";
import { assignTraining } from "../controllers/assignTraining.js";
import { protect } from "../middlewares/protectMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateResult } from "../middlewares/validateRequest.js";
import {
  validateTrainingProvider,
  validateSkillCategory,
  validateSkillProficiency,
  validateSkillMatrix,
  validateAssignTraining,
} from "../validators/employeeValidator.js";

const router = express.Router();

router.post(
  "/create-training",
  isAuthenticated,
  protect,
  validateTrainingProvider,
  validateResult,
  createTraining,
);
router.post(
  "/create-skill-category",
  isAuthenticated,
  protect,
  validateSkillCategory,
  validateResult,
  skillCategory,
);

router.post(
  "/create-skill-proficiency",
  isAuthenticated,
  protect,
  validateSkillProficiency,
  validateResult,
  skillProficiency,
);

router.post(
  "/create-skill-matrix",
  isAuthenticated,
  protect,
  validateSkillMatrix,
  validateResult,
  skillMatrix,
);

router.post(
  "/assign-training",
  isAuthenticated,
  protect,
  validateAssignTraining,
  validateResult,
  assignTraining,
);

export default router;
