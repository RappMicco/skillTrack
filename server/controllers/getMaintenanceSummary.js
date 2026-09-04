import mongoose from "mongoose";
import { Employee } from "../models/employeesModel.js";
import { EmployeeTraining } from "../models/employeeTrainingModel.js";
import { Skill } from "../models/skillModel.js";
import { SkillMatrix } from "../models/skillMatrixModel.js";
import { SkillProficiency } from "../models/skillProficiencyModel.js";
import { Training } from "../models/trainingModel.js";

export const employeesSummary = async (req, res) => {
  try {
    const summary = await Employee.aggregate([
      {
        $match: {
          group: { $ne: "admin" },
          isActive: true,
        },
      },
      {
        $project: {
          empId: 1,
          firstName: 1,
          lastName: 1,
          empLevel: 1,
          fullName: {
            $trim: {
              input: {
                $concat: [
                  { $ifNull: ["$firstName", ""] },
                  " ",
                  { $ifNull: ["$lastName", ""] },
                ],
              },
            },
          },
          group: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Summary error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of employees summary!",
      error: error.message,
    });
  }
};

export const assignedTrainingSummary = async (req, res) => {
  try {
    const summary = await EmployeeTraining.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "empId",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $unwind: {
          path: "$employee",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "employee.isActive": true,
        },
      },
      {
        $lookup: {
          from: "trainings",
          localField: "trainingId",
          foreignField: "_id",
          as: "training",
        },
      },
      {
        $unwind: {
          path: "$training",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "status",
          localField: "statusId",
          foreignField: "_id",
          as: "status",
        },
      },
      {
        $unwind: {
          path: "$status",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          empId: "$employee.empId",
          fullName: {
            $trim: {
              input: {
                $concat: [
                  { $ifNull: ["$employee.firstName", ""] },
                  " ",
                  { $ifNull: ["$employee.lastName", ""] },
                ],
              },
            },
          },
          group: "$employee.group",
          empLevel: "$employee.empLevel",
          isActive: "$employee.isActive",
          trainingName: "$training.trainingName",
          trainingProvider: "$training.trainingProvider",
          status: "$status.status",
          startDate: 1,
          endDate: 1,
          progress: 1,
          remarks: 1,
          employeeId: "$employee._id",
          trainingId: "$training._id",
          statusId: "$status._id",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Summary error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of assigned training summary!",
      error: error.message,
    });
  }
};

export const skillCategorySummary = async (req, res) => {
  try {
    const summary = await Skill.aggregate([
      {
        $project: {
          skillName: 1,
          category: 1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No skill category data found! Please contact the administrator. ",
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Summary error: ", error);
    return res.status(500).json({
      success: false,
      message:
        "Server error during fetching of skill name and categor summary!",
      error: error.message,
    });
  }
};

export const skillMatrixSummary = async (req, res) => {
  try {
    const summary = await SkillMatrix.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "empId",
          foreignField: "_id",
          as: "employee",
        },
      },
      {
        $unwind: {
          path: "$employee",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "employee.isActive": true,
        },
      },
      {
        $lookup: {
          from: "skills",
          localField: "skill",
          foreignField: "_id",
          as: "skill",
        },
      },
      {
        $unwind: {
          path: "$skill",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "skillproficiencies",
          localField: "proficiency",
          foreignField: "_id",
          as: "proficiency",
        },
      },
      {
        $unwind: {
          path: "$proficiency",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          empId: "$employee.empId",
          fullName: {
            $trim: {
              input: {
                $concat: [
                  { $ifNull: ["$employee.firstName", ""] },
                  " ",
                  { $ifNull: ["$employee.lastName", ""] },
                ],
              },
            },
          },
          group: "$employee.group",
          empLevel: "$employee.empLevel",
          skillName: "$skill.skillName",
          skillCategory: "$skill.category",
          proficiencySequence: "$proficiency.sequence",
          proficiencyLevel: "$proficiency.level",
          proficiencyDescription: "$proficiency.description",
        },
      },
      {
        $group: {
          _id: "$empId",
          empId: { $first: "$empId" },
          fullName: { $first: "$fullName" },
          group: { $first: "$group" },
          empLevel: { $first: "$empLevel" },
          skills: {
            $push: {
              skillName: "$skillName",
              skillCategory: "$skillCategory",
              proficiencySequence: "$proficiencySequence",
              proficiencyLevel: "$proficiencyLevel",
              proficiencyDescription: "$proficiencyDescription",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          empId: 1,
          fullName: 1,
          group: 1,
          empLevel: 1,
          skills: 1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No skill matrix data found! Please contact the administrator. ",
      });
    }
    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Summary error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of skill matrix summary!",
      error: error.message,
    });
  }
};

export const skillProficiencySummary = async (req, res) => {
  try {
    const summary = await SkillProficiency.aggregate([
      {
        $project: {
          sequence: 1,
          level: 1,
          description: 1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No skill proficiency data found! Please contact the administrator. ",
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Summary error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetchinh of skill proficiency summary!",
      error: error.message,
    });
  }
};

export const trainingProviderSummary = async (req, res) => {
  try {
    const summary = await Training.aggregate([
      {
        $project: {
          trainingName: 1,
          trainingProvider: 1,
          trainingDescription: 1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No training provider data found! Please contact the administrator. ",
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Summary error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of training provider summary!",
      error: error.message,
    });
  }
};

export const getEmployeeMaintenanceList = async (req, res) => {
  try {
    const summary = await Employee.aggregate([
      {
        $match: {
          group: { $ne: "admin" },
        },
      },
      {
        $project: {
          empId: 1,
          firstName: 1,
          lastName: 1,
          empLevel: 1,
          isActive: 1,
          fullName: {
            $trim: {
              input: {
                $concat: [
                  { $ifNull: ["$firstName", ""] },
                  " ",
                  { $ifNull: ["$lastName", ""] },
                ],
              },
            },
          },
          group: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Summary error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of employee maintenance list!",
      error: error.message,
    });
  }
};
