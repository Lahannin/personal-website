/**
 * SSR entry point — renders a full static snapshot of the page content
 * for crawlers and LLMs that parse initial HTML but may not fully hydrate React.
 *
 * Unlike the client (Index.tsx) which lazy-loads sections behind <Suspense>,
 * this entry eagerly imports ALL sections so `renderToString` outputs
 * the complete page in a single pass.
 *
 * Hydration note: React will see a mismatch between this full SSR HTML and
 * the client's initial render (which shows placeholders for lazy sections).
 * This is intentional — we suppress the hydration warning with id="root"
 * and let React reconcile. The tradeoff (brief hydration flicker vs. full
 * content for crawlers) strongly favors SEO/LLM discoverability.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";

// Eagerly import ALL components for full SSR output
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import MeetupGallery from "./components/MeetupGallery";
import Products from "./components/Products";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ArticlesIndex from "./pages/ArticlesIndex";
import ArticleDetail from "./pages/ArticleDetail";

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
        <About />
        <MeetupGallery />
        <Products />
        <Experience />
        <Skills />
        <Articles />
        <Contact />
        <Footer />
      </main>
    </div>
  </>
);

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<IndexSSR />} />
        <Route path="/articles" element={<ArticlesIndex />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="*" element={<div />} />
      </Routes>
    </StaticRouter>
  );
}
