import mongoose from "mongoose";
import { Competency } from "../models/competencyMatrixModel.js";
import { SkillCompetency } from "../models/skillCompetencyModel.js";

export const createCompetency = async (req, res) => {
  try {
    const { competency } = req.body;

    const isExisting = await Competency.findOne({ competency });

    if (isExisting) {
      res.status(400).json({
        success: false,
        message: "Compentency name existed!",
      });
    }

    const competencyRecord = await Competency.create({
      competency,
    });

    res.status(201).json({
      success: true,
      message: "Created successfully!",
    });
  } catch (error) {
    console.error("Compentency error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during creating of compentency data!",
      error: error.message,
    });
  }
};

export const updateCompetency = async (req, res) => {
  try {
    const { id } = req.params;
    const { competency } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid competency ID!",
      });
    }

    const compentencyRecord = await Competency.findById(id);

    if (!compentencyRecord) {
      return res.status(400).json({
        success: false,
        message: "Competency record not found!",
      });
    }

    const noRecordChanges = compentencyRecord.competency === competency;

    if (noRecordChanges) {
      return res.status(200).json({
        success: true,
        message: "No changes detected!",
      });
    }

    compentencyRecord.competency = competency ?? compentencyRecord.competency;

    await compentencyRecord.save();

    return res.status(200).json({
      success: true,
      message: "Updated successfully!",
      data: compentencyRecord,
    });
  } catch (error) {
    console.error("Update error: ", error);
    res.status(500).json({
      success: false,
      message: "Server error during updating of competency data!",
      error: error.message,
    });
  }
};

export const createSkillCompetency = async (req, res) => {
  try {
    const { competencyId, skillId } = req.body;

    const skillCompetency = await SkillCompetency.findOne({
      competencyId,
      skillId,
    });

    if (skillCompetency) {
      return res.status(400).json({
        success: false,
        message: "Skill competency already existed!",
      });
    }

    const data = await SkillCompetency.create({
      competencyId,
      skillId,
    });

    await data.populate([
      {
        path: "competencyId",
        select: "competency",
      },
      {
        path: "skillId",
        select: "skillName",
      },
    ]);

    res.status(200).json({
      success: false,
      message: "Added successfully!",
      data,
    });
  } catch (error) {
    console.error("Creating Skill Competency Error: ", error);
    res.status(500).json({
      success: false,
      message: "Server error during creating skill competency data!",
      error: error.message,
    });
  }
};
