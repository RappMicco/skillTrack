import { X } from "lucide-react";
import { PageContext } from "../context/PageContext";
import { useContext } from "react";
import {
  initialIconBg,
  modalTopBorderColor,
  statusBgBorderColor,
} from "../utils/StatusTableConfig.jsx";

export const ViewModal = ({ training }) => {
  const { isOpen, setIsOpen, selectedStatus } = useContext(PageContext);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen ? (
        <div className="min-h-screen flex">
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div
              className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-[linear-gradient(160deg,#0d1b30_0%,#0a1220_100%)]
                        border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,.6),0_8px_40px_rgba(59,130,246,.13)]"
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
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
