import mongoose from "mongoose";
import { EmployeeTraining } from "../models/employeeTrainingModel.js";

export const getTrainingStatusSummary = async (req, res) => {
  try {
    const summary = await EmployeeTraining.aggregate([
      {
        $lookup: {
          from: "status",
          localField: "statusId",
          foreignField: "_id",
          as: "statuses",
        },
      },
      {
        $unwind: {
          path: "$statuses",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: null,
          completed: {
            $sum: {
              $cond: [{ $eq: ["$statuses.status", "completed"] }, 1, 0],
            },
          },
          upcoming: {
            $sum: {
              $cond: [{ $eq: ["$statuses.status", "upcoming"] }, 1, 0],
            },
          },
          ongoing: {
            $sum: {
              $cond: [{ $eq: ["$statuses.status", "ongoing"] }, 1, 0],
            },
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$statuses.status", "pending"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          completed: 1,
          upcoming: 1,
          ongoing: 1,
          pending: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      summary: summary[0] || {
        completed: 0,
        upcoming: 0,
        ongoing: 0,
        pending: 0,
      },
    });
  } catch (error) {
    console.error("Summary error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of all training status!",
      error: error.message,
    });
  }
};
