import { TriangleAlert, Lightbulb, Dumbbell } from "lucide-react";

// get icon
export const getIcon = (type) => {
  switch (type) {
    case "strength":
      return <Dumbbell className="text-white mx-auto" size={18} />;

    case "risk":
      return <TriangleAlert className="text-white mx-auto" size={18} />;

    case "recommendation":
      return <Lightbulb className="text-white mx-auto" size={18} />;

    default:
      return null;
  }
};

// get bg-color of icon
export const bgIconColor = (type) => {
  switch (type) {
    case "strength":
      return "bg-linear-to-br from-emerald-500 to-green-400 shadow-lg shadow-emerald-500/20";

    case "risk":
      return "bg-linear-to-br from-amber-500 to-orange-400 shadow-lg shadow-amber-500/20";

    case "recommendation":
      return "bg-linear-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20";
    default:
      return null;
  }
};

//type color for strength, risk and recommendation
export const typeColor = (type) => {
  switch (type) {
    case "strength":
      return "bg-[#C2FFC7] text-green-800";

    case "risk":
      return "bg-[#F3FEB8] text-amber-800";

    case "recommendation":
      return "bg-[#C3F8FF] text-blue-800";

    default:
      return null;
  }
};

// border color for insight
export const borderColor = (type) => {
  switch (type) {
    case "strength":
      return "border border-emerald-600/20 shadow-emerald-500/20";

    case "risk":
      return "border border-orange-600/20 shadow-amber-500/20";

    case "recommendation":
      return "border border-cyan-600/20 shadow-blue-500/20";
    default:
      return null;
  }
};
