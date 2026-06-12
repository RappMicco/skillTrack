import express from "express";
import { checkEmployeeId } from "../controllers/auth.js";
import { validateEmployeeId } from "../validators/employeeValidator.js";
import { validateResult } from "../middlewares/validateRequest.js";

const router = express.Router();

router.get("/login", validateEmployeeId, validateResult, checkEmployeeId);

export default router;
