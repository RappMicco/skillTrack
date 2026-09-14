import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useContext, useState, useRef } from "react";
import { PageContext } from "../context/PageContext";

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const WatchVideo = () => {
  const { setWatchVideo } = useContext(PageContext);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const screenRef = useRef(null);

  const [play, setPlay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetaData = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const bar = progressBarRef.current;
    const rect = bar.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = clickRatio * duration;
  };

  const handleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleFullScreen = () => {
    const el = screenRef.current;
    if (!el) return;

    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  };

  const handleClose = () => {
    setWatchVideo(false);
    videoRef.current?.pause();
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  return (
    <>
      {/* ================================================ HEADER =========================================== */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-white/3 border-b border-white/7">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-linear-to-br from-[#34C8E2] to-[#68C4D4]/20">
            ST
          </div>
          <div>
            <span className="text-[13px] font-bold bg-linear-to-r from-[#34C8E2] to-[#68C4D4] bg-clip-text text-transparent">
              SkillTrack
            </span>
            <p className="text-[9px] text-slate-500">Sample Video</p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-white
                        hover:bg-white/20 transition-all duration-500 active:scale-95"
        >
          <X size={16} />
        </button>
      </div>

      {/* ================================================ SCREEN ================================================ */}
      <div
        ref={screenRef}
        onClick={handlePlay}
        className="relative bg-black cursor-pointer aspect-video group transition-all duration-400"
      >
        <video
          ref={videoRef}
          src="/videos/samplevideo1.mp4"
          className="h-full w-full"
          onPlay={() => setPlay(true)}
          onPause={() => setPlay(false)}
          onEnded={() => setPlay(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetaData}
        ></video>

        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/35 transition-opacity duration-300
                    ${play ? "opacity-0 group-hover:opacity-100" : "opacity-100"} `}
        >
          <div
            className="w-16 h-16 rounded-full text-white flex items-center justify-center bg-indigo-500/90 shadow-[0_0_0_8px_rgba(99,102,241,0.2)] 
                        group-hover:bg-indigo-500/70 group-hover:text-white/50 duration-500 group-active:scale-95"
          >
            {play ? <Pause size={24} /> : <Play size={24} />}
          </div>
        </div>

        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px]
        bg-black/60 backdrop-blur-sm text-indigo-300 border border-indigo-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Sample_Video.mp4
        </div>
      </div>

      {/* =================================================== PLAY AND PAUSE BUTTON ============================ */}
      <div className="px-5 py-4 space-y-3 bg-[#070D1A]/95">
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="h-1.5 rounded-full cursor-pointer relative group bg-white/8"
        >
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full rounded-full transition-all w-0 bg-linear-to-r from-blue-500 to-violet-500"
          ></div>
          <div
            style={{ left: `calc(${progressPercent}% - 6px)` }}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity left-[calc(0%-6px)] bg-indigo-400 shadow-[0_0_0_3px_rgba(129,140,248,0.3)]"
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlay}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 text-indigo-300"
            >
              {play ? <Pause size={13} /> : <Play size={13} />}
            </button>

            <button
              onClick={handleMute}
              className="w-9 h-9 rounded-xl text-slate-200 flex items-center justify-center transition-all hover:bg-white/10"
            >
              {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <span className="text-[10px] text-slate-500 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleFullScreen}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 text-slate-500 "
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
