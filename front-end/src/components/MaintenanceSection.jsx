import { useState } from "react";
import { Plus, Pencil, Check, X } from "lucide-react";

const emptyValues = (fields) =>
  Object.fromEntries(fields.map((field) => [field.key, ""]));

export const MaintenanceSection = ({
  title,
  description,
  rows,
  loading,
  saving,
  error,
  fields,
  readOnlyColumns = [],
  idKey = "_id",
  onCreate,
  onUpdate,
  emptyMessage = "No records found.",
}) => {
  const [formValues, setFormValues] = useState(emptyValues(fields));
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const success = await onCreate(formValues);
    if (success) setFormValues(emptyValues(fields));
  };

  const handleEditStart = (row) => {
    setEditingId(row[idKey]);
    setEditValues(
      Object.fromEntries(
        fields.map((field) => [field.key, row[field.key] ?? ""]),
      ),
    );
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
          {title}
        </h2>
        {description && (
          <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>
        )}
      </div>

      {/* add form */}
      <form
        onSubmit={handleCreateSubmit}
        className="flex flex-wrap items-end gap-3 px-5 py-4 border-b border-white/5"
      >
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              {field.label}
            </label>
            <input
              type="text"
              required
              placeholder={field.placeholder || field.label}
              value={formValues[field.key]}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
              className="px-3 py-2 text-xs text-slate-300 border border-white/9 bg-[#EFE9E9]/5 placeholder:text-slate-500 rounded-xl
                          outline-none transition-all tracking-wider focus:ring-1 focus:ring-blue-500/50 min-w-40"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] tracking-wider text-white border border-emerald-500/30 bg-emerald-500/15 hover:bg-emerald-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50"
        >
          <Plus size={13} />
          Add
        </button>
      </form>

      {error && (
        <div className="px-5 py-2 text-[10px] text-red-400 border-b border-white/5">
          {error}
        </div>
      )}

      {/* table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              {readOnlyColumns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                >
                  {col.label}
                </th>
              ))}
              {fields.map((field) => (
                <th
                  key={field.key}
                  className="px-5 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                >
                  {field.label}
                </th>
              ))}
              <th className="px-5 py-2 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={readOnlyColumns.length + fields.length + 1}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={readOnlyColumns.length + fields.length + 1}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const isEditing = editingId === row[idKey];
                return (
                  <tr
                    key={row[idKey]}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    {readOnlyColumns.map((col) => (
                      <td
                        key={col.key}
                        className="px-5 py-3 text-xs text-slate-400"
                      >
                        {row[col.key] ?? "—"}
                      </td>
                    ))}
                    {fields.map((field) => (
                      <td key={field.key} className="px-5 py-3">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editValues[field.key]}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                [field.key]: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                          />
                        ) : (
                          <span className="text-xs text-slate-300">
                            {row[field.key] ?? "—"}
                          </span>
                        )}
                      </td>
                    ))}
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
                            onClick={() => handleEditSave(row[idKey])}
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
