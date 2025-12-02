import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/scss/index.scss";
import App from "./App.tsx";

// Language
import "./utils/i18n.js";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
