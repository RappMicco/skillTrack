export const LegendCard = () => {
  const levelLegend = [
    {
      id: 0,
      level: "0",
      description: "No knowledge",
      color: "bg-slate-500/15 border border-slate-500/30 text-slate-400",
    },
    {
      id: 1,
      level: "1",
      description: "Awareness",
      color: "bg-rose-500/15 border border-red-500/30 text-red-300",
    },
    {
      id: 2,
      level: "2",
      description: "Basic",
      color: "bg-yellow-500/15 border border-amber-500/30 text-amber-300",
    },
    {
      id: 3,
      level: "3",
      description: "Intermediate",
      color: "bg-blue-500/15 border border-blue-500/30 text-blue-300",
    },
    {
      id: 4,
      level: "4",
      description: "Advanced",
      color: "bg-purple-500/15 border border-purple-500/30 text-purple-300",
    },
    {
      id: 5,
      level: "5",
      description: "Expert",
      color: "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300",
    },
  ];
  return (
    <>
      {levelLegend.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px]
                        font-bold ${item.color}`}
          >
            {item.level}
          </div>
          <span className="text-xs text-slate-400 tracking-wider">
            {item.description}
          </span>
        </div>
      ))}
    </>
  );
};
