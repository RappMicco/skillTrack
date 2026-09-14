import gsap from "gsap";
import { useRef, useEffect } from "react";

export const CertifiedExcellence = () => {
  const headerRef = useRef([]);
  const certificationRef = useRef([]);
  const certifications = [
    {
      img: "/images/certification2.jpg",
      title: "Intelligent Skill Gap Detection & Development Insights",
      description:
        "Recognized for identifying skill gaps and providing actionable insights to support targeted employee development.",
      award: "Innovation Excellence Award",
    },

    {
      img: "/images/certification1.jpg",
      title: "Centralized Employee Skills & Training Management",
      description:
        "Recognized for streamlining employee training and skills management through a centralized and accessible digital platform.",
      award: "Digital Excellence Award",
    },

    {
      img: "/images/certification3.jpg",
      title: "Data-Driven Workforce Development Dashboard",
      description:
        "Recognized for transforming employee skills and training data into clear insights that support better development decisions.",
      award: "Productivity Excellence Award",
    },

    {
      img: "/images/certification4.jpg",
      title: "Continuous Learning & Employee Growth Platform",
      description:
        "Recognized for encouraging continuous learning and empowering employees to track their progress and professional growth.",
      award: "People Development Award",
    },
  ];

  useEffect(() => {
    if (!headerRef.current || !certificationRef.current) return;

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
          start: "top 80%",
        },
      },
    );

    gsap.fromTo(
      certificationRef.current,
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
          trigger: certificationRef.current[0],
          start: "top 85%",
        },
      },
    );
  }, []);
  return (
    <>
      <div className="text-center mb-12">
        <p
          ref={(el) => (headerRef.current[0] = el)}
          className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3"
        >
          Certified Excellence
        </p>
        <h2
          ref={(el) => (headerRef.current[1] = el)}
          className="text-white text-2xl md:text-3xl font-bold mb-3"
        >
          Certifications
          <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent gradient-text">
            {" "}
            earned{" "}
          </span>
          by our section
        </h2>
        <p
          ref={(el) => (headerRef.current[2] = el)}
          className="text-xs font-semibold text-slate-400 tracking-widest mb-3"
        >
          Recognition built on quality, discipline, and continuous growth.
        </p>
      </div>
      {/* ============================================================== CERTIFICATION ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {certifications.map((cert, index) => (
          <div
            ref={(el) => (certificationRef.current[index] = el)}
            key={cert.title}
            className="cursor-default bg-white/1 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_45px_-15px_rgba(0,0,0,0.45)]
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-15px_rgba(52,200,226,0.25)]"
          >
            {/* BADGE AREA */}
            <div className="flex items-center justify-center p-8">
              <img
                src={cert.img}
                alt={cert.title}
                className="max-w-full max-h-full object-contain "
              />
            </div>

            {/* TEXT AREA */}
            <div className="flex flex-col h-full gap-1 px-6 py-7 border-t border-white/10 bg-white/5">
              <h3 className="text-sm font-extrabold text-white mb-2.5 tracking-wider">
                {cert.title}
                <span className="block text-[10px] text-slate-500 font-normal tracking-normal">
                  {cert.award}
                </span>
              </h3>

              <p className="text-[13px] leading-relaxed text-slate-500">
                {cert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
