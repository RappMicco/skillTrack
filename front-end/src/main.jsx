import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { App } from "./App.jsx";
import { store } from "./store/store.js";
import { PageProvider } from "./context/PageProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PageProvider>
          <App />
        </PageProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
