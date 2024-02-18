//primary render component
import { createRoot } from "react-dom";
import App from "./App";
import React from "react";
import { AppStateProvider } from "./AppStateContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <AppStateProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppStateProvider>
);

//your code should still work if you remove <React.StrictMode>.
// Strict Mode is a development-only feature in React,
//and its purpose is to help you catch potential issues during development.
//It doesn't affect the behavior of your application in the production environment.
