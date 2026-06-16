import mongoose from "mongoose";
import { Employee } from "../models/employeesModel.js";

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
