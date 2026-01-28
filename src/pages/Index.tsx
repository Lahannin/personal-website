import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      {/* Skip to main content link for accessibility */}
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
          <Quote />
          <About />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
