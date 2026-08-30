import { useState } from "react";
import { UserPlus, Pencil, Check, X } from "lucide-react";

const groupOptions = [
  { value: "smart_local", label: "Smart Local" },
  { value: "smart_outsource", label: "Smart Outsource" },
  { value: "development", label: "Development Group" },
  { value: "network", label: "Network Group" },
  { value: "admin", label: "Admin" },
];

const emptyForm = {
  empId: "",
  password: "",
  firstName: "",
  lastName: "",
  empLevel: "",
  group: groupOptions[0].value,
};

const groupLabel = (value) =>
  groupOptions.find((option) => option.value === value)?.label || value;

export const EmployeeRegistrationSection = ({
  rows,
  loading,
  saving,
  error,
  onRegister,
  onUpdate,
}) => {
  const [formValues, setFormValues] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onRegister(formValues);
    if (success) setFormValues(emptyForm);
  };

  const handleEditStart = (row) => {
    setEditingId(row._id);
    setEditValues({
      empId: row.empId ?? "",
      password: "",
      firstName: row.firstName ?? "",
      lastName: row.lastName ?? "",
      empLevel: row.empLevel ?? "",
      group: row.group ?? groupOptions[0].value,
      isActive: row.isActive ?? true,
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleEditSave = async (id) => {
    const success = await onUpdate(id, editValues);
    if (success) handleEditCancel();
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0F172A] border border-[#06B6D4]/13">
      {/* header */}
      <div className="px-5 py-4 border-b border-white/5">
        <h2 className="text-sm font-semibold text-slate-200 tracking-wide">
          Employee Registration
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Register a new employee account for logging into SkillTrack.
        </p>
      </div>

      {/* register form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 px-5 py-4 border-b border-white/5"
      >
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Employee ID
          </label>
          <input
            type="text"
            required
            placeholder="SP0001"
            value={formValues.empId}
            onChange={(e) => handleChange("empId", e.target.value)}
            className="px-3 py-2 text-xs text-slate-300 border border-white/9 bg-[#EFE9E9]/5 placeholder:text-slate-500 rounded-xl outline-none transition-all tracking-wider focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="Min 6 chars, 1 upper, 1 number"
            value={formValues.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="px-3 py-2 text-xs text-slate-300 border border-white/9 bg-[#EFE9E9]/5 placeholder:text-slate-500 rounded-xl outline-none transition-all tracking-wider focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Employee Level
          </label>
          <input
            type="text"
            required
            placeholder="A4"
            value={formValues.empLevel}
            onChange={(e) => handleChange("empLevel", e.target.value)}
            className="px-3 py-2 text-xs text-slate-300 border border-white/9 bg-[#EFE9E9]/5 placeholder:text-slate-500 rounded-xl outline-none transition-all tracking-wider focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            First Name
          </label>
          <input
            type="text"
            required
            placeholder="Juan"
            value={formValues.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="px-3 py-2 text-xs text-slate-300 border border-white/9 bg-[#EFE9E9]/5 placeholder:text-slate-500 rounded-xl outline-none transition-all tracking-wider focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Last Name
          </label>
          <input
            type="text"
            required
            placeholder="Dela Cruz"
            value={formValues.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="px-3 py-2 text-xs text-slate-300 border border-white/9 bg-[#EFE9E9]/5 placeholder:text-slate-500 rounded-xl outline-none transition-all tracking-wider focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Group
          </label>
          <select
            value={formValues.group}
            onChange={(e) => handleChange("group", e.target.value)}
            className="appearance-none px-3 py-2 text-xs text-slate-300 rounded-xl outline-none cursor-pointer transition-all bg-white/5 border border-white/9 tracking-wider"
          >
            {groupOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-slate-900 text-slate-500 tracking-wider text-xs"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 lg:col-span-3 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] tracking-wider text-white border border-emerald-500/30 bg-emerald-500/15 hover:bg-emerald-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            <UserPlus size={13} />
            Register
          </button>
        </div>
      </form>

      {error && (
        <div className="px-5 py-2 text-[10px] text-red-400 border-b border-white/5">
          {error}
        </div>
      )}

      {/* employee list */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Employee ID
              </th>
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                First Name
              </th>
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Last Name
              </th>
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Level
              </th>
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Group
              </th>
              <th className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Status
              </th>
              <th className="px-5 py-2 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  No employees found.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const isEditing = editingId === row._id;
                return (
                  <tr
                    key={row._id}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValues.empId}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              empId: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.empId}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValues.firstName}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.firstName}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValues.lastName}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.lastName}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValues.empLevel}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              empLevel: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.empLevel}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <select
                          value={editValues.group}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              group: e.target.value,
                            }))
                          }
                          className="appearance-none w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
                        >
                          {groupOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="bg-slate-900 text-slate-500 text-xs"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {groupLabel(row.group)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <select
                          value={String(editValues.isActive)}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              isActive: e.target.value === "true",
                            }))
                          }
                          className="appearance-none w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
                        >
                          <option
                            value="true"
                            className="bg-slate-900 text-slate-500 text-xs"
                          >
                            Active
                          </option>
                          <option
                            value="false"
                            className="bg-slate-900 text-slate-500 text-xs"
                          >
                            Inactive
                          </option>
                        </select>
                      ) : (
                        <span
                          className={`text-[8px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                            row.isActive
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
                          }`}
                        >
                          {row.isActive ? "Active" : "Inactive"}
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
