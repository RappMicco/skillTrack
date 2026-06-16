import mongoose from "mongoose";
import { Skill } from "../models/skillModel.js";

export const skillCategory = async (req, res) => {
  try {
    const { skillName, category } = req.body;

    console.log(`Category:${category}, ${skillName}`);

    const existingSkillCategory = await Skill.findOne({ skillName });

    if (existingSkillCategory) {
      return res.status(400).json({
        success: false,
        message: "Skill name already existed!",
      });
    }

    const skillRecord = await Skill.create({
      skillName,
      category,
    });

    res.status(201).json({
      successs: true,
      message: "Created successfully!",
    });
  } catch (error) {
    console.error("Create error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during creation of skill category!",
      error: error.message,
    });
  }
};

export const updateSkillCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSkillCategory = await Skill.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedSkillCategory) {
      return res.status(404).json({
        success: false,
        message: "Skill id not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated!",
      data: updatedSkillCategory,
    });
  } catch (error) {
    console.error("Update error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during updating of Skill name and category!",
      error: error.message,
    });
  }
};
