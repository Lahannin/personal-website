import { MapPin, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import profilePhoto from "@/assets/profile-photo.png";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const disableParallax = isMobile || prefersReducedMotion;
  const backgroundY = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1] as const,
      },
    },
  };

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20"
      />
      
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-highlight/3 rounded-full blur-3xl" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity }} className="container relative z-10 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >

          {/* Profile photo with highlight ring */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10 -mt-8 md:mt-0">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-highlight/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-highlight/40 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-secondary border-4 border-border shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:shadow-highlight/15 group-hover:border-highlight/40 transition-all duration-500">
                <img 
                  src={profilePhoto} 
                  alt="Lauri Hänninen - Product Marketing Lead" 
                  className="w-full h-full object-cover"
                  width={208}
                  height={208}
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>

          {/* Name — massive and bold */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.9]"
          >
            Lauri <span className="text-gradient">Hänninen</span>
          </motion.h1>

          {/* Tagline — bigger and bolder */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-4 font-medium"
          >
            Product Marketer turning complex tech into{" "}
            <span className="text-highlight font-bold">stories people actually understand.</span>{" "}
          </motion.p>
          
          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-14"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="mono text-sm"><span className="sr-only">Location: </span>Prague, Czechia 🇨🇿</span>
            <span className="mx-2 text-border">•</span>
            <span className="mono text-sm">Finnish origins 🇫🇮</span>
          </motion.div>

          {/* CTA buttons — bolder, more contrast */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <a
              href="#about"
              className="group px-8 sm:px-10 py-4 sm:py-5 min-h-[52px] flex items-center justify-center bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-highlight/20 hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 text-base sm:text-lg"
            >
              Learn More
              <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 sm:px-10 py-4 sm:py-5 min-h-[52px] flex items-center justify-center bg-secondary text-secondary-foreground font-bold rounded-xl border-2 border-border hover:border-highlight/50 hover:bg-highlight/5 hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 text-base sm:text-lg"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
