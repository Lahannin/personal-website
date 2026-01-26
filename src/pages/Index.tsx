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
    <div className="h-screen overflow-y-auto snap-y snap-mandatory bg-background">
      <Navigation />
      <div className="snap-start">
        <Hero />
      </div>
      <Quote />
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