/**
 * SSR entry point — uses eager imports (no lazy()) so renderToString
 * can fully render all components without Suspense boundaries.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";

// Eager imports — bypass lazy() for SSR
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
        <Route path="*" element={<div />} />
      </Routes>
    </StaticRouter>
  );
}
