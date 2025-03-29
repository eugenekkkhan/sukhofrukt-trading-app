import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeProvider from "./context/ThemeContext/ThemeProvider.tsx";
import { BrowserRouter } from "react-router";
import RouteComponent from "./components/RouteComponent.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <RouteComponent />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
