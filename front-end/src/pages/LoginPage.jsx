import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk.js";

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

  return (
    <div className="min-h-screen flex items-center justify-center relative over">
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
              htmlFor="employeeId"
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
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cad2d387]"
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
  );
};
