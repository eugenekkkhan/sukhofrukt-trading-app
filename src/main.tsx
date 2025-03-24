import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import ThemeProvider from "./context/ThemeContext/ThemeProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar.tsx";
import Settings from "./Settings.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
