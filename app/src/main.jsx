import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// HashRouter, not BrowserRouter: GitHub Pages serves this statically with no
// SPA fallback, so /work/chat360 as a real path returns 404 on a hard load or
// a shared link. Hash routing also keeps the exact URLs the published site
// already uses (#/work/chat360), which have gone out in job applications.
import { HashRouter } from "react-router-dom";
// Imported for its side effect: registers ScrollTrigger and useGSAP once,
// before any component tries to animate. See src/lib/gsap.js.
import "./lib/gsap";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
