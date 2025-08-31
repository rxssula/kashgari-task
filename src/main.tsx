import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MapProvider } from "react-map-gl/maplibre";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapProvider>
      <Toaster position="top-right" />
      <App />
    </MapProvider>
  </StrictMode>,
);
