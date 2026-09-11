import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk.js";

const marqueeItems = [
  { type: "photo", img: "/images/memories1.jpg" },
  { type: "photo", img: "/images/memories2.jpg" },
  { type: "photo", img: "/images/memories3.jpg" },
  { type: "photo", img: "/images/memories4.jpg" },
];

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    empId: "",
    password: "",
  });
  const { loading, message, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(credentials)).unwrap();
      navigate("/skill-track");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLandingPage = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* ================================================ LEFT PANEL (desktop only) ================================================ */}
      <div
        className="hidden lg:flex relative w-1/2 flex-col justify-between overflow-hidden p-14
                       bg-[linear-gradient(155deg,#0b1120_0%,#0e1a3a_45%,#1a1650_100%)]"
      >
        {/* ambient glows */}
        <div className="pointer-events-none absolute -top-30 -left-25 w-105 h-105 rounded-full bg-[radial-gradient(circle,rgba(52,200,226,0.18),transparent_70%)]"></div>
        <div className="pointer-events-none absolute -bottom-25 -right-20 w-95 h-95 rounded-full bg-[radial-gradient(circle,rgba(139,95,209,0.16),transparent_70%)]"></div>

        {/* logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            onClick={handleLandingPage}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-[#34C8E2] to-[#68C4D4]/20"
          >
            <span className="text-white text-base font-bold">ST</span>
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-[#34C8E2] to-[#68C4D4] bg-clip-text text-transparent">
            SkillTrack
          </span>
        </div>

        {/* headline */}
        <div className="relative z-10 max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#68C4D4] mb-4">
            Employee Growth &amp; Development
          </p>
          <h1 className="text-4xl leading-tight font-bold text-slate-100 mb-5">
            Grow your team&apos;s
            <span className="block bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-text">
              skills &amp; potential
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-slate-400">
            Track proficiency, manage training, and turn every skill gap into a
            clear next step for your team.
          </p>
        </div>

        {/* marquee: certifications + team photos */}
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3.5">
            Captured Moments
          </p>
          <div className="marquee-track marquee-fade-mask overflow-hidden -mx-14 px-14">
            <div className="flex gap-3.5 w-max animate-marquee">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <div
                  key={item.img + "-" + index}
                  className="w-40 h-40 shrink-0 rounded-2xl overflow-hidden shadow-[0_12px_25px_-8px_rgba(0,0,0,0.4)]"
                >
                  <img
                    src={item.img}
                    alt={item.type}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================ MOBILE CARD (mobile only) ================================================ */}
      <div className="lg:hidden min-h-screen w-full flex items-center justify-center relative">
        <div className="relative w-full max-w-md mx-4 rounded-3xl p-8 bg-white/3 border border-white/10 backdrop-blur-2xl">
          {/* SkillTrack Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg bg-linear-to-br from-[#34C8E2] to-[#68C4D4]/20 ">
              <span className="text-white text-xl font-bold tracking-tight">
                ST
              </span>
            </div>
            {/* SkillTrack Title */}
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#34C8E2] to-[#68C4D4] bg-clip-text text-transparent">
              SkillTrack
            </h1>
            <p className="text-[#34c8e291] text-sm mt-1">
              Employee Growth & Development
            </p>
          </div>
          {/* Welcome back */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#cad2d3d0]">
              Welcome back
            </h2>
            <p className="text-sm text-[#cad2d36b] mt-0.5">
              Sign to your account to continue
            </p>
          </div>
          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Employee ID */}
            <div>
              <label
                htmlFor="mobileEmployeeId"
                className="block text-xs font-semibold text-[#cad2d3d0] uppercase tracking-wider mb-2"
              >
                Employee Id
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cad2d387]"
                  size={15}
                />
                <input
                  id="mobileEmployeeId"
                  type="text"
                  name="empId"
                  value={credentials.empId}
                  onChange={handleChange}
                  placeholder="Ex. SP1234"
                  className="w-full pl-10 pr-4 py-3 text-sm text-slate-200/70 placeholder-[#cad2d363] rounded-xl bg-white/3 border
                      border-white/10 backdrop-blur-2xl focus:outline-none focus:ring-1 focus:ring-[#34c8e26b] transition-all duration-200 cursor-pointer"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="mobilePassword"
                className="block text-xs font-semibold text-[#cad2d3d0] uppercase tracking-wider mb-2"
              >
                password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cad2d387]"
                  size={15}
                />
                <input
                  id="mobilePassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm text-slate-200/70 placeholder-[#cad2d363] rounded-xl bg-white/3 border
                      border-white/10 backdrop-blur-2xl focus:outline-none focus:ring-1 focus:ring-[#34c8e26b] transition-all duration-200 cursor-pointer"
                />
                {/* Visible (eye) icon */}
                <button
                  type="button"
                  onClick={() => handleShowPassword()}
                  className="absolute right-3.5 top-4 text-[#cad2d387] hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center bg-[#04a5e0af]/60 gap-2 py-3.5 rounded-xl text-sm font-semibold text-white shadow-2xl
                                              transition-all hover:bg-[#34c8e26b] hover:-translate-y-0.5 duration-500 mt-2 relative overflow-hidden cursor-pointer"
            >
              <LogIn size={17} />
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {message && (
              <div className="flex items-center justify-center mt-3 rounded bg-green-200 p-2 text-green-700 border-green-300">
                {message}
              </div>
            )}

            {error && (
              <div className="flex item-center justify-center mt-3 rounded bg-red-200 p-2 text-red-700 border-red-300">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* ================================================ RIGHT PANEL - LOGIN FORM (desktop only) ================================================ */}
      <div className="hidden lg:flex relative w-1/2 items-center justify-center p-8 ">
        {/* glowing effect */}
        <div className="absolute -top-50 -left-50 w-150 h-150 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(59,130,246,0.1)_60%,transparent_70%)] animate-pulse"></div>
        <div className="absolute top-[40%] right-[10%] w-75 h-75 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.06)_60%,transparent_70%)] animate-pulse"></div>
        <div className="absolute top-[40%] right-[20%] w-75 h-75 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.06)_60%,transparent_70%)] animate-pulse"></div>

        <div className="relative w-full max-w-md mx-4 rounded-3xl p-8 bg-white/3 border border-white/10 backdrop-blur-2xl">
          <div className="w-full max-w-sm rounded-xl">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#cad2d3d0]">
                Welcome back
              </h2>
              <p className="text-sm text-[#cad2d36b] mt-0.5">
                Sign to your account to continue
              </p>
            </div>
            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Employee ID */}
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-xs font-semibold text-[#cad2d3d0] uppercase tracking-wider mb-2"
                >
                  Employee Id
                </label>
                <div className="relative">
                  <Mail
                    className="absolute z-20 left-3.5 top-1/2 -translate-y-1/2 text-[#cad2d387]"
                    size={15}
                  />
                  <input
                    id="employeeId"
                    type="text"
                    name="empId"
                    value={credentials.empId}
                    onChange={handleChange}
                    placeholder="Ex. SP1234"
                    className="w-full pl-10 pr-4 py-3 text-sm text-slate-200/70 placeholder-[#cad2d363] rounded-xl bg-white/3 border
                      border-white/10 backdrop-blur-2xl focus:outline-none focus:ring-1 focus:ring-[#34c8e26b] transition-all duration-200 cursor-pointer"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#cad2d3d0] uppercase tracking-wider mb-2"
                >
                  password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute z-20 left-3.5 top-1/2 -translate-y-1/2 text-[#cad2d387]"
                    size={15}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 text-sm text-slate-200/70 placeholder-[#cad2d363] rounded-xl bg-white/3 border
                      border-white/10 backdrop-blur-2xl focus:outline-none focus:ring-1 focus:ring-[#34c8e26b] transition-all duration-200 cursor-pointer"
                  />
                  {/* Visible (eye) icon */}
                  <button
                    type="button"
                    onClick={() => handleShowPassword()}
                    className="absolute right-3.5 top-4 text-[#cad2d387] hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center bg-[#04a5e0af]/60 gap-2 py-3.5 rounded-xl text-sm font-semibold text-white shadow-2xl
                                              transition-all hover:bg-[#34c8e26b] hover:-translate-y-0.5 duration-500 mt-2 relative overflow-hidden cursor-pointer"
              >
                <LogIn size={17} />
                {loading ? "Signing in..." : "Sign in"}
              </button>

              {message && (
                <div className="flex items-center justify-center mt-3 rounded bg-green-200 p-2 text-green-700 border-green-300">
                  {message}
                </div>
              )}

              {error && (
                <div className="flex item-center justify-center mt-3 rounded bg-red-200 p-2 text-red-700 border-red-300">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
