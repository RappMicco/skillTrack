import { X, Building2, CalendarDays, Users, Boxes } from "lucide-react";
import { PageContext } from "../context/PageContext";
import { useContext } from "react";
import {
  initialIconBg,
  modalTopBorderColor,
  statusBgBorderColor,
  modalBgColor,
  percentageFontColor,
  progressBarColor,
} from "../utils/StatusTableConfig.jsx";

export const ViewModal = ({ training }) => {
  const { isOpen, setIsOpen, selectedStatus } = useContext(PageContext);

  const handleClose = () => {
    setIsOpen(false);
  };
  // change date format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  const cardDetails = [
    {
      id: 1,
      title: "INSTITUTION",
      icon: <Building2 size={17} />,
      description:
        training?.trainingProvider?.charAt(0).toUpperCase() +
        training?.trainingProvider?.slice(1),
    },
    {
      id: 2,
      title: "SCHEDULE",
      icon: <CalendarDays size={17} />,
      description: `${formatDate(training?.startDate)} ~
                      ${formatDate(training?.endDate)}`,
    },
    {
      id: 3,
      title: "GROUP",
      icon: <Users size={16} />,
      description: `${
        training?.group === "smart_local"
          ? "Smart Local"
          : training?.group === "smart_outsource"
            ? "Smart Outsource"
            : training?.group === "development"
              ? "Development"
              : "Network"
      }`,
    },
    {
      id: 4,
      title: "EMPLOYEE LEVEL",
      icon: <Boxes size={17} />,
      description: training?.empLevel,
    },
  ];
  return (
    <>
      {isOpen ? (
        <div className="min-h-screen flex">
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div
              className={`relative w-full max-w-lg rounded-3xl overflow-hidden bg-[linear-gradient(160deg,#0d1b30_0%,#0a1220_100%)]
                        border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,.6),0_8px_40px_rgba(59,130,246,.13)] ${modalBgColor(selectedStatus)}`}
            >
              <div
                className={`h-1 w-full bg-linear-to-br ${modalTopBorderColor(selectedStatus)}`}
              ></div>
              {/* name and training name*/}
              <div className="flex items-start justify-between px-6 pt-5 pb-4">
                <div className="flex items-center gap-3">
                  {/* initial */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-md font-bold text-white shrink-0 bg-linear-to-br ${initialIconBg(selectedStatus)}`}
                  >
                    {training?.fullName?.charAt(0).toUpperCase()}
                  </div>

                  {/* training name */}
                  <div>
                    <h2 className="text-base font-bold text-white leading-tight">
                      {training?.trainingName}
                    </h2>

                    {/* full name */}
                    <p className="text-xs text-slate-400 mt-0.5">
                      {training?.fullName}
                    </p>
                  </div>
                </div>

                {/* close button */}
                <div
                  onClick={() => handleClose()}
                  className="p-1.5 rounded-xl text-slate-500 duration-300 hover:text-white hover:bg-white/10 active:scale-85 transition-all"
                >
                  <X size={16} />
                </div>
              </div>

              {/* status */}
              <div className="px-6 pb-4">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-[8px] font-bold uppercase
                                tracking-widest ${statusBgBorderColor(selectedStatus)}`}
                >
                  {training?.status}
                </span>
              </div>

              {/* description and other details */}
              <div className="px-6 pb-6 space-y-5">
                {/* training description */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  {training?.trainingDescription}
                </p>
                {/* institution , schedule,  group, level */}
                <div className="grid grid-cols-2 gap-3">
                  {cardDetails.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/4 border border-white/6"
                      >
                        {/* icon */}
                        <div className="text-slate-500">{item?.icon}</div>

                        {/* title details  */}
                        <div>
                          <p className="text-[10px] text-slate-500 tracking-wider font-semibold">
                            {item?.title}
                          </p>

                          <p className="text-xs text-slate-300 font-medium mt-0.5">
                            {item?.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress name & bar */}
                <div>
                  {/* Progress name */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold tracking-wider text-slate-400">
                      Overall Progress
                    </span>

                    {/* Percentage */}
                    <span
                      className={`text-xs text-[10px] ${percentageFontColor(selectedStatus)}`}
                    >
                      {`${training?.progress ?? 0}%`}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`relative h-full overflow-hidden rounded-full bg-linear-to-r ${
                        (training?.progress ?? 0) > 0
                          ? progressBarColor(selectedStatus)
                          : "from-slate-700 to-slate-700"
                      }`}
                      style={{ width: `${training?.progress ?? 0}%` }}
                    >
                      <div className="shimmer-diagonal absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>
                </div>
                {/* Remarks */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 tracking-wider mb-2">
                    Remarks
                  </p>

                  {/* remarks details */}
                  <div className="flex p-2 min-h-20 rounded-xl bg-white/4 border border-white/6">
                    <p className="text-slate-300 text-[12px]">
                      {training?.remarks}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
