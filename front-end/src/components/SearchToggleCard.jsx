import { Search, FunnelPlus, ChevronDown, CircleAlert } from "lucide-react";
import { skillMatrixToggle } from "../hook/skillMatrixToggle.js";
import { useContext, useState } from "react";
import { PageContext } from "../context/PageContext.js";

export const SearchToggleCard = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { viewLegend, setViewLegend } = useContext(PageContext);
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

  const handleLegendClick = () => {
    setViewLegend(!viewLegend);
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
      {/* Legend */}
      <button
        onClick={() => handleLegendClick()}
        className={`ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs tracking-wider transition-all
                         border border-white/10 text-slate-500 duration-300 active:scale-95 
                         ${viewLegend ? "bg-slate-500/25 border border-slate-500/60 text-white/50" : "bg-[#EFE9E9]/5 hover:border-slate-500/60 hover:text-slate-400 hover:bg-slate-500/25"}`}
      >
        <CircleAlert size={14} />
        Legend
      </button>
    </>
  );
};
