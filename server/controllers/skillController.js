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

    res.status(200).json({
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
