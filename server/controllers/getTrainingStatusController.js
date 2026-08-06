import mongoose from "mongoose";
import { EmployeeTraining } from "../models/employeeTrainingModel.js";
import { Training } from "../models/trainingModel.js";
import { Employee } from "../models/employeesModel.js";

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

export const upcomingSummary = async (req, res) => {
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
        $match: {
          "employee.isActive": true,
          "status.status": "upcoming",
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
          trainingName: "$training.trainingName",
          trainingProvider: "$training.trainingProvider",
          trainingDescription: "$training.trainingDescription",
          status: "$status.status",
          startDate: 1,
          endDate: 1,
          progress: 1,
          remarks: 1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No upcoming training!",
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Fetching error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of upcoming status data!",
      error: error.message,
    });
  }
};

export const pendingSummary = async (req, res) => {
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
        $match: {
          "employee.isActive": true,
          "status.status": "pending",
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
          trainingName: "$training.trainingName",
          trainingProvider: "$training.trainingProvider",
          trainingDescription: "$training.trainingDescription",
          status: "$status.status",
          startDate: 1,
          endDate: 1,
          progress: 1,
          remarks: 1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No pending training!",
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Fetching error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of pending status data!",
      error: error.message,
    });
  }
};

export const ongoingSummary = async (req, res) => {
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
        $match: {
          "employee.isActive": true,
          "status.status": "ongoing",
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
          empLevel: "$employee.empLevel",
          group: "$employee.group",
          trainingName: "$training.trainingName",
          trainingProvider: "$training.trainingProvider",
          trainingDescription: "$training.trainingDescription",
          status: "$status.status",
          startDate: 1,
          endDate: 1,
          progress: 1,
          remarks: 1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No ongoing training!",
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Fetching error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of ongoing statud data!",
      error: error.message,
    });
  }
};

export const completedSummary = async (req, res) => {
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
        $match: {
          "employee.isActive": true,
          "status.status": "completed",
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
          empLevel: "$employee.empLevel",
          group: "$employee.group",
          trainingName: "$training.trainingName",
          trainingProvider: "$training.trainingProvider",
          trainingDescription: "$training.trainingDescription",
          status: "$status.status",
          startDate: 1,
          endDate: 1,
          progress: 1,
          remarks: 1,
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No completed training!",
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Fetching error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of ongoing statud data!",
      error: error.message,
    });
  }
};

export const getRecentTrainingSummary = async (req, res) => {
  try {
    const recentTrainings = await EmployeeTraining.aggregate([
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
        $match: {
          "status.status": "completed",
        },
      },
      {
        $sort: {
          endDate: -1,
        },
      },
      {
        $limit: 5,
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
          trainingName: "$training.trainingName",
          trainingProvider: "$training.trainingProvider",
          date: {
            $concat: [
              {
                $ifNull: [
                  {
                    $dateToString: {
                      format: "%m/%d/%Y",
                      date: "$startDate",
                    },
                  },
                  "",
                ],
              },
              " ~ ",
              {
                $ifNull: [
                  {
                    $dateToString: {
                      format: "%m/%d/%Y",
                      date: "$endDate",
                    },
                  },
                  "",
                ],
              },
            ],
          },
        },
      },
    ]);

    if (recentTrainings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No recent trainings found!",
        summary: [],
      });
    }

    res.status(200).json({
      success: true,
      summary: recentTrainings,
    });
  } catch (error) {
    console.error("Fetching error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of recent training summary!",
      error: error.message,
    });
  }
};
