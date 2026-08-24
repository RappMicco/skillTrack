import { useEffect } from "react";
import { fetchCompetencyData } from "../features/skillMatrix/matrixThunk.js";
import { useDispatch, useSelector } from "react-redux";
import { Users } from "lucide-react";

export const SkillMatrixTable = () => {
  const { competency } = useSelector((state) => state.skillMatrix);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompetency = async () => {
      try {
        await dispatch(fetchCompetencyData());
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompetency();
  }, [dispatch]);
  return (
    <>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          {/* table header */}
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-3 text-left w-48 sticky left-0 z-20 bg-[linear-gradient(to_right,#001A31_25%,#2A2C8D_100%)]">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Users size={12} />
                  Members
                </span>
              </th>
              {competency.map((item) => (
                <th
                  key={item.competencyId}
                  colSpan={item.skills.length}
                  className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest
                            border border-white/5"
                >
                  {item.competencyName}
                </th>
              ))}
            </tr>

            <tr className="border-b border-white/5">
              <th className="px-5 py-2 sticky left-0 z-10"></th>
              {competency.flatMap((item) =>
                item.skills.map((skill, skillIndex) => {
                  const isLastInGroup = skillIndex === item.skills.length - 1;
                  return (
                    <th
                      key={skill.skillId}
                      className={`px-3 py-2 text-[8px] min-w-35 font-semibold text-slate-500 uppercase tracking-widest
                                border-b border-white/5 ${isLastInGroup ? "border-r-2 border-r-white/5" : ""}`}
                    >
                      {skill.skillName}
                    </th>
                  );
                }),
              )}
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};
