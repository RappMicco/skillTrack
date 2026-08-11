import mongoose, { mongo } from "mongoose";
// for removal
const skillCompetencySchema = new mongoose.Schema({
  competencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Competency",
    required: true,
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
});

export const SkillCompetency = mongoose.model(
  "SkillCompetency",
  skillCompetencySchema,
);
