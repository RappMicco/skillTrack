import gsap from "gsap";
import { useRef, useEffect } from "react";

export const MemoriesGallery = () => {
  const headerRef = useRef([]);
  const memoriesRef = useRef([]);
  const memories = [
    {
      img: "/images/memories1.jpg",
      description: "Turning ideas into impact through teamwork",
    },
    {
      img: "/images/memories2.jpg",
      description: "Every milestone starts with a shared vision",
    },
    {
      img: "/images/memories3.jpg",
      description: "Creating connections that inspire success",
    },
    {
      img: "/images/memories4.jpg",
      description: "Learning from challenges and growing stronge",
    },
    {
      img: "/images/memories5.jpg",
      description: "Empowering people to achieve more together",
    },
    {
      img: "/images/memories6.jpg",
      description: "Making memories with amazing people",
    },
  ];

  useEffect(() => {
    if (!headerRef.current || !memoriesRef.current) return;

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
      memoriesRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotation: -3,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: memoriesRef.current[0],
          start: "top 80%",
        },
      },
    );
  }, []);
  return (
    <>
      <div className="text-center mb-10">
        <p
          ref={(el) => (headerRef.current[0] = el)}
          className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3"
        >
          Real People, Real Growth
        </p>

        <h2
          ref={(el) => (headerRef.current[1] = el)}
          className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-3"
        >
          Teams that
          <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent gradient-text">
            {" "}
            learn together
          </span>
          , grow together
        </h2>

        <p
          ref={(el) => (headerRef.current[2] = el)}
          className="text-xs font-semibold text-slate-400 tracking-widest mb-3"
        >
          Moments of learning, teamwork, and growth worth remembering.
        </p>
      </div>

      {/* ================================================== IMAGES ======================================== */}
      <div className="marquee-track overflow-hidden">
        <div className="flex gap-3 w-max animate-marquee">
          {[...memories, ...memories].map((item, index) => (
            <div
              ref={(el) => (memoriesRef.current[index] = el)}
              key={item.img + "-" + index}
              className="relative w-40 sm:w-48 md:w-56 aspect-square shrink-0 rounded-2xl overflow-hidden group cursor-default"
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3
                     bg-linear-to-t from-[rgba(7,13,26,0.85)] to-transparent"
              >
                <p className="text-white text-[10px] font-semibold leading-tight">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
