import { useContext, useEffect, useMemo, useState } from "react";
import {
  fetchCompetencyData,
  fetchEmployees,
  fetchSkillProficiencyLevels,
  fetchSkillMatrixCells,
  createSkillMatrix,
  updateSkillMatrix,
} from "../features/skillMatrix/matrixThunk.js";
import { useDispatch, useSelector } from "react-redux";
import { Users, Pencil, Check, X } from "lucide-react";
import { PageContext } from "../context/PageContext.js";
import {
  getFilteredCompetency,
  getFilteredEmployees,
  buildCellMap,
} from "../utils/skillMatrixFilters.js";

const proficiencyColor = (sequence) => {
  switch (sequence) {
    case 1:
      return "bg-rose-500/15 border border-red-500/30 text-red-300";
    case 2:
      return "bg-yellow-500/15 border border-amber-500/30 text-amber-300";
    case 3:
      return "bg-blue-500/15 border border-blue-500/30 text-blue-300";
    case 4:
      return "bg-purple-500/15 border border-purple-500/30 text-purple-300";
    case 5:
      return "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300";
    default:
      return "bg-slate-500/15 border border-slate-500/30 text-slate-400";
  }
};

export const SkillMatrixTable = () => {
  const { competency, employees, proficiencyLevels, cells, saving } =
    useSelector((state) => state.skillMatrix);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.group === "admin";

  const {
    skillMatrixSearch,
    skillMatrixGroupFilter,
    skillMatrixCompetencyFilter,
  } = useContext(PageContext);

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [pendingScores, setPendingScores] = useState({});
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCompetencyData()),
          dispatch(fetchEmployees()),
          dispatch(fetchSkillProficiencyLevels()),
          dispatch(fetchSkillMatrixCells()),
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTableData();
  }, [dispatch]);

  const filteredCompetency = useMemo(
    () => getFilteredCompetency(competency, skillMatrixCompetencyFilter),
    [competency, skillMatrixCompetencyFilter],
  );

  const filteredEmployees = useMemo(
    () =>
      getFilteredEmployees(
        employees,
        skillMatrixSearch,
        skillMatrixGroupFilter,
      ),
    [employees, skillMatrixSearch, skillMatrixGroupFilter],
  );

  const flatSkills = useMemo(
    () => filteredCompetency.flatMap((item) => item.skills),
    [filteredCompetency],
  );

  const cellMap = useMemo(() => buildCellMap(cells), [cells]);

  const handleEdit = () => {
    const initialScores = {};
    filteredEmployees.forEach((emp) => {
      flatSkills.forEach((skill) => {
        const key = `${emp._id}_${skill.skillId}`;
        initialScores[key] = cellMap[key]?.proficiency || "";
      });
    });
    setPendingScores(initialScores);
    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPendingScores({});
    setSaveError(null);
  };

  const handleScoreChange = (empId, skillId, value) => {
    setPendingScores((prev) => ({
      ...prev,
      [`${empId}_${skillId}`]: value,
    }));
  };

  const handleSave = async () => {
    const changes = [];

    filteredEmployees.forEach((emp) => {
      flatSkills.forEach((skill) => {
        const key = `${emp._id}_${skill.skillId}`;
        const pending = pendingScores[key] ?? "";
        const existing = cellMap[key];

        if (!pending || pending === existing?.proficiency) return;

        changes.push({
          matrixId: existing?.matrixId,
          empId: emp._id,
          skill: skill.skillId,
          proficiency: pending,
        });
      });
    });

    if (changes.length === 0) {
      handleCancel();
      return;
    }

    try {
      await Promise.all(
        changes.map((change) =>
          change.matrixId
            ? dispatch(
                updateSkillMatrix({
                  id: change.matrixId,
                  empId: change.empId,
                  skill: change.skill,
                  proficiency: change.proficiency,
                }),
              ).unwrap()
            : dispatch(
                createSkillMatrix({
                  empId: change.empId,
                  skill: change.skill,
                  proficiency: change.proficiency,
                }),
              ).unwrap(),
        ),
      );
      await dispatch(fetchSkillMatrixCells());
      handleCancel();
    } catch (error) {
      setSaveError(
        typeof error === "string" ? error : "Failed to save changes.",
      );
    }
  };

  return (
    <>
      {isAdmin && (
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/5">
          {saveError ? (
            <span className="text-[10px] text-red-400">{saveError}</span>
          ) : (
            <span />
          )}
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[10px] tracking-wider text-slate-300 hover:text-white border border-white/10 bg-[#EFE9E9]/5 transition-all duration-300 active:scale-95 disabled:opacity-50"
              >
                <X size={13} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[10px] tracking-wider text-white border border-emerald-500/30 bg-emerald-500/15 hover:bg-emerald-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50"
              >
                <Check size={13} />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[10px] tracking-wider text-slate-300 hover:text-white border border-white/10 bg-[#EFE9E9]/5 transition-all duration-300 active:scale-95"
            >
              <Pencil size={13} />
              Edit
            </button>
          )}
        </div>
      )}

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
              {filteredCompetency.map((item) => (
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
              <th className="px-5 py-2 sticky left-0 z-10 bg-[#0B1524]"></th>
              {filteredCompetency.flatMap((item) =>
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

          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td
                  colSpan={flatSkills.length + 1}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  No employees found.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-3 sticky left-0 z-10 bg-[#0B1524] whitespace-nowrap">
                    <span className="text-slate-300 font-medium text-xs">
                      {emp.fullName}
                    </span>
                  </td>
                  {flatSkills.map((skill) => {
                    const key = `${emp._id}_${skill.skillId}`;
                    const existing = cellMap[key];

                    if (isEditing) {
                      return (
                        <td
                          key={skill.skillId}
                          className="px-2 py-2 text-center"
                        >
                          <select
                            value={pendingScores[key] ?? ""}
                            onChange={(e) =>
                              handleScoreChange(
                                emp._id,
                                skill.skillId,
                                e.target.value,
                              )
                            }
                            className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-[10px] text-slate-200 px-1.5 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                          >
                            <option value="" className="bg-slate-800">
                              —
                            </option>
                            {proficiencyLevels.map((level) => (
                              <option
                                key={level._id}
                                value={level._id}
                                className="bg-slate-900 text-slate-500 tracking-wider text-[9px]"
                              >
                                {level.sequence} - {level.level}
                              </option>
                            ))}
                          </select>
                        </td>
                      );
                    }

                    return (
                      <td key={skill.skillId} className="px-3 py-3 text-center">
                        <span
                          className={`inline-flex w-7 h-7 rounded-lg items-center justify-center text-[10px] font-bold ${proficiencyColor(existing?.sequence)} duration-300 hover:scale-115`}
                        >
                          {existing?.sequence ?? "—"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
