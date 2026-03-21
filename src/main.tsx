import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;

// If the server pre-rendered HTML into #root, hydrate it.
// Otherwise fall back to a fresh createRoot (local dev, non-prerendered pages).
if (rootEl.innerHTML.trim()) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
