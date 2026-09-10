export const Footer = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md flex items-center justify-center bg-linear-to-br from-[#34C8E2] to-[#68C4D4]/20">
          <span className="text-white text-[12px] font-bold tracking-tight">
            ST
          </span>
        </div>

        <span className="text-[13px] font-bold bg-linear-to-r from-[#34C8E2] to-[#68C4D4] bg-clip-text text-transparent">
          SkillTrack
        </span>
      </div>

      <p className="text-xs text-slate-600">
        © 2026 SkilTrack. All rights reserved.
      </p>
      <div>
        <p className="text-xs text-slate-600">
          "Let the wise listen and add to their learning." - Proverbs: 1:5
        </p>
      </div>
    </>
  );
};
