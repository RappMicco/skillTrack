import { useSelector } from "react-redux";
import { BookText, BookOpenText, Percent, Plus } from "lucide-react";

export const NumbersSection = () => {
  const { publicSummary, publicTrainingSummary, learningCourses } = useSelector(
    (state) => state.skillMatrix,
  );

  const total =
    (publicTrainingSummary.completed ?? 0) +
    (publicTrainingSummary.ongoing ?? 0) +
    (publicTrainingSummary.pending ?? 0) +
    (publicTrainingSummary.upcoming ?? 0);

  const completed = publicTrainingSummary?.completed ?? 0;

  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(0) : 0;

  const summarySection = [
    {
      id: 1,
      label: (publicSummary?.totalEmployees ?? 0) - 1,
      description: "Active Members",
      sign: <Plus className="mb-7 h-4 w-4 text-purple-400 gradient-text" />,
    },
    {
      id: 2,
      label: completionRate,
      description: "Training Completion Rate",
      sign:
        completionRate !== 0 ? (
          <Percent className="ml-1 mb-7 h-4 w-4 text-purple-400 animate-gradient" />
        ) : (
          ""
        ),
    },
    {
      id: 3,
      label: total ?? 0,
      description: "Learning Activities",
      sign: (
        <BookText className="ml-1 mb-7 h-4 w-4 text-purple-400 animate-gradient" />
      ),
    },
    {
      id: 4,
      label: learningCourses?.length ?? 0,
      description: "Training Programs",
      sign: (
        <BookOpenText className="ml-1 mb-7 h-4 w-4 text-purple-400 animate-gradient" />
      ),
    },
  ];

  return (
    <>
      {summarySection.map((item) => (
        <div key={item.id} className="text-center">
          <p className="flex  items-center justify-center text-5xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400  bg-clip-text text-transparent gradient-text">
            {item.label}
            <span>{item.sign}</span>
          </p>
          <p className="text-[11px] text-slate-500 tracking-wide">
            {item.description}
          </p>
        </div>
      ))}
    </>
  );
};
