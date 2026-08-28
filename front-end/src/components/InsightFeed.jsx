import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { PageContext } from "../context/PageContext.js";
import {
  getIcon,
  bgIconColor,
  typeColor,
  borderColor,
} from "../utils/insightConfig.jsx";

const metricLabels = {
  expertisePercentage: "Expertise",
  averageProficiency: "Avg. Proficiency",
  employeeCount: "Employees",
  recommendedEmployees: "Recommended",
  currentEmployees: "Current",
};

const formatMetricValue = (key, value) =>
  key === "expertisePercentage" ? `${value}%` : value;

export const InsightFeed = () => {
  const { insights, loading, error } = useSelector((state) => state.insights);
  const { insightTypeFilter, setInsightTypeFilter } = useContext(PageContext);

  const typeTabs = useMemo(() => {
    const counts = insights.reduce(
      (acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      },
      { strength: 0, risk: 0, recommendation: 0 },
    );

    return [
      { label: "All", value: "All", count: insights.length },
      { label: "Strength", value: "strength", count: counts.strength },
      { label: "Risk", value: "risk", count: counts.risk },
      {
        label: "Recommendation",
        value: "recommendation",
        count: counts.recommendation,
      },
    ];
  }, [insights]);

  const filteredInsights = useMemo(
    () =>
      insightTypeFilter === "All"
        ? insights
        : insights.filter((item) => item.type === insightTypeFilter),
    [insights, insightTypeFilter],
  );

  return (
    <>
      {/* filter tabs */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1 p-1 overflow-x-auto rounded-xl bg-[#0F172A] border border-[#06B6D4]/13">
          {typeTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setInsightTypeFilter(tab.value)}
              className={`shrink-0 flex items-center gap-1.5 justify-center rounded-lg px-3 py-1.5 text-xs tracking-wider transition-colors duration-300
                        ${
                          insightTypeFilter === tab.value
                            ? "border border-[#06B6D4]/20 bg-[#06B6D4]/42 text-white"
                            : "cursor-pointer text-slate-500 shadow-md hover:bg-white/5 hover:text-slate-300"
                        }`}
            >
              {tab.label}
              <span className="opacity-60">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* feed */}
      <div className="rounded-2xl overflow-hidden bg-[#0F172A] border border-[#06B6D4]/13 p-3 space-y-3">
        {loading ? (
          <p className="text-center py-10 text-slate-500 font-semibold text-xs">
            Loading insights...
          </p>
        ) : error ? (
          <p className="text-center py-10 text-red-400 font-semibold text-xs">
            {error}
          </p>
        ) : filteredInsights.length === 0 ? (
          <p className="text-center py-10 text-slate-500 font-semibold text-xs">
            No insights found.
          </p>
        ) : (
          filteredInsights.map((item) => (
            <div
              key={item.id}
              className={`flex gap-4 p-4 rounded-2xl ${borderColor(item.type)}`}
            >
              {/* icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgIconColor(item.type)}`}
              >
                {getIcon(item.type)}
              </div>

              {/* content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[13px] font-bold text-white">
                    {item.title}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${typeColor(item.type)}`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300 mb-2.5">
                  {item.message}
                </p>
                <div className="flex gap-4 flex-wrap text-[10px] text-slate-500">
                  {Object.entries(item.metrics || {}).map(([key, value]) => (
                    <span key={key}>
                      {metricLabels[key] || key}
                      {`: `}
                      <b className="text-slate-300">
                        {formatMetricValue(key, value)}
                      </b>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
