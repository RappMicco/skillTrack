import express from "express";
import {
  checkEmployeeId,
  registerEmployee,
  updateEmployeeData,
} from "../controllers/auth.js";
import {
  validateEmployeeId,
  validateRegistration,
  validateUpdateEmployee,
} from "../validators/employeeValidator.js";
import { validateResult } from "../middlewares/validateRequest.js";
import { protect } from "../middlewares/protectMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/login", validateEmployeeId, validateResult, checkEmployeeId);
router.post(
  "/register",
  isAuthenticated,
  protect,
  validateRegistration,
  validateResult,
  registerEmployee,
);
router.put(
  "/update/:id",
  isAuthenticated,
  protect,
  validateUpdateEmployee,
  validateResult,
  updateEmployeeData,
);

export default router;
