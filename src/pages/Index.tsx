import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer"; // Import normally to reduce network overhead

// Lazy load the heavy content sections
const Quote = lazy(() => import("@/components/Quote"));
const About = lazy(() => import("@/components/About"));
const MeetupGallery = lazy(() => import("@/components/MeetupGallery"));
const Experience = lazy(() => import("@/components/Experience"));
const Products = lazy(() => import("@/components/Products"));
const Skills = lazy(() => import("@/components/Skills"));
const Articles = lazy(() => import("@/components/Articles"));
const Contact = lazy(() => import("@/components/Contact"));

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
        <Navigation />
        <main id="main-content">
          {/* Hero is outside Suspense. 
             This ensures the browser sees your LCP (Largest Contentful Paint) 
             immediately without waiting for the lazy-loading "handshake."
          */}
          <Hero />

          <Suspense fallback={<div className="h-40" />}>
            <Quote />
            <About />
            <MeetupGallery />
            <Products />
            <Experience />
            <Skills />
            <Articles />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
