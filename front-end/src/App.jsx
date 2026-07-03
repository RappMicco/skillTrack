import { Routes, Route } from "react-router";
import { AppContext } from "./context/AppContext.js";
import { useState } from "react";
import { SkillTrackLayout } from "./layouts/SkillTrackLayout.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Insight } from "./pages/Insight.jsx";
import { SkillMatrix } from "./pages/SkillMatrix.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";

export const App = () => {
  const [loading, setLoading] = useState(false);

  const valueObj = {
    loading,
    setLoading,
  };
  return (
    <AppContext.Provider value={valueObj}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Main */}
        <Route path="/dashboard" element={<SkillTrackLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="insight" element={<Insight />} />
          <Route path="skillMatrix" element={<SkillMatrix />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
};
