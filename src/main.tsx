import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { ScrollToTop } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <div id="app-scroll-container" className="h-screen overflow-y-auto">
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
);
