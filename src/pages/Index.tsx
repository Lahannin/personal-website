import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [isQuoteLocked, setIsQuoteLocked] = useState(false);
  const [quoteAnimationDone, setQuoteAnimationDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleQuoteAnimationStart = () => {
    setIsQuoteLocked(true);
  };

  const handleQuoteAnimationComplete = () => {
    setQuoteAnimationDone(true);
    setIsQuoteLocked(false);
  };

  // Prevent scroll when quote is locked
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      if (isQuoteLocked && !quoteAnimationDone) {
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", preventScroll, { passive: false });
    container.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", preventScroll);
      container.removeEventListener("touchmove", preventScroll);
    };
  }, [isQuoteLocked, quoteAnimationDone]);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory bg-background"
    >
      <Navigation />
      <div className="snap-start">
        <Hero />
      </div>
      <Quote 
        onAnimationStart={handleQuoteAnimationStart}
        onAnimationComplete={handleQuoteAnimationComplete}
      />
      <div className="snap-start">
        <About />
      </div>
      <div className="snap-start">
        <Experience />
      </div>
      <div className="snap-start">
        <Skills />
      </div>
      <div className="snap-start">
        <Contact />
      </div>
      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
};

export default Index;