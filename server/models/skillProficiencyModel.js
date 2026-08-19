import mongoose from "mongoose";

const skillProficiencySchema = new mongoose.Schema({
  sequence: {
    type: Number,
    unique: true,
    default: 0,
  },
  level: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export const SkillProficiency = mongoose.model(
  "SkillProficiency",
  skillProficiencySchema,
);
