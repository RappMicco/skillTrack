export const statusBgBorderColor = (type) => {
  switch (type) {
    case "UPCOMING":
      return "bg-blue-500/20 text-blue-300 border border-blue-500/30";

    case "PENDING":
      return "bg-orange-200/15 text-amber-300 border border-amber-500/30";

    case "ONGOING":
      return "bg-purple-500/20 text-purple-300 border border-purple-500/30";

    case "COMPLETED":
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    default:
      return null;
  }
};

export const initialIconBg = (type) => {
  switch (type) {
    case "UPCOMING":
      return "border border-cyan-500/20 from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20";

    case "PENDING":
      return "border border-amber-500/20 from-amber-500 to-orange-300 shadow-lg shadow-amber-500/20";

    case "ONGOING":
      return "border border-purple-500/20 from-blue-500 to-violet-500 shadow-lg shadow-purple-500/20";

    case "COMPLETED":
      return "border border-emerald-50/20 from-emerald-500 to-green-400 shadow-lg shadow-emerald-500/20";
    default:
      return null;
  }
};

export const viewIconColor = (type) => {
  switch (type) {
    case "UPCOMING":
      return "text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-400/50 hover:bg-blue-500/20";

    case "PENDING":
      return "text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/50 hover:bg-amber-500/20";

    case "ONGOING":
      return "text-violet-400 hover:text-purple-300 border border-violet-500/30 hover:border-violet-400/50 hover:bg-violet-500/20";

    case "COMPLETED":
      return "text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/50 hover:bg-emerald-500/20";
    default:
      return null;
  }
};

export const modalTopBorderColor = (type) => {
  switch (type) {
    case "UPCOMING":
      return "from-blue-500 to-cyan-400/20";

    case "PENDING":
      return "from-amber-500 to-orange-300/20";

    case "ONGOING":
      return "from-blue-500 to-violet-500/20";

    case "COMPLETED":
      return "from-emerald-500 to-green-400/20";
    default:
      return null;
  }
};
