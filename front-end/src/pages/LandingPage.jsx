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
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-white/1 backdrop-filter backdrop-blur-sm flex items-center justify-between px-6 md:px-16 py-3">
        {/* ========================================================== HEADER ============================================================= */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-linear-to-br from-[#34C8E2] to-[#68C4D4]/20">
            <span className="text-white text-sm font-bold tracking-tight">
              ST
            </span>
          </div>

          <span className="text-lg font-bold bg-linear-to-r from-[#34C8E2] to-[#68C4D4] bg-clip-text text-transparent">
            SkillTrack
          </span>
        </div>
        <div className="flex items-center">
          {/* ============================================================ LOGIN =================================================================== */}
          <button
            className="px-5 py-2 rounded-xl border-none bg-linear-to-br from-[#34C8E2] to-[#1F8FAE] text-white text-xs tracking-wider font-semibold cursor-pointer
                       shadow-[0_8px_20px_-6px_rgba(52,200,226,0.4)] transition-all duration-500 hover:-translate-y-0.5 active:scale-95"
          >
            Sign In
          </button>
        </div>
      </nav>
    </div>
  );
};
