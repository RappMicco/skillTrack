import { useMemo, useState } from "react";
import { Link, Pencil, Check, X } from "lucide-react";

export const SkillCompetencySection = ({
  skills,
  competencies,
  assignments,
  loading,
  saving,
  error,
  onAssign,
  onUpdate,
}) => {
  const [skillId, setSkillId] = useState("");
  const [competencyId, setCompetencyId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    skillId: "",
    competencyId: "",
  });

  const rows = useMemo(
    () =>
      assignments.flatMap((group) =>
        (group.skills || []).map((skill) => ({
          id: skill.skillCompetencyId,
          skillId: skill.skillId,
          skillName: skill.skillName,
          competencyId: group.competencyId,
          competencyName: group.competencyName,
        })),
      ),
    [assignments],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skillId || !competencyId) return;
    const success = await onAssign({ skillId, competencyId });
    if (success) {
      setSkillId("");
      setCompetencyId("");
    }
  };

  const handleEditStart = (row) => {
    setEditingId(row.id);
    setEditValues({ skillId: row.skillId, competencyId: row.competencyId });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({ skillId: "", competencyId: "" });
  };

  const handleEditSave = async (id) => {
    if (!editValues.skillId || !editValues.competencyId) return;
    const success = await onUpdate(id, editValues);
    if (success) handleEditCancel();
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0F172A] border border-[#06B6D4]/13">
      {/* header */}
      <div className="px-5 py-4 border-b border-white/5">
        <h2 className="text-sm font-semibold text-slate-200 tracking-wide">
          Skill Assignments
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Assign a skill to a competency group used in the skill matrix.
        </p>
      </div>

      {/* assign form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-end gap-3 px-5 py-4 border-b border-white/5"
      >
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Skill
          </label>
          <select
            required
            value={skillId}
            onChange={(e) => setSkillId(e.target.value)}
            className="appearance-none px-3 py-2 text-xs text-slate-500 rounded-xl outline-none cursor-pointer transition-all bg-white/5 border border-white/9 tracking-wider min-w-44"
          >
            <option value="" className="bg-slate-900 text-slate-500">
              Select skill
            </option>
            {skills.map((skill) => (
              <option
                key={skill._id}
                value={skill._id}
                className="bg-slate-900 text-slate-500 tracking-wider text-xs"
              >
                {skill.skillName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Competency
          </label>
          <select
            required
            value={competencyId}
            onChange={(e) => setCompetencyId(e.target.value)}
            className="appearance-none px-3 py-2 text-xs text-slate-500 rounded-xl outline-none cursor-pointer transition-all bg-white/5 border border-white/9 tracking-wider min-w-44"
          >
            <option value="" className="bg-slate-900 text-slate-500">
              Select competency
            </option>
            {competencies.map((item) => (
              <option
                key={item.competencyId}
                value={item.competencyId}
                className="bg-slate-900 text-slate-500 tracking-wider text-xs"
              >
                {item.competencyName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] tracking-wider text-white border border-emerald-500/30 bg-emerald-500/15 hover:bg-emerald-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50"
        >
          <Link size={13} />
          Assign
        </button>
      </form>

      {error && (
        <div className="px-5 py-2 text-[10px] text-red-400 border-b border-white/5">
          {error}
        </div>
      )}

      {/* assignment list */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Skill
              </th>
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Competency
              </th>
              <th className="px-5 py-2 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  No skill assignments found.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const isEditing = row.id && editingId === row.id;
                return (
                  <tr
                    key={row.id || `${row.competencyId}-${row.skillId}`}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <select
                          value={editValues.skillId}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              skillId: e.target.value,
                            }))
                          }
                          className="appearance-none w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
                        >
                          {skills.map((skill) => (
                            <option
                              key={skill._id}
                              value={skill._id}
                              className="bg-slate-900 text-slate-500 text-xs"
                            >
                              {skill.skillName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.skillName}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <select
                          value={editValues.competencyId}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              competencyId: e.target.value,
                            }))
                          }
                          className="appearance-none w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
                        >
                          {competencies.map((item) => (
                            <option
                              key={item.competencyId}
                              value={item.competencyId}
                              className="bg-slate-900 text-slate-500 text-xs"
                            >
                              {item.competencyName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {row.competencyName}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={handleEditCancel}
                            disabled={saving}
                            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-300 hover:text-white border border-white/10 bg-[#EFE9E9]/5 transition-all duration-300 active:scale-95 disabled:opacity-50"
                          >
                            <X size={13} />
                          </button>
                          <button
                            onClick={() => handleEditSave(row.id)}
                            disabled={saving}
                            className="flex items-center justify-center w-7 h-7 rounded-lg text-white border border-emerald-500/30 bg-emerald-500/15 hover:bg-emerald-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50"
                          >
                            <Check size={13} />
                          </button>
                        </div>
                      ) : (
                        row.id && (
                          <button
                            onClick={() => handleEditStart(row)}
                            className="flex items-center justify-center w-7 h-7 ml-auto rounded-lg text-slate-300 hover:text-white border border-white/10 bg-[#EFE9E9]/5 transition-all duration-300 active:scale-95"
                          >
                            <Pencil size={13} />
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
