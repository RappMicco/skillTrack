import express from "express";
import { createTraining } from "../controllers/trainingProviderController.js";
import { skillCategory } from "../controllers/skillController.js";
import { skillProficiency } from "../controllers/skillProficiency.js";
import { protect } from "../middlewares/protectMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateResult } from "../middlewares/validateRequest.js";
import {
  validateTrainingProvider,
  validateSkillCategory,
  validateSkillProficiency,
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

export default router;
