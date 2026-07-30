import { TriangleAlert, Lightbulb, Dumbbell } from "lucide-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkillInsights } from "../features/insights/insightThunk.js";

export const InsightCard = () => {
  const dispatch = useDispatch();
  const { insights } = useSelector((state) => state.insights);
  console.log("Insights", insights);

  const strength = insights[0]?.type === "strength";
  const risk = insights[1]?.type === "risk";
  const recommendation = insights[2]?.type === "recommendation";

  const insightValue = [
    ...(strength
      ? [
          {
            id: 1,
            icon: <Dumbbell />,
            color: "text-white",
          },
        ]
      : []),
    ...(risk
      ? [
          {
            id: 2,
            icon: <TriangleAlert />,
            color: "text-white",
          },
        ]
      : []),
    ...(recommendation
      ? [
          {
            id: 3,
            icon: <Lightbulb />,
            color: "text-white",
          },
        ]
      : []),
  ];

  useEffect(() => {
    const getInsight = async () => {
      try {
        await dispatch(fetchSkillInsights());
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    getInsight();
  }, [dispatch]);
  return (
    <>
      {insights.map((item, index) => {
        <div key={index} className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full shrink-0`}>
            {insightValue[index].icon}
          </div>
        </div>;
      })}
    </>
  );
};
