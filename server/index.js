import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/db.js";

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 5565;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
