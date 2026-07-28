export const generateSkillInsights = (skills = []) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return {
      summary: {
        strongestSkill: null,
        weakestSkill: null,
        totalInsight: 0,
      },
      insights: [],
    };
  }

  const insights = [];

  const sortedByExpertise = [...skills].sort(
    (a, b) => b.expertisePercentage - a.expertisePercentage,
  );

  const strongestSkill = sortedByExpertise[0];
  const weakestSkill = sortedByExpertise[sortedByExpertise.length - 1];

  // generate one strength based on the strongest skill
  insights.push({
    id: `strength-${strongestSkill.skillId}`,
    type: "strength",
    title: "Strongest Skill",
    skillName: strongestSkill.skillName,
    message: `${strongestSkill.skillName} has the highest average proficiency at ${strongestSkill.expertisePercentage}%, demonstrating strong expertise within the organization.`,
    metrics: {
      expertisePercentage: strongestSkill.expertisePercentage,
      averageProficiency: strongestSkill.averageProficiency,
      employeeCount: strongestSkill.employeeCount,
    },
  });

  // high expertise but only one employeee
  const knowledgeRisks = skills.filter(
    (skill) => skill.employeeCount === 1 && skill.expertisePercentage >= 80,
  );

  knowledgeRisks.forEach((skill) => {
    insights.push({
      id: `risk-${skill.skillId}`,
      type: "risk",
      title: "Knowlede Concentration Risk",
      skillName: skill.skillName,
      message: `${skill.skillName} has a high proficiency level, but only one employee currently possesses this skill. This may affect business continuity when that employee is unavailable.`,
      metrics: {
        expertisePercentage: skill.expertisePercentage,
        averageProficiency: skill.averageProficiency,
        employeeCount: skill.employeeCount,
      },
    });

    insights.push({
      id: `recommendation-${skill.skillId}`,
      type: "recommendation",
      title: "Cross-Training Recommendation",
      skillName: skill.skillName,
      message: `Assign at least two additional to ${skill.skillName} training or mentoring to reduce dependency on a single expert.`,
      metrics: {
        recommendedEmployees: 2,
        currentEmployees: skill.employeeCount,
      },
    });
  });

  // Weak skill recommendations
  // skill checking
  const weakSkills = skills.filter((skill) => skill.expertisePercentage < 60);

  weakSkills.forEach((skill) => {
    insights.push({
      id: `improvement-${skill.skillId}`,
      type: "recommendation",
      title: "Skill Improvement Needed",
      skillName: skill.skillName,
      message: `${skill.skillName} currently has ${skill.expertisePercentage}% average expertise. Consider assigning foundational or refresher training to improve employee proficiency.`,
      metrics: {
        expertisePercentage: skill.expertisePercentage,
        averageProficiency: skill.averageProficiency,
        employeeCount: skill.employeeCount,
      },
    });
  });

  return {
    summary: {
      strongestSkill: {
        skillName: strongestSkill.skillName,
        expertisePercentage: strongestSkill.expertisePercentage,
      },

      weakestSkill: {
        skillName: weakestSkill.skillName,
        expertisePercentage: weakestSkill.expertisePercentage,
      },

      knowledgeRiskCount: knowledgeRisks.length,
      improvementSkillCount: weakSkills.length,
      totalInsight: insights.length,
    },

    insights,
  };
};
