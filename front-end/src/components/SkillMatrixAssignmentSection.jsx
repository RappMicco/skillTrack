import { useState } from "react";
import { Link, Pencil, Check, X } from "lucide-react";

export const SkillMatrixAssignmentSection = ({
  employees,
  skills,
  proficiencies,
  assignments,
  loading,
  saving,
  error,
  onAssign,
  onUpdate,
}) => {
  const [empId, setEmpId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [proficiencyId, setProficiencyId] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    empId: "",
    skill: "",
    proficiency: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empId || !skillId || !proficiencyId) return;
    const success = await onAssign({
      empId,
      skill: skillId,
      proficiency: proficiencyId,
    });
    if (success) {
      setEmpId("");
      setSkillId("");
      setProficiencyId("");
    }
  };

  const handleEditStart = (row) => {
    setEditingId(row._id);
    setEditValues({
      empId: row.empId,
      skill: row.skill,
      proficiency: row.proficiency,
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({ empId: "", skill: "", proficiency: "" });
  };

  const handleEditSave = async (id) => {
    if (!editValues.empId || !editValues.skill || !editValues.proficiency)
      return;
    const success = await onUpdate(id, editValues);
    if (success) handleEditCancel();
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0F172A] border border-[#06B6D4]/13">
      {/* header */}
      <div className="px-5 py-4 border-b border-white/5">
        <h2 className="text-sm font-semibold text-slate-200 tracking-wide">
          Employee Skills
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Assign a proficiency level for an employee's skill (mirrors the Skill
          Matrix grid).
        </p>
      </div>

      {/* assign form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-end gap-3 px-5 py-4 border-b border-white/5"
      >
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Employee
          </label>
          <select
            required
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="appearance-none px-3 py-2 text-xs text-slate-500 rounded-xl outline-none cursor-pointer transition-all bg-white/5 border border-white/9 tracking-wider min-w-44"
          >
            <option value="" className="bg-slate-900 text-slate-500">
              Select employee
            </option>
            {employees.map((emp) => (
              <option
                key={emp._id}
                value={emp._id}
                className="bg-slate-900 text-slate-500 tracking-wider text-xs"
              >
                {emp.fullName}
              </option>
            ))}
          </select>
        </div>

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
            Proficiency
          </label>
          <select
            required
            value={proficiencyId}
            onChange={(e) => setProficiencyId(e.target.value)}
            className="appearance-none px-3 py-2 text-xs text-slate-500 rounded-xl outline-none cursor-pointer transition-all bg-white/5 border border-white/9 tracking-wider min-w-44"
          >
            <option value="" className="bg-slate-900 text-slate-500">
              Select proficiency
            </option>
            {proficiencies.map((level) => (
              <option
                key={level._id}
                value={level._id}
                className="bg-slate-900 text-slate-500 tracking-wider text-xs"
              >
                {level.sequence} - {level.level}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] tracking-wider text-white border border-emerald-500/30 
                  bg-emerald-500/15 hover:bg-emerald-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50"
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
                Employee
              </th>
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Skill
              </th>
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Proficiency
              </th>
              <th className="px-5 py-2 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  Loading...
                </td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  No employee skills found.
                </td>
              </tr>
            ) : (
              assignments.map((row) => {
                const isEditing = editingId === row._id;
                return (
                  <tr
                    key={row._id}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <select
                          value={editValues.empId}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              empId: e.target.value,
                            }))
                          }
                          className="appearance-none w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
                        >
                          {employees.map((emp) => (
                            <option
                              key={emp._id}
                              value={emp._id}
                              className="bg-slate-900 text-slate-500 text-xs"
                            >
                              {emp.fullName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.employeeName}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <select
                          value={editValues.skill}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              skill: e.target.value,
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
                          value={editValues.proficiency}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              proficiency: e.target.value,
                            }))
                          }
                          className="appearance-none w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
                        >
                          {proficiencies.map((level) => (
                            <option
                              key={level._id}
                              value={level._id}
                              className="bg-slate-900 text-slate-500 text-xs"
                            >
                              {level.sequence} - {level.level}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {row.proficiencyLevel}
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
                            onClick={() => handleEditSave(row._id)}
                            disabled={saving}
                            className="flex items-center justify-center w-7 h-7 rounded-lg text-white border border-emerald-500/30 bg-emerald-500/15 hover:bg-emerald-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50"
                          >
                            <Check size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditStart(row)}
                          className="flex items-center justify-center w-7 h-7 ml-auto rounded-lg text-slate-300 hover:text-white border border-white/10 bg-[#EFE9E9]/5 transition-all duration-300 active:scale-95"
                        >
                          <Pencil size={13} />
                        </button>
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
