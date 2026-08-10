import mongoose, { mongo } from "mongoose";

const skillCompetencySchema = new mongoose.Schema({
  competencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Competency",
    required: true,
    unique: true,
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
    unique: true,
  },
});

export const SkillCompetency = mongoose.model(
  "SkillCompetency",
  skillCompetencySchema,
);
