import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchTopFiveExpertSkills } from "../features/statusSummary/statusThunk.js";

export const RadarChartCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { topFiveSkill } = useSelector((state) => state.training);

  useEffect(() => {
    const getTopSkills = async () => {
      try {
        await dispatch(fetchTopFiveExpertSkills());
      } catch (error) {
        alert(error);
        console.error(error);
        navigate("/");
      }
    };

    getTopSkills();
  }, [dispatch, navigate]);
  return (
    <>
      <div className="flex-1">
        {/* rechart container */}
        <div className="w-full h-full min-w-0">
          {/* rechard wrapper */}
          <div className="relative cursor-default w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={topFiveSkill} outerRadius="72%">
                <defs>
                  <linearGradient
                    id="neonRadarFill"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.65} />
                    <stop
                      offset="100%"
                      stopColor="#0099FF"
                      stopOpacity={0.15}
                    />
                  </linearGradient>

                  <linearGradient
                    id="neonRadarStroke"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>

                  <filter id="neonGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <PolarGrid stroke="#1E3A5F" />

                <PolarAngleAxis
                  dataKey="skillName"
                  tick={{
                    fill: "#93C5FD",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                />

                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020817",
                    border: "1px solid #22D3EE",
                    borderRadius: "12px",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(34,211,238,.35)",
                  }}
                />

                {/* Glow layer */}
                <Radar
                  dataKey="expertisePercentage"
                  stroke="#22D3EE"
                  fill="none"
                  strokeWidth={6}
                  strokeOpacity={0.15}
                  filter="url(#neonGlow)"
                />

                {/* Main layer */}
                <Radar
                  name="Expertise"
                  dataKey="expertisePercentage"
                  stroke="url(#neonRadarStroke)"
                  fill="url(#neonRadarFill)"
                  fillOpacity={0.5}
                  strokeWidth={2.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};
