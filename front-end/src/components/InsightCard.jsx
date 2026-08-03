import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkillInsights } from "../features/insights/insightThunk.js";
import {
  getIcon,
  bgIconColor,
  typeColor,
  borderColor,
<<<<<<< HEAD
  bgColorHover,
} from "../utils/insightConfig.jsx";
import { Users } from "lucide-react";
=======
} from "../utils/insightConfig.jsx";
>>>>>>> main

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
<<<<<<< HEAD
            className={`relative group overflow-hidden flex items-center border gap-4 px-2 py-2 rounded-lg bg-[#EFE9E9]/8 shadow-md ${borderColor(item.type)} transition-all duration-300 hover:-translate-y-1`}
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-linear-to-br ${bgColorHover(item.type)}`}
            ></div>
=======
            className={`flex items-center border gap-4 px-2 py-1 rounded-lg bg-[#EFE9E9]/8 shadow-md ${borderColor(item.type)}`}
          >
>>>>>>> main
            {/* icon */}
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full ${bgIconColor(item.type)}`}
            >
              {getIcon(item.type)}
            </div>
            {/* insight message */}
            <div className="flex-1 min-w-0">
              {/* type container */}
<<<<<<< HEAD
              <div className="flex justify-between">
                <div
                  className={`w-fit inline-flex items-center justify-center ${typeColor(item.type)} text-[8px] font-bold tracking-widest rounded-sm px-2 py-1 mb-2`}
                >
                  {item.type.toUpperCase()}
                </div>

                <div className="flex items-center p-1 gap-1.5 text-slate-400">
                  <Users size={10} className="group-hover:text-white" />
                  <p className="flex items-center text-[10px] text-slate-400 group-hover:text-white">
                    {item?.type === "strength" || item?.type === "risk"
                      ? `${item?.metrics?.employeeCount} Expert`
                      : `${item?.metrics?.recommendedEmployees} Recommendations`}
                  </p>
                </div>
              </div>

              {/* message  */}
              <p className="text-[10px] text-slate-200">{item.message}</p>
=======
              <div
                className={`w-fit inline-flex items-center justify-center ${typeColor(item.type)} text-[9px] font-semibold tracking-widest rounded-sm px-2 py-1 mb-2`}
              >
                {item.type.toUpperCase()}
              </div>

              {/* message  */}
              <p className="text-xs text-slate-200">{item.message}</p>
>>>>>>> main
            </div>
          </div>
        );
      })}
    </>
  );
};
