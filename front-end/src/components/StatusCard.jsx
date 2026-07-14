import { Clock5, ClipboardPen, TrendingUp, CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainingSummary } from "../features/statusSummary/statusThunk.js";

export const StatusCard = () => {
  const dispatch = useDispatch();
  const { summary } = useSelector((state) => state.training);
  const statusSummary = [
    {
      id: 1,
      status: "upcoming",
      firstContainterColor: "border border-cyan-600/20 shadow-blue-500/20",
      secondContainerColor: "from-blue-500 to-cyan-400",
      iconColor: "from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20",
      icon: <Clock5 className="text-white" />,
    },
    {
      id: 2,
      status: "pending",
      firstContainterColor: "border border-orange-600/20 shadow-amber-500/20",
      secondContainerColor: "from-amber-500 to-orange-400",
      iconColor: "from-amber-500 to-orange-400 shadow-lg shadow-amber-500/20",
      icon: <ClipboardPen className="text-white" />,
    },
    {
      id: 3,
      status: "ongoing",
      firstContainterColor: "border border-purple-600/20 shadow-purple-500/20",
      secondContainerColor: "from-purple-500 to-violet-400",
      iconColor: "from-purple-500 to-violet-400 shadow-lg shadow-purple-500/20",
      icon: <TrendingUp className="text-white" />,
    },
    {
      id: 4,
      status: "completed",
      firstContainterColor:
        "border border-emerald-600/20 shadow-emerald-500/20",
      secondContainerColor: "from-emerald-500 to-green-400",
      iconColor:
        "from-emerald-500 to-green-400 shadow-lg shadow-emerald-500/20",
      icon: <CircleCheck className="text-white" />,
    },
  ];

  useEffect(() => {
    const getTrainingSummary = async () => {
      try {
        await dispatch(fetchTrainingSummary());
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };

    getTrainingSummary();
  }, [dispatch]);
  return (
    <>
      {statusSummary.map((item) => {
        return (
          <div
            key={item.id}
            className={`relative rounded-2xl p-5 overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 shadow-lg bg-[#EFE9E9]/5 ${item.firstContainterColor}`}
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-linear-to-br ${item.secondContainerColor}`}
            ></div>
            {/* Icon container */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-linear-to-br ${item.iconColor} transition-all duration-700 group-hover:rotate-360`}
            >
              {item.icon}
            </div>

            {/* Numbers of status */}
            <div className={`text-3xl font-bold text-white mb-1`}>
              {summary?.[item.status] ?? 0}
            </div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              {item.status}
            </div>
          </div>
        );
      })}
    </>
  );
};
