import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar.jsx";
import { Header } from "../components/Header.jsx";

export const SkillTrackLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar container */}
      <aside
        className="fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-60 flex flex-col transition-transform duration-300 -translate-x-full lg:translate-x-0
                        bg-[linear-gradient(to_bottom,#111827_67%,#001159_100%)] border border-[#06B6D4]/20"
      >
        <Sidebar />
      </aside>

      {/* Header */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />

        {/* Main */}
        <main className="flex-1 overflow-y-auto custom-scrollbar px-5 py-6 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
