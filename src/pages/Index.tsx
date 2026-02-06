import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Products from "@/components/Products";
import Skills from "@/components/Skills";
import Articles from "@/components/Articles";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

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
          <SectionDivider variant="dots" />
          <About />
          <SectionDivider variant="fade" />
          <Products />
          <SectionDivider variant="line" />
          <Experience />
          <SectionDivider variant="dots" />
          <Skills />
          <SectionDivider variant="fade" />
          <Articles />
          <SectionDivider variant="line" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
