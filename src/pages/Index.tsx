import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";

const About = lazy(() => import("@/components/About"));
const MeetupGallery = lazy(() => import("@/components/MeetupGallery"));
const Experience = lazy(() => import("@/components/Experience"));
const Products = lazy(() => import("@/components/Products"));
const Skills = lazy(() => import("@/components/Skills"));
const Articles = lazy(() => import("@/components/Articles"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-background">
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
        <main id="main-content">
          {/* Hero stays outside Suspense for maximum LCP performance */}
          <Hero />

          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <About />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <MeetupGallery />
              <Products />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Experience />
              <Articles />
              <Skills />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Contact />
              <Footer />
            </Suspense>
          </ErrorBoundary>
        </main>
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
