import { Download } from "lucide-react";
import { SkillMatrixSummaryCard } from "../components/SkillMatrixSummaryCard.jsx";
import { SearchToggleCard } from "../components/SearchToggleCard.jsx";
import { PageContext } from "../context/PageContext.js";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { LegendCard } from "../components/LegendCard.jsx";
import { SkillMatrixTable } from "../components/SkillMatrixTable.jsx";
import {
  getFilteredCompetency,
  getFilteredEmployees,
  buildCellMap,
} from "../utils/skillMatrixFilters.js";

const escapeCsvValue = (value) =>
  `"${String(value ?? "").replace(/"/g, '""')}"`;

export const SkillMatrix = () => {
  const {
    viewLegend,
    skillMatrixSearch,
    skillMatrixGroupFilter,
    skillMatrixCompetencyFilter,
  } = useContext(PageContext);
  const { competency, employees, cells } = useSelector(
    (state) => state.skillMatrix,
  );

  const handleExport = () => {
    const filteredCompetency = getFilteredCompetency(
      competency,
      skillMatrixCompetencyFilter,
    );
    const filteredEmployees = getFilteredEmployees(
      employees,
      skillMatrixSearch,
      skillMatrixGroupFilter,
    );
    const flatSkills = filteredCompetency.flatMap((item) => item.skills);
    const cellMap = buildCellMap(cells);

    if (filteredEmployees.length === 0 || flatSkills.length === 0) return;

    const header = ["Employee", ...flatSkills.map((skill) => skill.skillName)];
    const rows = filteredEmployees.map((emp) => [
      emp.fullName,
      ...flatSkills.map((skill) => {
        const cell = cellMap[`${emp._id}_${skill.skillId}`];
        return cell?.sequence ?? "";
      }),
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `skill-matrix-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
              onClick={handleExport}
              className="flex item-center gap-2 px-4 py-1 rounded-lg text-[10px] tracking-wider text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300
                                active:scale-95 border border-white/5 bg-[#EFE9E9]/5"
            >
              <Download size={13} />
              Export
            </button>
          </div>

          {/* ===================================================================================================== summary card ==================================================================================================== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-2">
            <SkillMatrixSummaryCard />
          </div>
        </div>

        {/* ===================================================================================================== search, toggle, dropdown ========================================================================================== */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchToggleCard />
        </div>
        {/* ====================================================================================================== Legend ============================================================================================================= */}
        {viewLegend && (
          <div className="flex flex-wrap gap-5 px-3 py-2 rounded-2xl bg-[#0F172A] border border-[#06B6D4]/13">
            <LegendCard />
          </div>
        )}
        {/* ====================================================================================================== Skill matrix table ================================================================================================== */}
        <div className="rounded-2xl overflow-hidden bg-[#0F172A] border border-[#06B6D4]/13">
          <SkillMatrixTable />
        </div>
      </div>
    </>
  );
};
