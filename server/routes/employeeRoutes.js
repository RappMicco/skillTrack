import express from "express";
import {
  checkEmployeeId,
  registerEmployee,
  updateEmployeeData,
  getMe,
  logOutUser,
} from "../controllers/auth.js";
import {
  validateEmployeeId,
  validateRegistration,
  validateUpdateEmployee,
} from "../validators/employeeValidator.js";
import { validateResult } from "../middlewares/validateRequest.js";
import { protect, protectUser } from "../middlewares/protectMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", validateEmployeeId, validateResult, checkEmployeeId);
router.post(
  "/register",
  isAuthenticated,
  protect,
  validateRegistration,
  validateResult,
  registerEmployee,
);
router.get("/getMe", protectUser, getMe);
router.put(
  "/update/:id",
  isAuthenticated,
  protect,
  validateUpdateEmployee,
  validateResult,
  updateEmployeeData,
);
router.post("/logout", logOutUser);

export default router;
