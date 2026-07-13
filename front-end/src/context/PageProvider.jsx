import { PageContext } from "./PageContext";
import { useState } from "react";

export const PageProvider = ({ children }) => {
  const [activeDesc, setActiveDesc] = useState(null);

  const valueObj = {
    activeDesc,
    setActiveDesc,
  };
  return (
    <PageContext.Provider value={valueObj}>{children}</PageContext.Provider>
  );
};
