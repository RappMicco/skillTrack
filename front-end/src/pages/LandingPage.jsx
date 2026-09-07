export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* glowing effect */}
        <div className="absolute -top-50 -left-50 w-150 h-150 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(59,130,246,0.1)_60%,transparent_70%)] animate-pulse"></div>
        <div className="absolute top-[40%] right-[20%] w-75 h-75 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.06)_60%,transparent_70%)] animate-pulse"></div>
        <div className="absolute top-[40%] right-[20%] w-75 h-75 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.06)_60%,transparent_70%)] animate-pulse"></div>
      </div>

      {/* navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-white/3 backdrop-filter backdrop-blur-sm flex items-center justify-between px-6 md:px-12 py-4">
        {/* ========================================================== HEADER ============================================================= */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white bg-linear-to-r from-[#198395] to-[#296671e5]">
            ST
          </div>

          <div className="flex">
            <span className="bg-linear-to-r from-[#34C8E2] to-[#20525be5] bg-clip-text text-transparent text-lg font-bold tracking-normal">
              SkillTrack
            </span>
          </div>
        </div>
        <div className="flex items-center">
          {/* ============================================================ LOGIN =================================================================== */}
          <button
            className="px-4 py-1.5 rounded-xl text-[11px] font-semibold text-white/80 transition-all duration-500 bg-[linear-gradient(to_right,#001A31_40%,#2A2C8D_100%)] shadow-lg drop-shadow-blue-900
                       hover:-translate-y-1 hover:shadow-blue-950 hover:text-white active:scale-95 hover:border-purple-600/30 tracking-wider cursor-pointer"
          >
            Track Your Growth
          </button>
        </div>
      </nav>
    </div>
  );
};
