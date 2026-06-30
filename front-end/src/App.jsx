import { Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { SkillTrackLayout } from "./layouts/SkillTrackLayout.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Insight } from "./pages/Insight.jsx";
import { SkillMatrix } from "./pages/SkillMatrix.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Main */}
        <Route path="/dashboard" element={<SkillTrackLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="insight" element={<Insight />} />
          <Route path="skillMatrix" element={<SkillMatrix />} />
        </Route>
      </Routes>
    </Provider>
  );
};
