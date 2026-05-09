import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./homePage/homePage";
import { EmployabilityForm } from "./inputsPage/inputsPage";
// import {AiResult} from "./aiResultPage/aiResult";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inputs" element={<EmployabilityForm />} />
      {/* <Route path="/ai" element={<AiResult />} /> */}
    </Routes>
  );
}

export default App;

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const container = document.getElementById("app-scroll-container");

    if (container) {
      container.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // or "smooth"
      });
    }
  }, [pathname]);

  return null;
}
