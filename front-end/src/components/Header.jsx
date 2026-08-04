import { PageContext } from "../context/PageContext.js";
import { useContext } from "react";
import { useSelector } from "react-redux";

export const Header = () => {
  const { activeDesc } = useContext(PageContext);
  const { user } = useSelector((state) => state.auth);
  const group = user?.group;
  // concat name
  const userName = (user?.firstName || "") + " " + (user?.lastName || "");
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#FFFFFF]/7 shrink-0">
      <div className="flex items-center">
        <p className="text-md font-bold text-[#E7EFF0]/51">{activeDesc}</p>
      </div>
      {/* OSS LOGO */}
      <div className="flex items-center gap-3">
        {/* member name */}
        <div>
          <p className="text-[11px] font-semibold text-[#F3EDED]/76 whitespace-nowrap">
            {userName}
          </p>
          <p className="text-[11px] text-white/50">
            {group === "admin"
              ? "Admin"
              : group === "smart_local" ||
                  group === "smart_outsource" ||
                  group === "development"
                ? "OSS-Member"
                : "IIS-Member"}
          </p>
        </div>
        {/* OSS */}
        <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-linear-to-br from-[#34C8E2] to-[#68C4D4]/20">
          OSS
        </div>
      </div>
    </header>
  );
};
