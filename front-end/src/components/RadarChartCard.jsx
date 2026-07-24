import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchTopFiveExpertSkills } from "../features/statusSummary/statusThunk.js";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-cyan-400/50 bg-[#020617] p-3 text-[10px] text-white shadow-[0_0_10px_rgba(34,211,238,0.25)]">
      <p className=" text-white font-semibold">{item.skillName}</p>
      <p className="text-cyan-400">
        Expertise Percentage: {item.expertisePercentage}%
      </p>

      <p className="text-cyan-400">
        Average Proficiency: {item.averageProficiency}
      </p>

      <p className="text-cyan-400">Employee Count: {item.employeeCount}</p>
    </div>
  );
};

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
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={topFiveSkill}
            margin={{
              top: 15,
              right: 15,
              left: 0,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="skillName"
              padding={{ left: 15, right: 15 }}
              tick={{
                fill: "#94A3B8",
                fontSize: 12,
              }}
              axisLine={{
                stroke: "#22D3EE",
                strokeWidth: 0.1,
              }}
              tickLine={{
                stroke: "#22D3EE",
                strokeWidth: 0.1,
              }}
              tickMargin={10}
            />

            <YAxis
              width={35}
              tick={{
                fill: "#94A3B8",
                fontSize: 11,
              }}
              axisLine={{
                stroke: "#22D3EE",
                strokeWidth: 0.1,
              }}
              tickLine={{
                stroke: "#22D3EE",
                strokeWidth: 0.1,
              }}
            />

            {/* <Tooltip
              cursor={{
                stroke: "#22D3EE",
                strokeOpacity: 0.1,
              }}
              formatter={(value, name) => {
                if (name === "Expertise Percentage") {
                  return [`${value}%`, name];
                }
                return [value, name];
              }}
              labelStyle={{ display: "none" }}
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid rgba(34, 211, 238, 0.5)",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 0 10px rgba(34, 211, 238, 0.25)",
                fontSize: "9px",
              }}
            /> */}

            <Tooltip
              cursor={{
                stroke: "#22D3EE",
                strokeOpacity: 0.1,
              }}
              content={<CustomTooltip />}
            />

            {/* Glow layer */}
            <Area
              type="monotone"
              stroke="#22D3EE"
              strokeWidth={8}
              strokeOpacity={0.08}
              fill="none"
            />

            {/* Main line */}
            <Area
              type="monotone"
              dataKey="expertisePercentage"
              name="Expertise Percentage"
              stroke="#22D3EE"
              strokeWidth={1}
              fill="url(#skillGradient)"
              activeDot={{
                r: 5,
                fill: "#22D3EE",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              dot={{
                r: 1,
                fill: "#06B6D4",
                stroke: "#67E8F9",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
