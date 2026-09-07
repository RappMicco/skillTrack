import {
  Search,
  FunnelPlus,
  ChevronDown,
  X,
  Check,
  Pencil,
} from "lucide-react";
import { useState, useMemo } from "react";

export const AssignTrainingList = ({
  employees,
  training,
  trainingName,
  status,
  onUpdate,
  saving,
  loading,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [search, setSearch] = useState("");

  const dropdownValue = [
    { id: 1, value: "All", label: "All" },
    { id: 2, value: "Upcoming", label: "Upcoming" },
    { id: 3, value: "Pending", label: "Pending" },
    { id: 4, value: "Ongoing", label: "Ongoing" },
    { id: 5, value: "Completed", label: "Completed" },
  ];

  const header = [
    { id: 1, headerField: "Name" },
    { id: 2, headerField: "Training Name" },
    { id: 3, headerField: "Start Date" },
    { id: 4, headerField: "End Date" },
    { id: 5, headerField: "Progress" },
    { id: 6, headerField: "Status" },
    { id: 7, headerField: "Remarks" },
    { id: 8, headerField: "" },
  ];

  // format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  const toDateInputValue = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().slice(0, 10);
  };

  const handleEditStart = (row) => {
    setEditingId(row._id);
    setEditValues({
      empId: row.employeeId ?? "",
      trainingId: row.trainingId ?? "",
      startDate: toDateInputValue(row.startDate),
      endDate: toDateInputValue(row.endDate),
      progress: row.progress ?? "",
      statusId: row.statusId ?? "",
      remarks: row.remarks ?? "",
    });
  };

  const editCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleEditSave = async (id) => {
    console.log("EDIT VALUE:", editValues);
    const success = await onUpdate(id, editValues);
    if (success) editCancel();
  };

  // Search Function
  const filteredTraining = useMemo(() => {
    const query = search.trim().toLowerCase();

    return training.filter((row) => {
      const matchesSearch =
        !query ||
        row.fullName?.toLowerCase().includes(query) ||
        row.trainingName?.toLowerCase().includes(query);

      const matchesStatus =
        selectedStatus === "All" ||
        row.status?.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [training, search, selectedStatus]);

  return (
    <>
      {/* ============================================================================================== Search ======================================================================================= */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={15}
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 text-xs text-slate-300 bg-[#0F172A] border border-[#06B6D4]/13 placeholder:text-slate-500 rounded-xl
                      outline-none transition-all w-44 tracking-wider focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        <div className="relative">
          {/* Dropdown */}
          <FunnelPlus
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none pl-8 pr-5 py-2 text-xs text-slate-500 rounded-xl
                                        outline-none cursor-pointer transition-all bg-[#0F172A] border border-[#06B6D4]/13 tracking-wider"
          >
            {dropdownValue.map((item) => (
              <option
                key={item.id}
                value={item.value}
                className="bg-slate-900 text-slate-500 tracking-wider text-[9px] sm:text-xs"
              >
                {item.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            size={11}
          />
        </div>
      </div>
      {/* Training row */}
      <div className="rounded-2xl overflow-hidden bg-[#0F172A] border border-[#06B6D4]/13 overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              {header.map((head) => (
                <th
                  key={head.id}
                  className="px-5 py-3.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-widest"
                >
                  {head.headerField}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-slate-500 font-semibold text-xs"
                >
                  Loading.....
                </td>
              </tr>
            ) : filteredTraining.length === 0 ? (
              <tr>
                <td
                  colSpan={header.length + 1}
                  className="text-center py-10 text-slate-500 font-semibold"
                >
                  {`No training records found.`}
                </td>
              </tr>
            ) : (
              filteredTraining.map((row) => {
                const isEditing = editingId === row._id;
                return (
                  <tr
                    key={row._id}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    {/* ============================================================ EMPLOYEE NAME ================================================================= */}
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
                          className="appearance-none min-w-auto rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
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
                          {row.fullName}
                        </span>
                      )}
                    </td>

                    {/* ================================================================= TRAINING NAME ================================================================= */}
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <select
                          value={editValues.trainingId}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              trainingId: e.target.value,
                            }))
                          }
                          className="appearance-none w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
                        >
                          {trainingName.map((item) => (
                            <option
                              key={item._id}
                              value={item._id}
                              className="bg-slate-900 text-slate-500 text-xs"
                            >
                              {item.trainingName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.trainingName}
                        </span>
                      )}
                    </td>

                    {/* ================================================================= START DATE ================================================================== */}
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <input
                          type="date"
                          value={editValues.startDate}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      ) : (
                        <span className="text-xs text-slate-300">
                          {formatDate(row.startDate)}
                        </span>
                      )}
                    </td>

                    {/* ==================================================================== END DATE ======================================================= */}
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <input
                          type="date"
                          value={editValues.endDate}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              endDate: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      ) : (
                        <span className="text-xs text-slate-300">
                          {formatDate(row.endDate)}
                        </span>
                      )}
                    </td>

                    {/* ========================================================================================= PROGRESS ============================================================================================= */}
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValues.progress}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              progress: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.progress ?? 0}%
                        </span>
                      )}
                    </td>

                    {/* =============================================================================== STATUS ======================================================================================== */}
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <select
                          value={editValues.statusId}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              statusId: e.target.value,
                            }))
                          }
                          className="appearance-none min-w-auto rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/50"
                        >
                          {status.map((item) => (
                            <option
                              key={item._id}
                              value={item._id}
                              className="bg-slate-900 text-slate-500 text-xs"
                            >
                              {item.status.charAt(0).toUpperCase() +
                                item.status.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.status?.charAt(0).toUpperCase() +
                            row.status?.slice(1)}
                        </span>
                      )}
                    </td>

                    {/* ==================================================================== REMARKS ============================================= */}
                    <td className="px-5 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValues.remarks}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              remarks: e.target.value,
                            }))
                          }
                          className="min-w-auto rounded-lg bg-[#EFE9E9]/10 border border-white/10 text-xs text-slate-200 px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                      ) : (
                        <span className="text-xs text-slate-300">
                          {row.remarks}
                        </span>
                      )}
                    </td>
                    {/* ================================================================== ACTIONS EDIT =================================== */}
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={editCancel}
                            disabled={saving}
                            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-300 hover:text-white border border-white/10 bg-[#EFE9E9]/5 transition-all duration-300 active:scale-95 disabled:opacity-50"
                          >
                            <X size={13} />
                          </button>
                          <button
                            onClick={() => handleEditSave(row._id)}
                            disabled={saving}
                            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-300 hover:text-white border border-white/10 bg-[#EFE9E9]/5 transition-all duration-300 active:scale-95 disabled:opacity-50"
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
    </>
  );
};
