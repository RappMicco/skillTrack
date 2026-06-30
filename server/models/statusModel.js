import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Status = mongoose.model("Status", statusSchema);
