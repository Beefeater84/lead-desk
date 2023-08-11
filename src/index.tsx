import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./app/styles/reset.scss";
import "./app/styles/globals.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
