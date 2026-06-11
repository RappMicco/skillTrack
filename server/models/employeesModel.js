import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    empLevel: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: String,
      required: true,
      enum: ["smart_local", "smart_outsource", "development", "network"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Employee = mongoose.model("Employee", employeeSchema);
