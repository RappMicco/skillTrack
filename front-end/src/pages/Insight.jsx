import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSkillInsights } from "../features/insights/insightThunk.js";
import { InsightSummaryCard } from "../components/InsightSummaryCard.jsx";
import { InsightFeed } from "../components/InsightFeed.jsx";

export const Insight = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSkillInsights = async () => {
      try {
        await dispatch(fetchSkillInsights()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };

    getSkillInsights();
  }, [dispatch]);

  return (
    <div className="space-y-5">
      <div className="bg-[linear-gradient(to_right,#001A31_30%,#2A2C8D_100%)] rounded-[20px] px-4 py-3">
        <div className="pb-2">
          <h1 className="text-md font-semibold text-[#E7EFF0]/70 tracking-wide">
            Skill Gap Insights
          </h1>
          <p className="text-xs text-[#E7EFF0]/40 tracking-wide">
            Automated read on organizational strengths, risks, and training
            opportunities
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-2">
          <InsightSummaryCard />
        </div>
      </div>

      <InsightFeed />
    </div>
  );
};
