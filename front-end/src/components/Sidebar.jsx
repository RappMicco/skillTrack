import {
  LayoutDashboard,
  Grid3X3,
  ChartColumn,
  ClipboardList,
  ChevronRight,
  WrenchOff,
  LogOut,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { PageContext } from "../context/PageContext.js";
import { logoutUser } from "../features/auth/authThunk.js";

export const Sidebar = () => {
  const { setActiveDesc } = useContext(PageContext);
  const dispatch = useDispatch();
  //get user
  const { user, loading } = useSelector((state) => state.auth);
  const admin = user?.group === "admin";
  const userName = (user?.firstName || "") + " " + (user?.lastName || "");
  const initials =
    (user?.firstName?.charAt(0) || "") + (user?.lastName?.charAt(0) || "");
  //navigate path and current location
  const Navigate = useNavigate();
  const location = useLocation();

  const sidebarBtn = [
    {
      id: 1,
      title: "Dashboard",
      description: "Employee Growth and Development",
      icon: LayoutDashboard,
      path: "/skill-track/dashboard",
    },
    {
      id: 2,
      title: "Skill Matrix",
      description: "Building Competencies for Future Success",
      icon: Grid3X3,
      path: "/skill-track/skillMatrix",
    },
    {
      id: 3,
      title: "Insight",
      description: "Analyze Skill Trends and Performance Metrics",
      icon: ChartColumn,
      path: "/skill-track/insight",
    },
    // admin condition
    ...(admin
      ? [
          {
            id: 4,
            title: "Assign Training",
            description: "Empowering Employee Growth",
            icon: ClipboardList,
            path: "/skill-track/assign-training",
          },
        ]
      : []),
    ...(admin
      ? [
          {
            id: 5,
            title: "Maintenance",
            description: "Keeping System Data Accurate and Up-to-Date",
            icon: WrenchOff,
            path: "/skill-track/maintenance",
          },
        ]
      : []),
  ];

  //logout
  const handleLogOut = async () => {
    try {
      await dispatch(logoutUser());
      setActiveDesc(null);
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ActiveItem = sidebarBtn.find(
      (item) => item.path == location.pathname,
    );

    setActiveDesc(ActiveItem?.description || "");
  }, [location.pathname]);

  return (
    <>
      {loading && <div>Loading...</div>}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#FFFFFF]/10">
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
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveDesc(item.description);
                Navigate(item.path);
              }}
              className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200
                          ${isActive ? "text-slate-200 bg-[#7F96E0]/20 border border-white/10" : "text-[#E6E1E1]/69 border border-transparent hover:text-slate-200 hover:bg-white/5 cursor-pointer"}`}
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

      {/* logout container */}
      <div className="px-4 py-5 border-t border-[#FFFFFF]/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white bg-linear-to-br from-[#34C8E2] to-[#68C4D4]/20">
            {initials}
          </div>
          <div
            onClick={() => handleLogOut()}
            className="flex items-center flex-1 group cursor-pointer"
          >
            {/* name and group */}
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">{userName}</p>
              <p className="text-[11px] text-white/50 transition-colors duration-300 group-hover:text-white">
                Logout
              </p>
            </div>
            {/* logout icon */}
            <div>
              <LogOut
                onClick={() => handleLogOut()}
                size={19}
                className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
