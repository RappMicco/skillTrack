import mongoose from "mongoose";

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
