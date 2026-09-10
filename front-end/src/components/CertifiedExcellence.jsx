export const CertifiedExcellence = () => {
  const certifications = [
    {
      img: "/images/certification1.jpg",
      title: "Best Support",
      description:
        "Awarded for consistently meeting international quality management standards across our training and development processes.",
      recipient: "Rapp Micco Rizo",
    },
    {
      img: "/images/certification1.jpg",
      title: "Best Support",
      description:
        "Awarded for consistently meeting international quality management standards across our training and development processes.",
      recipient: "Rapp Micco Rizo",
    },
    {
      img: "/images/certification1.jpg",
      title: "Best Support",
      description:
        "Awarded for consistently meeting international quality management standards across our training and development processes.",
      recipient: "Rapp Micco Rizo",
    },
    {
      img: "/images/certification1.jpg",
      title: "Best Support",
      description:
        "Awarded for consistently meeting international quality management standards across our training and development processes.",
      recipient: "Rapp Micco Rizo",
    },
  ];
  return (
    <>
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
          Certified Excellence
        </p>
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">
          Certifications
          <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent gradient-text">
            {" "}
            earned{" "}
          </span>
          by our section
        </h2>
        <p className="text-xs font-semibold text-slate-400 tracking-widest mb-3">
          Recognition built on quality, discipline, and continuous growth.
        </p>
      </div>
      {/* ============================================================== CERTIFICATION ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {certifications.map((cert) => (
          <div
            key={cert.title}
            className="cursor-default bg-white/1 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_45px_-15px_rgba(0,0,0,0.45)]
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-15px_rgba(52,200,226,0.25)]"
          >
            {/* BADGE AREA */}
            <div
              className="h-[47.5] flex items-center justify-center p-8"
              style={{ background: cert.badgeBg }}
            >
              <img
                src={cert.img}
                alt={cert.title}
                className="max-w-full max-h-full object-contain "
              />
            </div>

            {/* TEXT AREA */}
            <div className="flex flex-col  gap-1 px-6 py-7 border-t border-white/10 bg-white/5">
              <h3 className="text-lg font-extrabold text-white mb-2.5 tracking-wider">
                {cert.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500">
                {cert.description}
              </p>

              <span className="block text-[10px] text-slate-500">
                {`Presented to: ${cert.recipient}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
