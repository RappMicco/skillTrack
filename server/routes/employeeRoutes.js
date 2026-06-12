import express from "express";
import { checkEmployeeId, registerEmployee } from "../controllers/auth.js";
import {
  validateEmployeeId,
  validateRegistration,
} from "../validators/employeeValidator.js";
import { validateResult } from "../middlewares/validateRequest.js";
import { protect } from "../middlewares/protectMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/login", validateEmployeeId, validateResult, checkEmployeeId);
router.post(
  "/register",
  protect,
  validateRegistration,
  validateResult,
  isAuthenticated,
  registerEmployee,
);

export default router;
