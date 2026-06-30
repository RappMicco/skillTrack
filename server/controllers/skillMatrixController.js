import mongoose from "mongoose";
import { SkillMatrix } from "../models/skillMatrixModel.js";

export const skillMatrix = async (req, res) => {
  try {
    const { empId, skill, proficiency } = req.body;

    const existingSkill = await SkillMatrix.findOne({ empId, skill });

    if (existingSkill) {
      return res.status(400).json({
        success: false,
        message: "Skill already exists for this employee!",
      });
    }

    const matrix = await SkillMatrix.create({
      empId,
      skill,
      proficiency,
    });

    res.status(201).json({
      success: true,
      message: "Successfully added!",
      matrix,
    });
  } catch (error) {
    console.error("Create error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during adding of skill matrix",
      error: error.message,
    });
  }
};

export const updateSkillMatrix = async (req, res) => {
  try {
    const { id } = req.params;
    const { empId, skill, proficiency } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Skill Matrix ID!",
      });
    }

    const skillMatrixRecord = await SkillMatrix.findById(id);

    if (!skillMatrixRecord) {
      return res.status(400).json({
        success: false,
        message: "Skill matrix record not found!",
      });
    }

    const checkChanges =
      skillMatrixRecord.empId === empId &&
      skillMatrixRecord.skill === skill &&
      skillMatrixRecord.proficiency === proficiency;

    skillMatrixRecord.empId = empId || skillMatrixRecord.empId;
    skillMatrixRecord.skill = skill || skillMatrixRecord.skill;
    skillMatrixRecord.proficiency || skillMatrixRecord.proficiency;

    skillMatrixRecord.save();

    await skillMatrixRecord.populate([
      {
        path: "empId",
        select: "empId",
      },
      {
        path: "skill",
        select: "skillName category",
      },
      {
        path: "proficiency",
        select: "sequence description",
      },
    ]);

    res.status(200).json({
      success: true,
      message: checkChanges
        ? "No changes detected!"
        : "Skill matrix updated successfully!",
      data: checkChanges ? "" : skillMatrixRecord,
    });
  } catch (error) {
    console.error("Update error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during updating of Skill matrix details!",
      error: error.message,
    });
  }
};
