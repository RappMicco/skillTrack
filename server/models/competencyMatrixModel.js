import mongoose from "mongoose";

const competencySchema = new mongoose.Schema({
  competency: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export const Competency = mongoose.model("Competency", competencySchema);
