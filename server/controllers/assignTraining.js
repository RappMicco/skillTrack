import mongoose from "mongoose";
import { EmployeeTraining } from "../models/employeeTrainingModel.js";
import { Employee } from "../models/employeesModel.js";
import { Training } from "../models/trainingModel.js";

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
        success: error,
        message: "Invalid training ID!",
      });
    }

    const assignTrainingRecord = await EmployeeTraining.findById(id);

    if (!assignTrainingRecord) {
      return res.status(500).json({
        success: false,
        message: "Training record not found!",
      });
    }
    //check if have changes on records
    const noRecordChanges =
      assignTrainingRecord.empId === empId &&
      assignTrainingRecord.trainingId === trainingId &&
      assignTrainingRecord.statusId === statusId &&
      assignTrainingRecord.startDate === startDate &&
      assignTrainingRecord.endDate === endDate &&
      assignTrainingRecord.progress === progress;
    //update details
    assignTrainingRecord.empId = empId || assignTrainingRecord.empId;
    assignTrainingRecord.trainingId =
      trainingId || assignTrainingRecord.trainingId;
    assignTrainingRecord.statusId = statusId || assignTrainingRecord.statusId;
    assignTrainingRecord.startDate =
      startDate || assignTrainingRecord.startDate;
    assignTrainingRecord.endDate = endDate || assignTrainingRecord.endDate;
    assignTrainingRecord.progress = progress || assignTrainingRecord.progress;

    assignTrainingRecord.save();

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
      {
        path: "startDate",
        select: "startDate",
      },
      {
        path: "endDate",
        select: "endDate",
      },
      {
        path: "progress",
        select: "progress",
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
      messsage: "Server error during updating of training!",
      error: error.message,
    });
  }
};
