import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BufoProvider } from "./BufoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BufoProvider>
      <App />
    </BufoProvider>
  </React.StrictMode>
);
