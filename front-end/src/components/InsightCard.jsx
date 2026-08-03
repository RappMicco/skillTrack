import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkillInsights } from "../features/insights/insightThunk.js";
import {
  getIcon,
  bgIconColor,
  typeColor,
  borderColor,
} from "../utils/insightConfig.jsx";

export const InsightCard = () => {
  const dispatch = useDispatch();
  const { insights } = useSelector((state) => state.insights);
  const topfiveInsights = insights.slice(0, 3);

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
      {topfiveInsights.map((item, id) => {
        return (
          <div
            key={id}
            className={`flex items-center border gap-4 px-2 py-1 rounded-lg bg-[#EFE9E9]/8 shadow-md ${borderColor(item.type)}`}
          >
            {/* icon */}
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full ${bgIconColor(item.type)}`}
            >
              {getIcon(item.type)}
            </div>
            {/* insight message */}
            <div className="flex-1 min-w-0">
              {/* type container */}
              <div
                className={`w-fit inline-flex items-center justify-center ${typeColor(item.type)} text-[9px] font-semibold tracking-widest rounded-sm px-2 py-1 mb-2`}
              >
                {item.type.toUpperCase()}
              </div>

              {/* message  */}
              <p className="text-xs text-slate-200">{item.message}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
