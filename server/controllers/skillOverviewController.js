import { getSkllOverviewData } from "../services/skillOverviewService";

export const getSkillOverview = async (req, res) => {
  try {
    const skills = await getSkllOverviewData();

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    console.error("Skill overview error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve skill overview!",
      error: error.message,
    });
  }
};
