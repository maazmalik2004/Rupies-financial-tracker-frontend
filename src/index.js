import { createRoot } from "react-dom";
import App from "./App";
import React from "react";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
