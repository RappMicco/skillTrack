import { Routes, Route } from "react-router";
import { useAuth } from "./hook/useAuth.js";

import { SkillTrackLayout } from "./layouts/SkillTrackLayout.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Insight } from "./pages/Insight.jsx";
import { SkillMatrix } from "./pages/SkillMatrix.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { AssignTraining } from "./pages/AssignTraining.jsx";
import { Maintenance } from "./pages/Maintenance.jsx";

export const App = () => {
  useAuth();
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* Main */}
      <Route path="/skill-track" element={<SkillTrackLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="skillMatrix" element={<SkillMatrix />} />
        <Route path="insight" element={<Insight />} />
        <Route path="assign-training" element={<AssignTraining />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>
    </Routes>
  );
};
