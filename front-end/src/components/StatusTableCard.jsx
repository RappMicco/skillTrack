import { useEffect, useContext, useState } from "react";
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
  fetchCompletedData,
} from "../features/statusTable/statusTableThunk.js";
import { ViewModal } from "./ViewModal.jsx";
import { PageContext } from "../context/PageContext.js";

export const StatusTableCard = () => {
  const { upcomingData, pendingData, ongoingData, completedData } = useSelector(
    (state) => state.statusData,
  );

  const dispatch = useDispatch();
  const { selectedStatus, setSelectedStatus, isOpen, setIsOpen } =
    useContext(PageContext);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [search, setSearch] = useState("");
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
            await dispatch(fetchOngoingData()).unwrap();
            break;

          case "COMPLETED":
            await dispatch(fetchCompletedData()).unwrap();
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
    COMPLETED: completedData,
  };

  const displayedData = dataByStatus[selectedStatus] || [];
  // view screen
  const handleClickView = (item) => {
    setSelectedTraining(item);
    setIsOpen(true);
  };

  // search filter
  const filteredData = displayedData.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item?.fullName?.toLowerCase?.().includes(searchValue) ||
      item?.trainingName?.toLowerCase?.().includes(searchValue) ||
      item?.trainingProvider?.toLowerCase?.().includes(searchValue) ||
      item?.status?.toLowerCase?.().includes(searchValue)
    );
  });

  return (
    <>
      {/* ======================================================================================================== Open Modal ===================================================================== */}
      {isOpen && <ViewModal training={selectedTraining} />}

      <div className="flex flex-col gap-3 border-b border-[#06B6D4]/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 overflow-x-auto rounded-lg bg-white/5 p-1 sm:w-auto">
          {statusCategory.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClickStatus(item.title)}
              className={`shrink-0 flex items-center justify-center rounded-lg px-3 py-1.5 text-[9px] font-semibold tracking-widest transition-colors duration-300
          ${
            selectedStatus === item.title
              ? "border border-[#06B6D4]/20 bg-[#06B6D4]/42 text-white"
              : "cursor-pointer text-slate-500 shadow-md hover:bg-white/5 hover:text-slate-300"
          }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="relative w-full rounded-xl border border-white/5 bg-[#EFE9E9]/5 sm:w-auto">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={15}
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl py-2 pl-8 pr-4 text-xs font-semibold tracking-wider text-slate-300 outline-none placeholder:text-slate-600 focus:ring-1 focus:ring-blue-500/50 sm:w-48"
          />
        </div>
      </div>
      {/* status data table */}
      <div className="overflow-x-auto custom-scrollbar border ">
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
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-slate-500 font-semibold"
                >
                  {`No ${selectedStatus.toLowerCase()} training records found.`}
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      {/* initials and fullname container*/}
                      <div className="flex items-center gap-2.5">
                        {/* initials */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0 bg-linear-to-br ${initialIconBg(selectedStatus)}`}
                        >
                          {item?.fullName?.charAt(0).toUpperCase()}
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
                      {item?.trainingProvider?.charAt(0).toUpperCase() +
                        item?.trainingProvider?.slice(1)}
                    </td>
                    {/* Schedule */}
                    <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">
                      {formatDate(item?.startDate)} ~{" "}
                      {formatDate(item?.endDate)}
                    </td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${statusBgBorderColor(selectedStatus)}`}
                      >
                        {item?.status}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center">
                        {/* view */}
                        <button
                          onClick={() => {
                            handleClickView(item);
                          }}
                          className={`text-[10px] font-semibold cursor-pointer ${viewIconColor(selectedStatus)}
                                    px-4 py-1 rounded-lg transition-all duration-300 active:scale-95`}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
