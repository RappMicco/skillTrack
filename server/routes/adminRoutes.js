import express from "express";
import {
  createTraining,
  updateTrainingProvider,
} from "../controllers/trainingProviderController.js";
import {
  skillCategory,
  updateSkillCategory,
} from "../controllers/skillController.js";
import {
  skillProficiency,
  updateSkillProficiency,
} from "../controllers/skillProficiency.js";
import {
  skillMatrix,
  updateSkillMatrix,
} from "../controllers/skillMatrixController.js";
import {
  assignTraining,
  updateAssignTraining,
} from "../controllers/assignTraining.js";
import { protect } from "../middlewares/protectMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { validateResult } from "../middlewares/validateRequest.js";
import {
  validateTrainingProvider,
  validateSkillCategory,
  validateSkillProficiency,
  validateSkillMatrix,
  validateAssignTraining,
  validateCompetency,
  validateSkillCompetency,
} from "../validators/employeeValidator.js";

import {
  createCompetency,
  updateCompetency,
  createSkillCompetency,
} from "../controllers/compentencyMatrixController.js";

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

// create competency
router.post(
  "/create-competency",
  isAuthenticated,
  protect,
  validateCompetency,
  validateResult,
  createCompetency,
);
// create skill competency
router.post(
  "/create-skill-competency",
  isAuthenticated,
  protect,
  validateSkillCompetency,
  validateResult,
  createSkillCompetency,
);

router.put(
  "/update-skill-category/:id",
  isAuthenticated,
  protect,
  validateSkillCategory,
  validateResult,
  updateSkillCategory,
);

router.put(
  "/update-skill-matrix/:id",
  isAuthenticated,
  protect,
  validateSkillMatrix,
  validateResult,
  updateSkillMatrix,
);

router.put(
  "/update-skill-proficiency/:id",
  isAuthenticated,
  protect,
  validateSkillProficiency,
  validateResult,
  updateSkillProficiency,
);

router.put(
  "/update-training-provider/:id",
  isAuthenticated,
  protect,
  validateTrainingProvider,
  validateResult,
  updateTrainingProvider,
);

router.put(
  "/update-assigned-training/:id",
  isAuthenticated,
  protect,
  validateAssignTraining,
  validateResult,
  updateAssignTraining,
);

router.put(
  "/update-competency/:id",
  isAuthenticated,
  protect,
  validateCompetency,
  validateResult,
  updateCompetency,
);

export default router;
