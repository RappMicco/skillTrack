import mongoose from "mongoose";
import { Training } from "../models/trainingModel.js";

export const createTraining = async (req, res) => {
  try {
    const { trainingName, trainingProvider, trainingDescription } = req.body;

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
      trainingDescription,
    });

    res.status(201).json({
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

export const updateTrainingProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { trainingName, trainingProvider, trainingDescription } = req.body;

    if (mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid training provider ID!",
      });
    }

    const trainingProviderRecord = await Training.findById(id);

    if (!trainingProviderRecord) {
      return res.status(400).json({
        success: false,
        message: "Training provider record not found!",
      });
    }
    //check if no changes on training name and training provided field
    const trainingProviderChanges =
      trainingProviderRecord.trainingName === trainingName &&
      trainingProviderRecord.trainingProvider === trainingProvider &&
      trainingProviderRecord.trainingDescription === trainingDescription;

    trainingProviderRecord.trainingName =
      trainingName || trainingProviderRecord.trainingName;
    trainingProviderRecord.trainingProvider =
      trainingProvider || trainingProviderRecord.trainingProvider;
    trainingProviderRecord.trainingDescription =
      trainingDescription || trainingProviderRecord.trainingDescription;

    trainingProviderRecord.save();

    res.status(200).json({
      success: true,
      message: trainingProviderChanges
        ? "No changes detected on training name and training provider field!"
        : "Updated successfully",
      data: trainingProviderChanges ? "" : trainingProviderRecord,
    });
  } catch (error) {
    console.error("Update error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during updating of training provider!",
      error: error.message,
    });
  }
};
