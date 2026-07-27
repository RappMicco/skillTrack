import { getSkillOverviewData } from "../services/skillOverviewService.js";
import { generateSkillInsights } from "../services/skillInsightService.js";

export const getSkillInsights = async (req, res) => {
  try {
    const skills = await getSkillOverviewData();

    const result = generateSkillInsights(skills);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Skill insight error: ", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate skill insights",
      error: error.message,
    });
  }
};
