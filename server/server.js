import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookies-parser";
import { connectDB } from "./configs/db.js";

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 5527;

app.use(express.json());

//database connection
connectDB();

// start server
app.listen(PORT, () => {
  console.log(`SkillTrack is running at http://localhost:${PORT}`);
});
