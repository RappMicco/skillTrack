import mongoose from "mongoose";
import { SkillMatrix } from "../models/skillMatrixModel.js";

export const getSkillOverviewData = async () => {
  const skills = await SkillMatrix.aggregate([
    // get employee information
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
    //include active employees only
    {
      $match: {
        "employeeDetails.isActive": true,
        "employeeDetails.group": {
          $ne: "admin",
        },
      },
    },

    // get skill information
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

    // get proficiency information
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

    // group records by skill
    {
      $group: {
        _id: "$skillDetails._id",
        skillName: {
          $first: "$skillDetails.skillName",
        },
        totalProficiency: {
          $sum: "$proficiencyDetails.sequence",
        },
        highestProficiency: {
          $max: "$proficiencyDetails.sequence",
        },

        employees: {
          $addToSet: {
            _id: "$employeeDetails._id",
            empdId: "$employeeDetails.empId",
            fullName: {
              $concat: [
                "$employeeDetails.firstName",
                " ",
                "$employeeDetails.lastName",
              ],
            },
          },
        },
      },
    },

    // calculate employee count and average
    {
      $addFields: {
        employeeCount: {
          $size: "$employees",
        },

        averageProficiency: {
          $cond: [
            {
              $gt: [
                {
                  $size: "$employees",
                },
                0,
              ],
            },
            {
              $divide: [
                "$totalProficiency",
                {
                  $size: "$employees",
                },
              ],
            },
            0,
          ],
        },
      },
    },

    // create percentage based on maximum level
    {
      $addFields: {
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
            0,
          ],
        },
      },
    },

    // sort stronges skills
    {
      $sort: {
        expertisePercentage: -1,
        employeeCount: -1,
      },
    },

    //return top 5
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 0,
        skillId: "$_id",
        skillName: 1,
        employees: 1,
        totalProficiency: 1,
        highestProficiency: 1,
        employeeCount: 1,
        averageProficiency: 1,
        expertisePercentage: 1,
      },
    },
  ]);

  return skills;
};
