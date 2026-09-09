import { HeroSection } from "../components/HeroSection";
import { useState } from "react";
import {
  BookOpenText,
  Trophy,
  Medal,
  Award,
  MoonStar,
  Code,
  Braces,
  Terminal,
  Bug,
  GitBranch,
  Rocket,
} from "lucide-react";
import { NumbersSection } from "../components/NumbersSection.jsx";
import { FeaturesSection } from "../components/FeaturesSection.jsx";

export const LandingPage = () => {
  const icons = [
    BookOpenText,
    Trophy,
    Medal,
    Award,
    MoonStar,
    Code,
    Braces,
    Terminal,
    Bug,
    GitBranch,
    Rocket,
  ];

  const [particles] = useState(() =>
    [...Array(15)].map(() => {
      const Icon = icons[Math.floor(Math.random() * icons.length)];

      return {
        left: Math.random() * 100,
        duration: 8 + Math.random() * 20,
        delay: Math.random() * 5,
        Icon,
      };
    }),
  );

  return (
    <div className="h-screen overflow-y-auto custom-scrollbar">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* glowing effect */}
        <div className="absolute -top-50 -left-50 w-150 h-150 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(59,130,246,0.1)_60%,transparent_70%)] animate-pulse"></div>
        <div className="absolute top-[40%] right-[20%] w-75 h-75 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.06)_60%,transparent_70%)] animate-pulse"></div>
        <div className="absolute top-[40%] right-[20%] w-75 h-75 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.06)_60%,transparent_70%)] animate-pulse"></div>
      </div>

      {/* navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-white/2 backdrop-filter backdrop-blur-sm flex items-center justify-between px-6 md:px-16 py-3">
        {/* ========================================================== HEADER ============================================================= */}
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
        <div className="flex items-center">
          {/* ============================================================ SIGN IN =================================================================== */}
          <button
            className="px-3 py-1 rounded-xl border-none bg-linear-to-br from-blue-500 to-violet-500 text-white/90 text-[9px] tracking-wider font-semibold cursor-pointer
                       shadow-[0_8px_20px_-6px_rgba(52,200,226,0.5)] transition-all duration-500 hover:-translate-y-0.5 active:scale-95 hover:shadow-[0_8px_20px_-6px_rgba(52,200,226,0.8)]"
          >
            Keep Growing
          </button>
        </div>
      </nav>

      {/* ======================================================================== HERO SECTION ========================================================== */}
      <section className="relative pt-28 pb-16 px-6 md:px-12 overflow-hidden">
        {/*  ============================================================= Floating Icons ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {particles.map((p, i) => {
            const Icon = p.Icon;
            const isUp = i % 2 === 0;

            return (
              <div
                key={i}
                className={`absolute opacity-20 ${
                  isUp ? "animate-up" : "animate-float"
                }`}
                style={{
                  left: `${p.left}%`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
              >
                <Icon className="w-3 h-3 text-blue-400/40" />
              </div>
            );
          })}
        </div>

        {/* Hero Content */}
        <div className="relative z-10">
          <HeroSection />
        </div>
      </section>

      {/* ============================================= NUMBERS SECTION ==================================== */}
      <section className="px-6 md:px-12 py-10 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <NumbersSection />
        </div>
      </section>

      {/* ========================================== EVERYTHING YOU NEED ========================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <FeaturesSection />
      </section>
    </div>
  );
};
