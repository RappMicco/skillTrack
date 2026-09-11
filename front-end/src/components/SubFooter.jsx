import { useNavigate } from "react-router";

export const SubFooter = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="absolute -top-20 -right-20 w-62.5 h-62.5 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.2)_0%,transparent_70%)] blur-[30px] pointer-events-none"></div>
      <div className="absolute -bottom-15 -left-15 w-50 h-50 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] blur-[30px] pointer-events-none"></div>

      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
        Your Growth Start Here
      </p>

      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
        Never be
        <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent gradient-text">
          {" "}
          afraid to learn{" "}
        </span>
        something new
      </h2>

      <p className="text-xs font-semibold text-slate-400 mb-8 tracking-widest max-w-xl mx-auto">
        Start again. Learn again. Grow again. Know your worth—you are capable,
        you are growing, and you are valuable.
      </p>

      <div className="flex items-center justify-center">
        <button
          onClick={handleLogin}
          className="px-3 py-2 rounded-xl border-none bg-linear-to-br from-blue-500 to-violet-500 text-white/90 text-[9px] tracking-wider font-semibold cursor-pointer
                       shadow-[0_8px_20px_-6px_rgba(52,200,226,0.5)] transition-all duration-500 hover:-translate-y-0.5 active:scale-95 hover:shadow-[0_8px_20px_-6px_rgba(52,200,226,0.8)]"
        >
          Start Your Growth
        </button>
      </div>
    </>
  );
};
