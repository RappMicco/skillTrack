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

    if (!competency?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Competency is required!",
      });
    }

    const competencyRecord = await Competency.findById(id);

    if (!competencyRecord) {
      return res.status(404).json({
        success: false,
        message: "Competency record not found!",
      });
    }

    const competencyValue = competency.trim();

    const noRecordChanges = competencyRecord.competency === competencyValue;

    if (noRecordChanges) {
      return res.status(200).json({
        success: true,
        message: "No changes detected!",
      });
    }

    competencyRecord.competency = competencyValue;

    await competencyRecord.save();

    return res.status(200).json({
      success: true,
      message: "Updated successfully!",
      data: competencyRecord,
    });
  } catch (error) {
    console.error("Update error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during updating of competency data!",
      error: error.message,
    });
  }
};
// for removal
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
      success: true,
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
// for checking if remove
export const fetchSkillCompetency = async (req, res) => {
  try {
    const summary = await SkillCompetency.aggregate([
      {
        $lookup: {
          from: "competencies",
          localField: "competencyId",
          foreignField: "_id",
          as: "competency",
        },
      },
      {
        $unwind: {
          path: "$competency",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "skills",
          localField: "skillId",
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
      //   get skill matrix
      {
        $lookup: {
          from: "skillmatrixes",
          localField: "skill._id",
          foreignField: "skill",
          as: "skillmatrix",
        },
      },
      {
        $unwind: {
          path: "$skillmatrix",
          preserveNullAndEmptyArrays: true,
        },
      },
      //   get sequence and description
      {
        $lookup: {
          from: "skillproficiencies",
          localField: "skillmatrix.proficiency",
          foreignField: "_id",
          as: "proficiency",
        },
      },
      //   get empId
      {
        $unwind: {
          path: "$proficiency",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "skillmatrix.empId",
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
      //   group skill + employees
      {
        $group: {
          _id: {
            competencyId: "$competency._id",
            skillId: "$skill._id",
          },

          competencyName: {
            $first: "$competency.competency",
          },

          skillCategory: {
            $first: "$skill.category",
          },

          skillName: {
            $first: "$skill.skillName",
          },

          employees: {
            $push: {
              employeeId: "$employee._id",
              employeeName: {
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
              proficiencySequence: "$proficiency.sequence",
              proficiencyDescription: "$proficiency.description",
            },
          },
        },
      },

      //   group competency + skills
      {
        $group: {
          _id: "$_id.competencyId",

          competencyName: {
            $first: "$competencyName",
          },

          skillCategory: {
            $first: "$skillCategory",
          },

          skills: {
            $push: {
              skillId: "$_id.skillId",
              skillName: "$skillName",
              employees: "$employees",
            },
          },
        },
      },
      {
        $project: {
          competencyId: "$_id",
          competencyName: 1,
          skillCategory: 1,
          skills: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Fetch Skill competency error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of skill competency!",
      error: error.message,
    });
  }
};
// for removal
export const fetchCompetency = async (req, res) => {
  try {
    const summary = await SkillCompetency.aggregate([
      {
        $lookup: {
          from: "competencies",
          localField: "competencyId",
          foreignField: "_id",
          as: "competency",
        },
      },
      {
        $unwind: {
          path: "$competency",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "skills",
          localField: "skillId",
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
        $group: {
          _id: "$competency._id",
          competencyName: {
            $first: "$competency.competency",
          },
          skills: {
            $push: {
              skillId: "$skill._id",
              skillName: "$skill.skillName",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          competencyId: "$_id",
          competencyName: 1,
          skills: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Fetching Competency Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of competency!",
      error: error.message,
    });
  }
};
