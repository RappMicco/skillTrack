import { Dumbbell, TrendingDown, TriangleAlert, Lightbulb } from "lucide-react";
import { useSelector } from "react-redux";

export const InsightSummaryCard = () => {
  const { summary } = useSelector((state) => state.insights);

  const insightSummary = [
    {
      id: 1,
      value: summary.strongestSkill
        ? `${summary.strongestSkill.expertisePercentage}%`
        : "—",
      title: summary.strongestSkill
        ? `Strongest · ${summary.strongestSkill.skillName}`
        : "Strongest Skill",
      icon: <Dumbbell className="text-emerald-500" size={15} />,
      bgContainerIcon: "border border-emerald-600/20 shadow-emerald-500/20",
      borderIcon: "bg-emerald-500/15 border border-emerald-500/30",
      secondContainerColor: "from-emerald-500 to-green-400",
    },
    {
      id: 2,
      value: summary.weakestSkill
        ? `${summary.weakestSkill.expertisePercentage}%`
        : "—",
      title: summary.weakestSkill
        ? `Weakest · ${summary.weakestSkill.skillName}`
        : "Weakest Skill",
      icon: <TrendingDown className="text-cyan-500" size={15} />,
      bgContainerIcon: "border border-cyan-600/20 shadow-blue-500/20",
      borderIcon: "bg-blue-500/15 border border-blue-500/30",
      secondContainerColor: "from-blue-500 to-cyan-400",
    },
    {
      id: 3,
      value: summary.knowledgeRiskCount,
      title: "Knowledge Risks",
      icon: <TriangleAlert className="text-amber-500" size={15} />,
      bgContainerIcon: "border border-yellow-600/20 shadow-yellow-500/20",
      borderIcon: "bg-yellow-500/15 border border-amber-500/30",
      secondContainerColor: "from-amber-500 to-orange-400",
    },
    {
      id: 4,
      value: summary.improvementSkillCount,
      title: "Improvement Needed",
      icon: <Lightbulb className="text-purple-500" size={15} />,
      bgContainerIcon: "border border-purple-600/20 shadow-purple-500/20",
      borderIcon: "bg-purple-500/15 border border-purple-500/30",
      secondContainerColor: "from-purple-500 to-violet-400",
    },
  ];

  return (
    <>
      {insightSummary.map((item) => (
        <div
          key={item.id}
          className={`relative rounded-2xl p-4 flex item-center gap-3 cursor-pointer group transition-all duration-300 hover:-translate-y-1 shadow-lg bg-[#EFE9E9]/5 overflow-hidden ${item.bgContainerIcon}`}
        >
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-linear-to-br ${item.secondContainerColor}`}
          ></div>
          {/* icon */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:rotate-360 duration-700 ${item.borderIcon}`}
          >
            {item.icon}
          </div>
          {/* value */}
          <div className="min-w-0">
            <p className="text-lg font-bold text-white leading-tight">
              {item.value}
            </p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider truncate">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
