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

export const getTopFiveSkills = async (req, res) => {
  try {
    const topSkills = await SkillMatrix.aggregate([
      {
        $lookup: {
          from: "skills",
          localField: "skill",
          foreignField: "_id",
          as: "skillDetails",
        },
      },
      {
        $unwind: {
          path: "$skillDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "skillproficiencies",
          localField: "proficiency",
          foreignField: "_id",
          as: "proficiencyDetails",
        },
      },
      {
        $unwind: {
          path: "$proficiencyDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$skill",
          skillName: {
            $first: "$skillDetails.skillName",
          },
          totalEmployees: {
            $addToSet: "empId",
          },
          averageProficiency: {
            $avg: "$proficiencyDetails.sequence",
          },
        },
      },
      {
        $project: {
          _id: 0,
          skillId: "$_id",
          skillName: 1,
          employeeCount: {
            $size: "$totalEmployees",
          },
          averageProficiency: {
            $round: ["$averageProficiency", 1],
          },
        },
      },

      {
        $sort: {
          employeeCount: -1,
          averageProficiency: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      success: true,
      count: topSkills.length,
      data: topSkills,
    });
  } catch (error) {
    console.error("Fetching error: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve top skills!",
      error: error.message,
    });
  }
};
