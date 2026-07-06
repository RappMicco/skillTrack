import {
  LayoutDashboard,
  Grid3X3,
  ChartColumn,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const admin = user?.group === "admin";
  const sidebarBtn = [
    {
      id: 1,
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      title: "Skill Matrix",
      icon: Grid3X3,
    },
    {
      id: 3,
      title: "Insight",
      icon: ChartColumn,
    },
    // admin condition
    ...(admin
      ? [
          {
            id: 4,
            title: "Assign Training",
            icon: ClipboardList,
          },
        ]
      : []),
  ];
  return (
    <>
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[#FFFFFF]/10">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-linear-to-br from-[#34C8E2] to-[#68C4D4]/20">
          <span className="text-white text-sm font-bold tracking-tight">
            ST
          </span>
        </div>
        <span className="text-lg font-bold bg-linear-to-r from-[#34C8E2] to-[#68C4D4] bg-clip-text text-transparent">
          SkillTrack
        </span>
      </div>
      {/* sidebar button */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {sidebarBtn.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                          text-[#E6E1E1]/69 hover:text-slate-200 hover:bg-white/5`}
            >
              <Icon size={16} />
              <span className="ml-3 flex-1 text-left whitespace-nowrap">
                {item.title}
              </span>
              <ChevronRight size={14} className="ml-auto" />
            </button>
          );
        })}
      </nav>
    </>
  );
};
