import { PageContext } from "./PageContext";
import { useState } from "react";

export const PageProvider = ({ children }) => {
  const [activeDesc, setActiveDesc] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("UPCOMING");
  const [isOpen, setIsOpen] = useState(false);

  const valueObj = {
    activeDesc,
    setActiveDesc,
    selectedStatus,
    setSelectedStatus,
    isOpen,
    setIsOpen,
  };
  return (
    <PageContext.Provider value={valueObj}>{children}</PageContext.Provider>
  );
};
