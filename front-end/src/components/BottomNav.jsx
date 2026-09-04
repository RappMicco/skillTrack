import { useContext } from "react";
import { LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { PageContext } from "../context/PageContext.js";
import { getNavItems } from "../utils/navItems.js";
import { logoutUser } from "../features/auth/authThunk.js";

export const BottomNav = () => {
  const { setActiveDesc } = useContext(PageContext);
  const { user } = useSelector((state) => state.auth);
  const admin = user?.group === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = getNavItems(admin);

  const handleLogOut = async () => {
    try {
      await dispatch(logoutUser());
      setActiveDesc(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch
                  bg-[linear-gradient(to_top,#111827_75%,#001159_100%)] border-t border-[#06B6D4]/20
                  pb-[env(safe-area-inset-bottom)]"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveDesc(item.description);
              navigate(item.path);
            }}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-200 group
                        ${isActive ? "text-slate-200" : "text-[#E6E1E1]/60 hover:text-slate-200"}`}
          >
            <span
              className={`flex items-center justify-center w-9 h-7 rounded-lg transition-all duration-200 group-hover:scale-120
                          ${isActive ? "bg-[#7F96E0]/20 border border-white/10" : "group-hover:bg-white/5"}`}
            >
              <Icon size={17} />
            </span>
            <span className="text-[9px] font-medium tracking-wide whitespace-nowrap">
              {item.shortLabel}
            </span>
          </button>
        );
      })}

      <button
        onClick={handleLogOut}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-200 group text-[#E6E1E1]/60 hover:text-red-300"
      >
        <span className="flex items-center justify-center w-9 h-7 rounded-lg transition-all duration-200 group-hover:scale-110 group-hover:bg-red-500/5">
          <LogOut size={17} />
        </span>
        <span className="text-[9px] font-medium tracking-wide whitespace-nowrap">
          Logout
        </span>
      </button>
    </nav>
  );
};
