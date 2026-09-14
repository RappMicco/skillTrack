import { PageContext } from "./PageContext";
import { useState } from "react";

export const PageProvider = ({ children }) => {
  const [activeDesc, setActiveDesc] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("UPCOMING");
  const [isOpen, setIsOpen] = useState(false);
  const [viewLegend, setViewLegend] = useState(false);
  const [skillMatrixSearch, setSkillMatrixSearch] = useState("");
  const [skillMatrixGroupFilter, setSkillMatrixGroupFilter] = useState("All");
  const [skillMatrixCompetencyFilter, setSkillMatrixCompetencyFilter] =
    useState("All");
  const [insightTypeFilter, setInsightTypeFilter] = useState("All");
  const [maintenanceToggle, setMaintenanceToggle] =
    useState("Register Employee");
  const [watchVideo, setWatchVideo] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const valueObj = {
    activeDesc,
    setActiveDesc,
    selectedStatus,
    setSelectedStatus,
    isOpen,
    setIsOpen,
    viewLegend,
    setViewLegend,
    skillMatrixSearch,
    setSkillMatrixSearch,
    skillMatrixGroupFilter,
    setSkillMatrixGroupFilter,
    skillMatrixCompetencyFilter,
    setSkillMatrixCompetencyFilter,
    insightTypeFilter,
    setInsightTypeFilter,
    maintenanceToggle,
    setMaintenanceToggle,
    watchVideo,
    setWatchVideo,
    openMenu,
    setOpenMenu,
  };
  return (
    <PageContext.Provider value={valueObj}>{children}</PageContext.Provider>
  );
};
