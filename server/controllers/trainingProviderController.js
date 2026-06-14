import mongoose from "mongoose";
import { Training } from "../models/trainingModel.js";

export const createTraining = async (req, res) => {
  try {
    const { trainingName, trainingProvider } = req.body;

    const existingTraining = await Training.findOne({ trainingName });

    if (existingTraining) {
      return res.status(400).json({
        sucess: false,
        message: "Training name already existed!",
      });
    }

    const trainingRecord = await Training.create({
      trainingName,
      trainingProvider,
    });

    res.status(200).json({
      sucess: true,
      messsage: "Created successfully!",
    });
  } catch (error) {
    console.error("Create error: ", error);
    return res.status(500).json({
      sucess: false,
      message: "Server error during creation of training!",
      error: error.message,
    });
  }
};
