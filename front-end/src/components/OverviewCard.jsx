import { Grid3X3, ChartColumn, Award } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRecentTrainings } from "../features/statusSummary/statusThunk.js";
import { RecentTrainingCard } from "./RecentTrainingCard.jsx";

export const OverviewCard = () => {
  const dispatch = useDispatch();
  const overview = [
    {
      id: 1,
      title: "Skill Overview",
      btnTitle: "View Skill Matrix",
      bgColor: "bg-blue-500/15",
      icon: <Grid3X3 className="text-blue-400" size={15} />,
    },
    {
      id: 2,
      title: "Overview Insight",
      btnTitle: "View Insight",
      bgColor: "bg-purple-500/15",
      icon: <ChartColumn className="text-purple-400" size={15} />,
    },
    {
      id: 3,
      title: "Recent Learning Activities",
      btnTitle: "View Insight",
      bgColor: "bg-emerald-500/15",
      icon: <Award className="text-emerald-400" size={15} />,
      card: <RecentTrainingCard />,
    },
  ];

  useEffect(() => {
    const getRecentTrainings = async () => {
      try {
        await dispatch(fetchRecentTrainings());
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };

    getRecentTrainings();
  }, [dispatch]);
  return (
    <>
      {overview.map((item) => {
        return (
          <div
            key={item.id}
            className="rounded-2xl p-5 flex flex-col gap-3 bg-[#0F172A] border border-[#06B6D4]/13"
          >
            {/* icon and overview header */}
            <div className="flex items-center gap-2 mb-1">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.bgColor}`}
              >
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-400">
                {item.title}
              </h3>
            </div>

            {/* details */}
            <div className="flex-1 space-y-3">{item.card}</div>
          </div>
        );
      })}
    </>
  );
};
