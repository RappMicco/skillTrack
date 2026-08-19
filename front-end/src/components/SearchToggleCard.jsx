import { Search, FunnelPlus, ChevronDown } from "lucide-react";
import { skillMatrixToggle } from "../hook/skillMatrixToggle.js";
import { useState } from "react";

export const SearchToggleCard = () => {
  const [selectedStatus, setSelectedStatus] = useState(false);
  const dropdownValue = [
    { id: 1, value: "All", label: "All Group" },
    { id: 2, value: "smart_local", label: "Smart Local" },
    { id: 3, value: "smart_outsource", label: "Smart Outsource" },
    { id: 4, value: "development", label: "Development Group" },
    { id: 5, value: "network", label: "Network Group" },
  ];

  const handleToggleClick = (item) => {
    setSelectedStatus(item);
  };
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
          className="pl-8 pr-4 py-2 text-xs text-slate-300 border border-white/9 bg-[#EFE9E9]/5 placeholder:text-slate-500 rounded-xl 
                      outline-none transition-all w-44 tracking-wider focus:ring-1 focus:ring-blue-500/50"
        />
      </div>

      {/* Dropdown */}
      <div className="relative">
        <FunnelPlus
          size={12}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <select
          name=""
          id=""
          className="appearance-none pl-8 pr-7 py-2 text-xs text-slate-500 rounded-xl
                                        outline-none cursor-pointer transition-all bg-white/5 border border-white/9 tracking-wider"
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

      {/* toggle button */}
      <div className="flex item-center gap-1 p-1 overflow-x-auto rounded-xl border border-white/9 bg-[#EFE9E9]/5">
        {skillMatrixToggle.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              handleToggleClick(item.label);
            }}
            className={`shrink-0 flex items-center justify-center rounded-lg px-3 py-1.5 text-xs tracking-wider transition-colors duration-300
                        ${
                          selectedStatus === item.label
                            ? "border border-[#06B6D4]/20 bg-[#06B6D4]/42 text-white"
                            : "cursor-pointer text-slate-500 shadow-md hover:bg-white/5 hover:text-slate-300"
                        }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};
