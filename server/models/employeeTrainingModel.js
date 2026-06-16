import mongoose from "mongoose";
import { Status } from "./statusModel.js";

const employeeTrainingSchema = new mongoose.Schema(
  {
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    trainingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
      required: true,
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    progress: {
      type: Number,
      Default: 0,
    },
    remarks: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const EmployeeTraining = mongoose.model(
  "EmployeeTraining",
  employeeTrainingSchema,
);
