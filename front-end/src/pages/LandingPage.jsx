import { HeroSection } from "../components/HeroSection";
import { useState, useContext, useRef, useLayoutEffect } from "react";
import { PageContext } from "../context/PageContext.js";
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
  Menu,
  X,
} from "lucide-react";
import { NumbersSection } from "../components/NumbersSection.jsx";
import { FeaturesSection } from "../components/FeaturesSection.jsx";
import { MemoriesGallery } from "../components/MemoriesGallery.jsx";
import { CertifiedExcellence } from "../components/CertifiedExcellence.jsx";
import { Footer } from "../components/Footer.jsx";
import { SubFooter } from "../components/SubFooter.jsx";
import { WatchVideo } from "../components/WatchVideo.jsx";
import { useNavigate } from "react-router";
import { Link } from "react-scroll";
import gsap from "gsap";

export const LandingPage = () => {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const numRef = useRef(null);
  const { watchVideo, openMenu, setOpenMenu } = useContext(PageContext);
  const navigate = useNavigate();
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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
  };

  useLayoutEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      {
        y: -100,
        opacity: 0,
        duration: 0.06,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.3,
        ease: "sine.in",
      },
    );

    gsap.fromTo(
      heroRef.current,
      {
        y: -100,
        opacity: 0,
        duration: 0.06,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.3,
        ease: "sine.in",
      },
    );

    gsap.fromTo(
      numRef.current,
      {
        y: -100,
        opacity: 0,
        duration: 0.06,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.3,
        ease: "sine.in",
      },
    );
  }, []);

  return (
    <>
      <div className="h-screen">
        {watchVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-colors duration-250">
            <div
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden
                      scale-100 translate-y-0 opacity-100 bg-[rgb(10,18,32)] border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]
                      transition-[transform,opacity] duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            >
              <WatchVideo />
            </div>
          </div>
        )}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* glowing effect */}
          <div className="absolute -top-50 -left-50 w-150 h-150 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(59,130,246,0.1)_60%,transparent_70%)] animate-pulse"></div>
          <div className="absolute top-[40%] right-[20%] w-75 h-75 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.06)_60%,transparent_70%)] animate-pulse"></div>
          <div className="absolute top-[40%] right-[20%] w-75 h-75 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.06)_60%,transparent_70%)] animate-pulse"></div>
        </div>

        {/* navigation */}
        <nav
          ref={headerRef}
          className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-white/2 backdrop-filter backdrop-blur-sm flex items-center justify-between px-6 md:px-16 py-3"
        >
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
          <div className="hidden md:flex items-center gap-8 text-xs text-slate-400">
            {/* ================================================= ABOUT ================================================= */}
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              {" "}
              About
            </Link>
            {/* ================================================= FEATURES ================================================= */}
            <Link
              to="features"
              smooth={true}
              duration={500}
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              Features
            </Link>
            {/* ================================================= MEMORIES ================================================= */}
            <Link
              to="memories"
              smooth={true}
              duration={500}
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              Memories
            </Link>
            {/* ================================================= EXCELLENCE ================================================= */}
            <Link
              to="excellence"
              smooth={true}
              duration={500}
              className="hover:text-slate-100 transition-colors cursor-pointer"
            >
              Excellence
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            {/* ============================================================ SIGN IN =================================================================== */}
            <button
              onClick={handleLogin}
              className="px-3 py-1 rounded-xl border-none bg-linear-to-br from-blue-500 to-violet-500 text-white/90 text-[9px] tracking-wider font-semibold cursor-pointer
                       shadow-[0_8px_20px_-6px_rgba(52,200,226,0.5)] transition-all duration-500 hover:-translate-y-0.5 active:scale-95 hover:shadow-[0_8px_20px_-6px_rgba(52,200,226,0.8)]"
            >
              Keep Growing
            </button>
          </div>
          {/* ============================================== MOBILE MODE ===================================== */}
          <div
            onClick={handleClickMenu}
            className="flex items-center md:hidden p-2 text-white/70 hover:text-white bg-white/5 backdrop-blur-xl rounded-lg 
                      px-2 py-2 border border-white/10 hover:bg-white/10 hover:border-white/15 hover:scale-110 duration-500"
          >
            {openMenu ? <X size={13} /> : <Menu size={13} />}
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
          <div ref={heroRef} id="hero" className="relative z-10">
            <HeroSection />
          </div>
        </section>

        {/* ============================================= NUMBERS SECTION ==================================== */}
        <section className="px-6 md:px-12 py-10 border-t border-b border-white/5">
          <div
            ref={numRef}
            className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <NumbersSection />
          </div>
        </section>

        {/* ========================================== EVERYTHING YOU NEED ========================================= */}
        <section
          id="features"
          className="px-6 md:px-12 py-20 max-w-7xl mx-auto"
        >
          <FeaturesSection />
        </section>

        {/* =========================================== MEMORIES TO KEEP ================================== */}
        <section id="memories" className="px-6 md:px-12 py-16 bg-white/[0.016]">
          <div className="max-w-7xl mx-auto">
            <MemoriesGallery />
          </div>
        </section>

        {/* ====================================== CERTIFIED EXCELLENCE ================================== */}
        <section id="excellence" className="px-6 md:px-12 py-20 mx-auto">
          <CertifiedExcellence />
        </section>

        {/* ==========================================  YOUR GROW START HERE ====================================*/}
        <section className="px-6 md:px-12 py-20">
          <SubFooter />
        </section>

        {/* ================================================ FOOTER =============================================  */}
        <footer className="px-6 md:px-12 py-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Footer />
          </div>
        </footer>
      </div>

      {/* ======================================================================= Mobile Menu =============================================================================*/}
      {openMenu && (
        <div className="fixed inset-0 bg-black z-20 flex-col py-25 md:hidden">
          <div className="flex flex-col items-center justify-center flex-1 gap-6 text-md text-gray-300">
            <Link
              to="hero"
              smooth={true}
              duration={500}
              onClick={() => setOpenMenu(false)}
              className="px-6 py-2 text-white/70 hover:text-white transition-all relative group rounded-full hover:bg-white/10"
            >
              About
            </Link>
            <Link
              to="features"
              smooth={true}
              duration={500}
              onClick={() => setOpenMenu(false)}
              className="px-6 py-2 text-white/70 hover:text-white transition-all relative group rounded-full hover:bg-white/10"
            >
              Features
            </Link>
            <Link
              to="memories"
              smooth={true}
              duration={500}
              onClick={() => setOpenMenu(false)}
              className="px-6 py-2 text-white/70 hover:text-white transition-all relative group rounded-full hover:bg-white/10"
            >
              Memories
            </Link>
            <Link
              to="excellence"
              smooth={true}
              duration={500}
              onClick={() => setOpenMenu(false)}
              className="px-6 py-2 text-white/70 hover:text-white transition-all relative group rounded-full hover:bg-white/10"
            >
              Excellence
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
