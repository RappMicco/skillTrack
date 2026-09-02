import { Search, FunnelPlus } from "lucide-react";

export const AssignTrainingList = () => {
  const dropdownValue = [
    { id: 1, value: "All", label: "All" },
    { id: 2, value: "Upcoming", label: "Upcoming" },
    { id: 3, value: "Pending", label: "Pending" },
    { id: 4, value: "Ongoing", label: "Ongoing" },
    { id: 5, value: "Completed", label: "Completed" },
  ];

  return (
    <>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={15}
        />

        <input
          type="text"
          placeholder="Search..."
          // value={skillMatrixSearch}
          // onChange={(e) => setSkillMatrixSearch(e.target.value)}
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
          // value={skillMatrixGroupFilter}
          // onChange={(e) => setSkillMatrixGroupFilter(e.target.value)}
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
      </div>
    </>
  );
};
