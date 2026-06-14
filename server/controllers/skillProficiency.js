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

    res.status(200).json({
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
