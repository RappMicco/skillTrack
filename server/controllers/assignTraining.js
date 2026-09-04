import mongoose from "mongoose";
import { EmployeeTraining } from "../models/employeeTrainingModel.js";
import { Employee } from "../models/employeesModel.js";
import { Training } from "../models/trainingModel.js";
import { Status } from "../models/statusModel.js";

export const assignTraining = async (req, res) => {
  try {
    const {
      empId,
      trainingId,
      statusId,
      startDate,
      endDate,
      progress,
      remarks,
    } = req.body;

    const empName = await Employee.findById(empId);
    const trainingName = await Training.findById(trainingId);

    if (!empName) {
      return res.status(404).json({
        success: false,
        message: "No employee record found!",
      });
    }

    if (!trainingName) {
      return res.status(404).json({
        success: false,
        message: "No training record found!",
      });
    }

    const existingTraining = await EmployeeTraining.findOne({
      empId,
      trainingId,
    });

    if (existingTraining) {
      return res.status(400).json({
        success: false,
        message: `${empName.empId} is already assigned to this training!`,
      });
    }

    const trainingRecord = await EmployeeTraining.create({
      empId,
      trainingId,
      startDate,
      statusId,
      endDate,
      progress,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: `${trainingName.trainingName} successfully assigned to ${empName.empId}`,
      trainingRecord,
    });
  } catch (error) {
    console.error("Create error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error occured while assigning the training!",
    });
  }
};

export const updateAssignTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      empId,
      trainingId,
      statusId,
      startDate,
      endDate,
      progress,
      remarks,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid training ID!",
      });
    }

    const assignTrainingRecord = await EmployeeTraining.findById(id);

    if (!assignTrainingRecord) {
      return res.status(404).json({
        success: false,
        message: "Training record not found!",
      });
    }

    // check if have changes on records (compare as strings — Mongoose stores
    // empId/trainingId/statusId as ObjectId objects, not plain strings)
    const noRecordChanges =
      String(assignTrainingRecord.empId) === String(empId) &&
      String(assignTrainingRecord.trainingId) === String(trainingId) &&
      String(assignTrainingRecord.statusId) === String(statusId) &&
      String(assignTrainingRecord.progress) === String(progress) &&
      (assignTrainingRecord.remarks ?? "") === (remarks ?? "");

    // update details — "!== undefined" (not "||") so an intentionally-cleared
    // value (0, "") is respected instead of silently falling back to the old one
    assignTrainingRecord.empId =
      empId !== undefined ? empId : assignTrainingRecord.empId;
    assignTrainingRecord.trainingId =
      trainingId !== undefined ? trainingId : assignTrainingRecord.trainingId;
    assignTrainingRecord.statusId =
      statusId !== undefined ? statusId : assignTrainingRecord.statusId;
    assignTrainingRecord.startDate =
      startDate !== undefined ? startDate : assignTrainingRecord.startDate;
    assignTrainingRecord.endDate =
      endDate !== undefined ? endDate : assignTrainingRecord.endDate;
    assignTrainingRecord.progress =
      progress !== undefined ? progress : assignTrainingRecord.progress;
    assignTrainingRecord.remarks =
      remarks !== undefined ? remarks : assignTrainingRecord.remarks;

    await assignTrainingRecord.save();

    //populate
    await assignTrainingRecord.populate([
      {
        path: "empId",
        select: "empId",
      },
      {
        path: "trainingId",
        select: "trainingName trainingProvider",
      },
      {
        path: "statusId",
        select: "status",
      },
    ]);

    res.status(200).json({
      success: true,
      message: noRecordChanges
        ? "No changes detected!"
        : "Updated successfully!",
      data: noRecordChanges ? "" : assignTrainingRecord,
    });
  } catch (error) {
    console.error("Update error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during updating of training!",
      error: error.message,
    });
  }
};

export const fetchStatus = async (req, res) => {
  try {
    const summary = await Status.aggregate([
      {
        $project: {
          status: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Fetch status error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during fetching of training status!",
      error: error.message,
    });
  }
};
