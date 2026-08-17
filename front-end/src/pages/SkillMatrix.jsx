import { Download } from "lucide-react";
import { SkillMatrixSummaryCard } from "../components/SkillMatrixSummaryCard.jsx";
import { SearchToggleCard } from "../components/SearchToggleCard.jsx";

export const SkillMatrix = () => {
  return (
    <>
      <div className="space-y-5">
        <div className="bg-[linear-gradient(to_right,#001A31_30%,#2A2C8D_100%)] rounded-[20px] px-4 py-3">
          <div className="flex items-start justify-between gap-4 flex-wrap pb-2">
            {/* skill matrix  */}
            <div>
              <h1 className="text-md font-semibold text-[#E7EFF0]/70 tracking-wide">
                Skill Matrix
              </h1>
              <p className="text-xs text-[#E7EFF0]/40 tracking-wide">
                Track competency levels across your team
              </p>
            </div>
            {/* button export */}
            <button
              className="flex item-center gap-2 px-4 py-1 rounded-lg text-[10px] tracking-wider text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300 
                                active:scale-95 border border-white/5 bg-[#EFE9E9]/5"
            >
              <Download size={13} />
              Export
            </button>
          </div>

          {/* summary card */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-2">
            <SkillMatrixSummaryCard />
          </div>
        </div>

        {/* search, toggle, dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchToggleCard />
        </div>
      </div>
    </>
  );
};
