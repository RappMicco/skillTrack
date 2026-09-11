import {
  MoveRight,
  Play,
  TrendingUp,
  GraduationCap,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPublicSkillSummary,
  fetchPublicTrainingSummary,
  fetchPublicLearningCourses,
} from "../features/skillMatrix/matrixThunk.js";
import { PageContext } from "../context/PageContext.js";
import { useNavigate } from "react-router";
import { ScrambleNumber } from "./ScrambleNumber.jsx";

export const HeroSection = () => {
  const { setWatchVideo } = useContext(PageContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicSummary } = useSelector((state) => state.skillMatrix);

  useEffect(() => {
    dispatch(fetchPublicSkillSummary());
    dispatch(fetchPublicTrainingSummary());
    dispatch(fetchPublicLearningCourses());
  }, [dispatch]);

  const swiperRef = useRef(null);
  // images
  const images = [
    {
      img: "/images/images1.jpg",
      description: "Collaborate, learn, and grow together",
    },
    {
      img: "/images/images2.jpg",
      description: "Modern tools for modern teams",
    },
    {
      img: "/images/images3.jpg",
      description: "Build skills that drive real results",
    },
    {
      img: "/images/images4.jpg",
      description: "Celebrate team achievement together",
    },
    {
      img: "/images/images5.jpg",
      description: "Track progress across your entire organization",
    },
  ];

  const skillTrackBenefits = [
    { id: 1, title: "Track Skill Growth", icon: TrendingUp },
    { id: 2, title: "Manage Training", icon: GraduationCap },
    { id: 3, title: "Gain Insights", icon: ChartColumn },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  const handleWatchVideo = () => {
    setWatchVideo(true);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* =========================================================== HERO SECTION - RIGHT ===================================================== */}
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-semibold mb-6
                     bg-indigo-500/12 border border-indigo-500/25 text-indigo-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Inspiring Growth, Building Excellence
          </div>
          <h1 className="text-4xl md:text-5xl xl:text-6xl text-white font-bold leading-tight mb-6 tracking-wide">
            Grow your team's
            <span className="block bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-text">
              skills & potential
            </span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-lg">
            SkillTrack empowers the OSS team to manage employee skills, assign
            training programs, monitor progress, and foster continuous growth
            through a single, unified platform. 🚀
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-7">
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-[10px] text-white font-semibold tracking-wider active:scale-95
                            transition-all duration-500 hover:opacity-80 hover:-translate-y-0.5 group bg-linear-to-br from-blue-500 to-violet-500 shadow-[0px_8px_28px_rgba(99,102,241,0.4)]"
            >
              <span className="relative z-10">Get Started</span>
              <div className="relative z-10 icon-left">
                <MoveRight size={13} />
              </div>
            </button>
            <button
              onClick={() => handleWatchVideo()}
              className="flex items-center gap-1.5 px-2 py-2.5 rounded-xl text-[9px] text-slate-300 hover:text-white hover:-translate-y-0.5
                              transition-all bg-white/5 border border-white/10 tracking-wider active:scale-95 duration-500"
            >
              <Play size={9} />
              Watch OSS in Action
            </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skillTrackBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-1 text-[8px] text-slate-400"
                >
                  <Icon size={9} className="text-green-600" />
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================== HERO SECTION - IMAGE CAROUSEL ========================================================*/}
        <div className="relative">
          <div className="w-full">
            <div className="relative w-full h-70 md:h-100 rounded-3xl overflow-hidden group">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Pagination, Autoplay, EffectCube]}
                effect="cube"
                cubeEffect={{
                  shadow: false,
                  slideShadows: false,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="h-full journey-swiper"
              >
                {images.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={item.img}
                      alt={`OSS Team ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,13,26,0.85)_0%,rgba(7,13,26,0.2)_50%,transparent_100%)]"></div>
                    <div className="absolute bottom-3 left-0 right-0 px-6 pb-6 transition-all duration-500 description-content">
                      <p className="text-white text-base text-[12px] tracking-wider font-semibold leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* ================================================ ARROW LEFT =================================== */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 z-20 rounded-full flex items-center justify-center 
                                    opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-110 bg-black/50 backdrop-blur-sm border border-white/15"
              >
                <ChevronLeft size={15} className="text-white" />
              </button>
              {/* ================================================ ARROW RIGHT =================================== */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 z-20 rounded-full flex items-center justify-center 
                                    opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-110 bg-black/50 backdrop-blur-sm border border-white/15"
              >
                <ChevronRight size={15} className="text-white" />
              </button>
            </div>
          </div>

          {/* ================================= Average ================================= */}
          <div
            className="absolute z-20 -bottom-6 -left-4 flex items-center gap-3 px-4 py-2 rounded-2xl
                        bg-slate-900/60 border border-white/15 backdrop-blur-md shadow-[0px_20px_40px_rgba(0,0,0,0.1)]"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/15">
              <TrendingUp size={15} className="text-green-500" />
            </div>

            <div>
              <p className="text-[10px] font-semibold text-white tracking-wide">
                <ScrambleNumber
                  value={
                    publicSummary?.totalEmployees
                      ? Math.round(
                          (publicSummary.expert /
                            publicSummary.totalEmployees) *
                            100,
                        )
                      : 0
                  }
                  suffix="% Expertise Rate"
                  digits={1}
                />
              </p>
              <p className="text-[7px] text-slate-500">Across the whole team</p>
            </div>
          </div>

          {/* ====================================== RATING ================================== */}
          <div
            className="absolute z-20 -top-3 -right-1 flex items-center gap-1.5 px-3 py-2 rounded-2xl
                        bg-slate-900/60 border border-white/15 backdrop-blur-md shadow-[0px_20px_40px_rgba(0,0,0,0.1)]"
          >
            <Award size={15} className="text-yellow-600" />
            <p className="text-[10px] font-semibold text-white tracking-wide">
              <ScrambleNumber
                value={publicSummary?.expert ?? 0}
                suffix=" Skill Experts"
                digits={1}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
