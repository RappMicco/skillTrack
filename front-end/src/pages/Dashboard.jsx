import { OverviewCard } from "../components/OverviewCard.jsx";
import { StatusCard } from "../components/StatusCard.jsx";

export const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 bg-[linear-gradient(to_right,#001A31_30%,#2A2C8D_100%)] rounded-[20px] px-4 py-3">
        <h1 className="text-lg font-semibold text-[#E7EFF0]/51">
          Training Plan Overview Dashboard
        </h1>

        {/* status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* status container */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
            <StatusCard />
          </div>
        </div>
      </div>

      {/* overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OverviewCard />
      </div>
    </>
  );
};
