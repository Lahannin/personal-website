/**
 * SSR entry point — must match what the client renders on first hydration pass.
 *
 * The client (Index.tsx) eagerly imports Navigation + Hero, and wraps everything
 * else in <Suspense fallback={null}>. On first render, React shows Navigation + Hero
 * and null for the lazy sections. The server HTML must match this exactly, or React
 * throws hydration errors #418 and #423.
 *
 * For LLM crawlers and SEO bots that don't execute JS, the noscript block in
 * index.html already provides full content. The data-description attributes on
 * each section also provide structured summaries for crawler discoverability.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";

// Only import what the client renders eagerly (outside Suspense)
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

/**
 * This must structurally match Index.tsx's first render:
 * - Skip link
 * - div.min-h-screen > Navigation + main#main-content > Hero
 * - The Suspense fallback is null, so nothing else renders initially
 */
const IndexSSR = () => (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
    >
      Skip to main content
    </a>
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content">
        <Hero />
      </main>
    </div>
  </>
);

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<IndexSSR />} />
        <Route path="*" element={<div />} />
      </Routes>
    </StaticRouter>
  );
}
