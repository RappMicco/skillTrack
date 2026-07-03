import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/db.js";
import { helmetConfig } from "./configs/helmetConfig.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 5565;

connectDB();

app.use(express.json());
app.use(cookieParser());

//update CORS to allow credentials and specify origin
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_PROD,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS not allowed form origin: ${origin}`));
  },
  credentials: true,
};

app.use(helmetConfig);
app.use(cors(corsOptions));
// END of CORS UPDATE

app.use("/api", employeeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", summaryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
