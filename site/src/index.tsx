import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import { BufoProvider } from "./BufoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <BufoProvider>
          <App />
        </BufoProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
