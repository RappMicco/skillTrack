import express from "express";
import { getSkillInsights } from "../controllers/insightController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/skill-insights", isAuthenticated, getSkillInsights);

export default router;
