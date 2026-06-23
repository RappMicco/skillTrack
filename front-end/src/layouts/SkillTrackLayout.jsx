import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar.jsx";
import { Header } from "../components/Header.jsx";

export const SkillTrackLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar container */}
      <aside className="fixed lg:static inset-y-0 left-0 z-40 w-60 flex flex-col transition-transform duration-300 -translate-x-full lg:translate-x-0">
        <Sidebar />
      </aside>

      {/* Header */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        <Outlet />
      </main>
    </div>
  );
};
