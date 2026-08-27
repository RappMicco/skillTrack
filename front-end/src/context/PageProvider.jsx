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
  };
  return (
    <PageContext.Provider value={valueObj}>{children}</PageContext.Provider>
  );
};
