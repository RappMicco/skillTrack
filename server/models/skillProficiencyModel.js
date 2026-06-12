import mongoose from "mongoose";

const skillProficienySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export const SkillProficiency = mongoose.model(
  "SkillProficiency",
  skillProficienySchema,
);
