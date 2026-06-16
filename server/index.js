import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 5565;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api", employeeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", summaryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
