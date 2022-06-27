import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "@arcgis/core/assets/esri/themes/light/main.css";

// Create a root element for the application
const root = createRoot(document.getElementById("root")!);

// Render the application
root.render(<App />);
