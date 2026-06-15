import mongoose from "mongoose";
import { EmployeeTraining } from "../models/employeeTrainingModel.js";
import { Employee } from "../models/employeesModel.js";
import { Training } from "../models/trainingModel.js";

export const assignTraining = async (req, res) => {
  try {
    const { empId, trainingId, startDate, endDate, progress, remarks } =
      req.body;

    const empName = await Employee.findById(empId);
    const trainingName = await Training.findById(trainingId);

    if (!empName) {
      return res.status(400).json({
        success: false,
        message: "No employee record found!",
      });
    }

    if (!trainingName) {
      return res.status(400).json({
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
