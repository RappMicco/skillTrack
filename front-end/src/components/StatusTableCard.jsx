import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { statusCategory, statusHeader } from "../hook/statusCategory.js";
import {
  statusBgBorderColor,
  initialIconBg,
  viewIconColor,
} from "../utils/StatusTableConfig.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUpcomingData,
  fetchPendingData,
  fetchOngoingData,
} from "../features/statusTable/statusTableThunk.js";

export const StatusTableCard = () => {
  const { upcomingData, pendingData, ongoingData } = useSelector(
    (state) => state.statusData,
  );
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("UPCOMING");
  // change date format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  const handleClickStatus = (item) => {
    setSelectedStatus(item);
  };

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        switch (selectedStatus) {
          case "UPCOMING":
            await dispatch(fetchUpcomingData()).unwrap();
            break;

          case "PENDING":
            await dispatch(fetchPendingData()).unwrap();
            break;

          case "ONGOING":
            await dispatch(fetchOngoingData());
            break;

          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatusData();
  }, [selectedStatus, dispatch]);

  // rendered data of selected status
  const dataByStatus = {
    UPCOMING: upcomingData,
    PENDING: pendingData,
    ONGOING: ongoingData,
    // COMPLETED: completedData,
  };

  const displayedData = dataByStatus[selectedStatus] || [];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-[#06B6D4]/5">
        {/* =================================================================================================== status button ============================================================================================ */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
          {statusCategory.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => {
                  handleClickStatus(item.title);
                }}
                className={`flex items-center justify-center px-3 py-1.5 rounded-lg text-[9px] font-semibold tracking-widest transition-colors duration-300  
                          ${selectedStatus === item.title ? "bg-[#06B6D4]/42 text-white border border-[#06B6D4]/20" : "text-slate-500 shadow-md hover:text-slate-300 hover:bg-white/5 cursor-pointer"} }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* =================================================================================================== SEARCH ================================================================================================== */}
        <div className="relative bg-[#EFE9E9]/5 border border-white/5 rounded-xl">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={15}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 text-[10px] font-semibold tracking-wider text-slate-300 placeholder-slate-600 rounded-xl outline-none focus:ring-1 focus:ring-blue-500/50 transition-all w-48"
          />
        </div>
      </div>
      {/* status data table */}
      <div className="overflow-x-auto">
        {/* table */}
        <table className="w-full text-sm">
          {/* column header */}
          <thead>
            {/* ============================================================================== HEADER ROW ========================================================================================== */}
            <tr className="border-b border-white/5">
              {statusHeader.map((item) => {
                return (
                  <th
                    key={item.id}
                    className="px-5 py-3.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-widest"
                  >
                    {item.title}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* ================================================================================= TABLE DETAILS =========================================================================================*/}
          <tbody>
            {displayedData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-white/4 hover:bg:white/3 transition-colors group"
                >
                  <td className="px-5 py-4">
                    {/* initials and fullname container*/}
                    <div className="flex items-center gap-2.5">
                      {/* initials */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0 bg-linear-to-br ${initialIconBg(selectedStatus)}`}
                      >
                        R
                      </div>

                      {/* full name */}
                      <span className="text-slate-300 font-medium text-xs whitespace-nowrap">
                        {item?.fullName}
                      </span>
                    </div>
                  </td>
                  {/* traininig name */}
                  <td className="px-5 py-4 text-slate-400 text-xs">
                    {item?.trainingName}
                  </td>
                  {/*Institution */}
                  <td className="px-5 py-4 text-slate-400 text-xs">
                    {item?.trainingProvider}
                  </td>
                  {/* Schedule */}
                  <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">
                    {formatDate(item?.startDate)} ~ {formatDate(item?.endDate)}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${statusBgBorderColor(selectedStatus)}`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {/* view */}
                      <button
                        className={`text-[10px] font-semibold cursor-pointer ${viewIconColor(selectedStatus)}
                                    px-4 py-1 rounded-lg transition-all duration-300 active:scale-95`}
                      >
                        View
                      </button>
                      {/* edit */}
                      <button
                        className="text-[10px] font-semibold text-slate-500 hover:text-slate-300 border border-white/10 hover:border-white/20 px-4 py-1 rounded-lg transition-all
                                    duration-300 active:scale-95 cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
