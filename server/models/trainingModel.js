import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    trainingName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    trainingProvider: {
      type: String,
      required: true,
    },
    trainingDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Training = mongoose.model("Training", trainingSchema);
