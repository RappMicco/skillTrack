import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log({
      error: error.message,
    });
  }
};
