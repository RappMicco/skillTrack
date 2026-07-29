import { TriangleAlert, Lightbulb, Dumbbell } from "lucide-react";
import { useSelector } from "react-redux";

export const InsightCard = () => {
  const { insights } = useSelector((state) => state.insights);
  return (
    <>
      <div className="flex items-center gap-3 border border-red-600 h-56"></div>
    </>
  );
};
