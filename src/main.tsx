import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;

// The prerender injects real HTML into #root for fast FCP/LCP and crawler visibility.
// React mounts fresh on top of it (createRoot, not hydrateRoot) to avoid hydration
// mismatch errors caused by lazy imports, dark mode state, and browser-only APIs.
// The brief flash is invisible because the pre-rendered HTML is visually identical.
createRoot(rootEl).render(<App />);
