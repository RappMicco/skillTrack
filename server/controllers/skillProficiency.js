import mongoose from "mongoose";
import { SkillProficiency } from "../models/skillProficiencyModel.js";

export const skillProficiency = async (req, res) => {
  try {
    //check lastSequence
    const lastRecord = await SkillProficiency.findOne().sort({ sequence: -1 });
    let sequence = lastRecord ? lastRecord.sequence + 1 : 1;

    const { description } = req.body;

    const skillProficiencyRecord = await SkillProficiency.create({
      sequence,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Created successfully!",
      data: skillProficiencyRecord,
    });
  } catch (error) {
    console.error("Create error: ", error);
    return res.status(400).json({
      success: false,
      message: "Server error during creation of skill proficiency!",
      error: error.message,
    });
  }
};

export const updateSkillProficiency = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill proficiency ID!",
      });
    }

    const skillProficiencyRecord = await SkillProficiency.findById(id);

    if (!skillProficiencyRecord) {
      return res.status(400).json({
        success: false,
        message: "Skill proficiency record not found!",
      });
    }

    const noChanges = skillProficiencyRecord.description === description;

    skillProficiencyRecord.description =
      description || skillProficiencyRecord.description;

    skillProficiencyRecord.save();

    await skillProficiencyRecord.populate("description");

    res.status(200).json({
      success: true,
      message: noChanges
        ? "No changes detected in the desciption field!"
        : "Description updated successfully!",
      data: noChanges ? "" : skillProficiencyRecord,
    });
  } catch (error) {
    console.error("Update error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during updating of skill proficiency!",
      error: error.message,
    });
  }
};
