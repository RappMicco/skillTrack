import { Users, Trophy, Medal, Award } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSkillMatrixSummary } from "../features/skillMatrix/matrixThunk.js";

export const SkillMatrixSummaryCard = () => {
  const { matrix } = useSelector((state) => state.skillMatrix);
  //   const { activeDesc } = useContext(PageContext);
  const dispatch = useDispatch();

  const matrixSummary = [
    {
      id: 1,
      key: "totalEmployees",
      title: "Team Members",
      icon: <Users className="text-cyan-500" size={15} />,
      bgContainerIcon: "border border-cyan-600/20 shadow-blue-500/20",
      borderIcon: "bg-blue-500/15 border border-blue-500/30",
      secondContainerColor: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      key: "expert",
      title: "Expert",
      icon: <Trophy className="text-green-500" size={15} />,
      bgContainerIcon: "border border-emerald-600/20 shadow-emerald-500/20",
      borderIcon: "bg-emerald-500/15 border border-emerald-500/30",
      secondContainerColor: "from-emerald-500 to-green-400",
    },
    {
      id: 3,
      key: "advanced",
      title: "Advanced",
      icon: <Medal className="text-purple-500" size={15} />,
      bgContainerIcon: "border border-purple-600/20 shadow-purple-500/20",
      borderIcon: "bg-purple-500/15 border border-purple-500/30",
      secondContainerColor: "from-purple-500 to-violet-400",
    },
    {
      id: 4,
      key: "intermediate",
      title: "Intermediate",
      icon: <Award className="text-amber-500" size={15} />,
      bgContainerIcon: "border border-yellow-600/20 shadow-yellow-500/20",
      borderIcon: "bg-yellow-500/15 border border-amber-500/30",
      secondContainerColor: "from-amber-500 to-orange-400",
    },
  ];

  useEffect(() => {
    const getMatrixSummary = async () => {
      try {
        await dispatch(fetchSkillMatrixSummary()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };

    getMatrixSummary();
  }, [dispatch]);

  return (
    <>
      {matrixSummary.map((item) => {
        return (
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
            {/* number of summary */}
            <div>
              <p className="text-lg font-bold text-white leading-tight">
                {matrix?.[item.key] ?? 0}
              </p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
