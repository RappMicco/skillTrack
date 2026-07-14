import { useSelector } from "react-redux";
import { Trophy, Medal, CircleStar } from "lucide-react";

export const RecentTrainingCard = () => {
  const { recentTrainings } = useSelector((state) => state.training);

  const achievementIcon = [
    {
      id: 1,
      icon: <Trophy className="text-yellow-500" size={15} />,
    },
    {
      id: 2,
      icon: <Medal className="text-yellow-500" size={15} />,
    },
    {
      id: 3,
      icon: <CircleStar className="text-yellow-500" size={15} />,
    },
  ];

  return (
    <>
      {recentTrainings.map((item, index) => {
        return (
          <div key={item.id} className="flex items-center gap-4">
            {/* name initials */}
            <div
              className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-semibold
                        text-white shrink-0"
            >
              {item?.fullName?.charAt(0) || ""}
            </div>

            <div className="flex-1 min-w-0">
              {/* full name */}
              <p className="text-xs font-semibold text-slate-200 truncate">
                {item?.fullName}
              </p>
              {/* training title */}
              <p className="text-[10px] text-slate-500 truncate">
                {`${item.trainingName} - ${item.trainingProvider}`}
              </p>
            </div>

            {/* emoji */}
            <div className="flex items-center rounded-full p-2 bg-amber-600/15">
              <span className="text-base">{achievementIcon[index]?.icon}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};
