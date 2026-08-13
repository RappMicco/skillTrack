import { Search } from "lucide-react";

export const SearchToggleCard = () => {
  return (
    <>
      <div className="relative w-full border border-white/5 bg-[#EFE9E9]/5">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={15}
        />

        <input
          type="text"
          placeholder="Search..."
          className="pl-8 pr-4 py-2 text-xs text-slate-300 placeholder-slate-600 rounded-xl outline-none transition-all w-44"
        />
      </div>
    </>
  );
};
