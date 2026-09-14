import {
  BookOpen,
  ChartColumn,
  TrendingUp,
  AudioWaveform,
  NotepadText,
  Blocks,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "../lib/gsap.js";

export const FeaturesSection = () => {
  const headerRef = useRef([]);
  const featuresRef = useRef([]);
  const features = [
    {
      title: "Structured Training Plan",
      description:
        "Assign, schedule, and track training programs tailored to every role and department.",
      icon: <BookOpen size={16} className="text-blue-400" />,
      bgColor: "bg-blue-500/10 border border-blue-500/15",
    },
    {
      title: "Real-time Insights",
      description:
        "Live dashboards reveal completion rates, skill gaps, and engagement trends at a glance.",
      icon: <ChartColumn size={16} className="text-purple-400" />,
      bgColor: "bg-purple-500/10 border border-violet-500/15",
    },
    {
      title: "Skill Matrix Tracking",
      description:
        "Visualise competency levels across your entire team and identify areas for growth.",
      icon: <TrendingUp size={16} className="text-emerald-400" />,
      bgColor: "bg-green-500/10 border border-emerald-500/15",
    },
    {
      title: "Employee Development Plans",
      description:
        "Build personalized development plans that align employee growth with organizational objectives.",
      icon: <Blocks size={16} className="text-indigo-400" />,
      bgColor: "bg-indigo-500/10 border border-indigo-500/15",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor course completion, learning activities, and performance insights in real time.",
      icon: <AudioWaveform size={16} className="text-amber-400" />,
      bgColor: "bg-yellow-500/10 border border-amber-500/15",
    },
    {
      title: "Training Management",
      description:
        "Create, organize, and assign training programs to ensure employees stay on track with their development goals.",
      icon: <NotepadText size={16} className="text-teal-400" />,
      bgColor: "bg-teal-500/10 border border-teal-500/15",
    },
  ];

  useEffect(() => {
    if (!headerRef.current || !featuresRef.current) return;

    gsap.fromTo(
      headerRef.current,
      {
        y: 20,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current[0],
          start: "top 85%",
        },
      },
    );

    gsap.fromTo(
      featuresRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: {
          each: 0.15,
          from: "start", // try "center" for cooler effect
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current[0],
          start: "top 85%",
        },
      },
    );
  }, []);
  return (
    <>
      <div className="text-center mb-14">
        <p
          ref={(el) => (headerRef.current[0] = el)}
          className="text-xs font-semibold uppercase tracking-widest mb-3 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400  bg-clip-text text-transparent"
        >
          Everything you need
        </p>

        <h2
          ref={(el) => (headerRef.current[1] = el)}
          className="text-3xl md:text-4xl font-bold mb-2 tracking-wider text-white"
        >
          {`Support Every `}
          <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400  bg-clip-text text-transparent gradient-text">
            Learning Journey
          </span>
        </h2>

        <span
          ref={(el) => (headerRef.current[2] = el)}
          className="text-slate-400 text-xs tracking-widest font-semibold"
        >
          Plan, track, and manage employee learning from onboarding to skill
          development in one unified platform.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((item, index) => (
          <div
            ref={(el) => (featuresRef.current[index] = el)}
            key={index}
            className="rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1 cursor-default bg-white/5 border border-white/8"
          >
            {/* =================== ICON =================== */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 bg-blue-500/[0.094] border border-blue-500/20 ${item.bgColor}`}
            >
              {item.icon}
            </div>
            {/* ================== TITLE ====================== */}
            <h3 className="text-sm font-semibold text-white/80 mb-2 tracking-wide">
              {item.title}
            </h3>

            {/* ======================== DESCRIPTION ==================== */}
            <p className="text-xs text-slate-500 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
