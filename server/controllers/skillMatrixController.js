import mongoose from "mongoose";
import { SkillMatrix } from "../models/skillMatrixModel.js";
import { Employee } from "../models/employeesModel.js";

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
      skillMatrixRecord.empId.equals(empId) &&
      skillMatrixRecord.skill.equals(skill) &&
      skillMatrixRecord.proficiency.equals(proficiency);

    skillMatrixRecord.empId = empId || skillMatrixRecord.empId;
    skillMatrixRecord.skill = skill || skillMatrixRecord.skill;
    skillMatrixRecord.proficiency =
      proficiency || skillMatrixRecord.proficiency;

    await skillMatrixRecord.save();

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

export const getTopFiveExpertSkills = async (req, res) => {
  try {
    const topSkills = await SkillMatrix.aggregate([
      // Get employee details
      {
        $lookup: {
          from: "employees",
          localField: "empId",
          foreignField: "_id",
          as: "employeeDetails",
        },
      },
      {
        $unwind: {
          path: "$employeeDetails",
          preserveNullAndEmptyArrays: false,
        },
      },

      // Include only active employees and exclude admins
      {
        $match: {
          "employeeDetails.isActive": true,
          "employeeDetails.group": {
            $ne: "admin",
          },
        },
      },

      // Get skill details
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
          preserveNullAndEmptyArrays: false,
        },
      },

      // Get proficiency details
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
          preserveNullAndEmptyArrays: false,
        },
      },

      /*
       * Group by employee and skill first.
       */
      {
        $group: {
          _id: {
            skillId: "$skill",
            employeeId: "$empId",
          },

          skillName: {
            $first: "$skillDetails.skillName",
          },

          employee: {
            $first: {
              _id: "$employeeDetails._id",
              empId: "$employeeDetails.empId",
              firstName: "$employeeDetails.firstName",
              lastName: "$employeeDetails.lastName",
            },
          },

          proficiencyLevel: {
            $max: "$proficiencyDetails.sequence",
          },
        },
      },

      // Group all unique employees under each skill
      {
        $group: {
          _id: "$_id.skillId",

          skillName: {
            $first: "$skillName",
          },

          employees: {
            $addToSet: {
              _id: "$employee._id",
              empId: "$employee.empId",
              fullName: {
                $trim: {
                  input: {
                    $concat: [
                      {
                        $ifNull: ["$employee.firstName", ""],
                      },
                      " ",
                      {
                        $ifNull: ["$employee.lastName", ""],
                      },
                    ],
                  },
                },
              },
            },
          },

          totalProficiency: {
            $sum: "$proficiencyLevel",
          },

          averageProficiency: {
            $avg: "$proficiencyLevel",
          },

          highestProficiency: {
            $max: "$proficiencyLevel",
          },
        },
      },

      {
        $addFields: {
          employeeCount: {
            $size: "$employees",
          },
        },
      },

      // Calculate the average proficiency percentage
      {
        $project: {
          _id: 0,
          skillId: "$_id",
          skillName: 1,
          employeeCount: 1,
          employees: 1,
          totalProficiency: 1,
          highestProficiency: 1,

          averageProficiency: {
            $round: ["$averageProficiency", 2],
          },

          expertisePercentage: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: ["$averageProficiency", 5],
                  },
                  100,
                ],
              },
              1,
            ],
          },
        },
      },

      // Highest expertise percentage first
      {
        $sort: {
          expertisePercentage: -1,
          employeeCount: -1,
        },
      },

      // Get only the top six
      {
        $limit: 6,
      },
    ]);

    return res.status(200).json({
      success: true,
      count: topSkills.length,
      data: topSkills,
    });
  } catch (error) {
    console.error("Fetching top expert skills error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve top expert skills!",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const skillSummary = async (req, res) => {
  try {
    const [totalEmployees, proficiencySummary] = await Promise.all([
      // Count ALL active non-admin employees
      Employee.countDocuments({
        isActive: true,
        group: { $ne: "admin" },
      }),

      // Count unique employees by proficiency
      SkillMatrix.aggregate([
        {
          $lookup: {
            from: "employees",
            localField: "empId",
            foreignField: "_id",
            as: "employee",
          },
        },
        {
          $unwind: "$employee",
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
          $unwind: "$proficiency",
        },

        {
          $match: {
            "employee.isActive": true,
            "employee.group": { $ne: "admin" },
          },
        },

        {
          $group: {
            _id: null,

            expertEmployees: {
              $addToSet: {
                $cond: [
                  { $eq: ["$proficiency.sequence", 5] },
                  "$employee._id",
                  "$$REMOVE",
                ],
              },
            },

            advancedEmployees: {
              $addToSet: {
                $cond: [
                  { $eq: ["$proficiency.sequence", 4] },
                  "$employee._id",
                  "$$REMOVE",
                ],
              },
            },

            intermediateEmployees: {
              $addToSet: {
                $cond: [
                  { $eq: ["$proficiency.sequence", 3] },
                  "$employee._id",
                  "$$REMOVE",
                ],
              },
            },
          },
        },

        {
          $project: {
            _id: 0,

            expert: {
              $size: "$expertEmployees",
            },

            advanced: {
              $size: "$advancedEmployees",
            },

            intermediate: {
              $size: "$intermediateEmployees",
            },
          },
        },
      ]),
    ]);

    const proficiency = proficiencySummary[0] ?? {
      expert: 0,
      advanced: 0,
      intermediate: 0,
    };

    return res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        expert: proficiency.expert,
        advanced: proficiency.advanced,
        intermediate: proficiency.intermediate,
      },
    });
  } catch (error) {
    console.error("Fetching Skill Summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during fetching of skill summary!",
      error: error.message,
    });
  }
};
