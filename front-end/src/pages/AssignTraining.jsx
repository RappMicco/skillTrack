import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkills,
  fetchTrainingProviders,
  fetchEmployeeList,
  fetchStatusTraining,
} from "../features/maintenance/maintenanceThunk";
import { Link } from "lucide-react";

export const AssignTraining = () => {
  const dispatch = useDispatch();

  const { employees, trainingProviders, statusTraining, error } = useSelector(
    (state) => state.maintenance,
  );

  const [empId, setEmpId] = useState("");
  const [training, setTraining] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState("");
  const [remarks, setRemarks] = useState("");

  const fieldState = {
    empId: [empId, setEmpId],
    training: [training, setTraining],
    status: [status, setStatus],
    startDate: [startDate, setStartDate],
    endDate: [endDate, setEndDate],
    progress: [progress, setProgress],
    remarks: [remarks, setRemarks],
  };

  // options only exist for dropdown fields
  const fieldOptions = {
    empId: employees.map((emp) => ({ value: emp._id, label: emp.fullName })),
    training: trainingProviders.map((t) => ({
      value: t._id,
      label: t.trainingName,
    })),
    status: statusTraining.map((item) => ({
      value: item._id,
      label: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    })),
  };

  const trainingDetails = [
    { key: "empId", label: "Employee", inputType: "dropdown" },
    { key: "training", label: "Training", inputType: "dropdown" },
    { key: "status", label: "Status", inputType: "dropdown" },
    { key: "startDate", label: "Start Date", inputType: "date" },
    { key: "endDate", label: "End Date", inputType: "date" },
    { key: "progress", label: "Progress", inputType: "input" },
    { key: "remarks", label: "Remarks", inputType: "input" },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([
          dispatch(fetchSkills()),
          dispatch(fetchTrainingProviders()),
          dispatch(fetchEmployeeList()),
          dispatch(fetchStatusTraining()),
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, [dispatch]);
  return (
    <div className="space-y-5">
      {/* header */}
      <div className="bg-[linear-gradient(to_right,#001A31_30%,#2A2C8D_100%)] rounded-[20px] px-4 py-3">
        <h1 className="text-md font-semibold text-[#E7EFF0]/70 tracking-wide">
          Training Registration
        </h1>
        <p className="text-xs text-[#E7EFF0]/40 tracking-wide">
          Please complete all required details before submitting
        </p>
      </div>

      {/* ============================================================================== Assign Training =========================================================================== */}
      <div className="rounded-2xl overflow-hidden bg-[#0F172A] border border-[#06B6D4]/13">
        {/* header */}
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-slate-200 tracking-wide">
            Training Management
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Manage employee training and schedules
          </p>
        </div>

        {/* ================================================================== training registration form ============================================================================== */}
        <form
          action=""
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 px-5 py-4 border-b border-white/5"
        >
          {trainingDetails.map((item) => {
            const [value, setValue] = fieldState[item.key];
            const options = fieldOptions[item.key] ?? [];

            return (
              <div className="flex flex-col gap-1" key={item.key}>
                <label className="flex gap-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  {item.label}
                  {item.inputType !== "input" && (
                    <span className="text-red-500/70">*</span>
                  )}
                </label>

                {item.inputType === "dropdown" ? (
                  <select
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="appearance-none px-3 py-2 text-xs text-slate-500 rounded-xl outline-none cursor-pointer transition-all bg-white/5 border border-[#06B6D4]/13 tracking-wider w-full"
                  >
                    <option
                      value=""
                      className="bg-slate-900 text-slate-500 tracking-wider text-xs"
                    >
                      Select {item.label.toLowerCase()}
                    </option>
                    {options.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-slate-900 text-slate-500 tracking-wider text-xs"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : // ======================================================= Start Date & End Date ===================================================================
                item.inputType === "date" ? (
                  <input
                    type="date"
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="px-3 py-2 text-xs text-slate-500 border border-white/9 bg-white/5
                              rounded-xl outline-none tracking-wider focus:ring-1 focus:ring-blue-500/50"
                  />
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="px-3 py-2 text-xs text-slate-300 border border-white/9 bg-white/5
                            rounded-xl outline-none tracking-wider focus:ring-1 focus:ring-blue-500/50"
                  />
                )}
              </div>
            );
          })}
          {/* submit */}
          <button
            className="justify-self-start self-end flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] tracking-wider text-white border border-emerald-500/30
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
      </div>
    </div>
  );
};
