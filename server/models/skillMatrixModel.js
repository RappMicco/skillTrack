import mongoose from "mongoose";

const skillMatrixSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  proficiency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillProficiency",
    required: true,
  },
});

export const SkillMatrix = mongoose.model("SkillMatrix", skillMatrixSchema);
