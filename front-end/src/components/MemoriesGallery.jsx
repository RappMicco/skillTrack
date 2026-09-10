export const MemoriesGallery = () => {
  const memories = [
    {
      img: "/images/memories1.jpg",
      description: "Collaborate, learn, and grow together",
    },
    {
      img: "/images/memories2.jpg",
      description: "Modern tools for modern teams",
    },
    {
      img: "/images/memories3.jpg",
      description: "Build skills that drive real results",
    },
    {
      img: "/images/memories4.jpg",
      description: "Celebrate team achievement together",
    },
    {
      img: "/images/memories5.jpg",
      description: "Track progress across your entire organization",
    },
    {
      img: "/images/memories1.jpg",
      description: "Track progress across your entire organization",
    },
  ];
  return (
    <>
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
          Real People, Real Growth
        </p>

        <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-3">
          Teams that
          <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent gradient-text">
            {" "}
            learn together
          </span>
          , grow together
        </h2>

        <p className="text-xs font-semibold text-slate-400 tracking-widest mb-3">
          Moments of learning, teamwork, and growth worth remembering.
        </p>
      </div>

      {/* ================================================== IMAGES ======================================== */}
      <div className="marquee-track overflow-hidden">
        <div className="flex gap-3 w-max animate-marquee">
          {[...memories, ...memories].map((item, index) => (
            <div
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
