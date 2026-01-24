import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { BufoProvider } from "./BufoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BufoProvider>
        <App />
      </BufoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
