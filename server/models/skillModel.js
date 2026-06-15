import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Skill = mongoose.model("Skill", skillSchema);
