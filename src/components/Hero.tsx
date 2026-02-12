import { MapPin } from "lucide-react";
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
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity }} className="container relative z-10 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >

          {/* Profile photo */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-primary/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-secondary border-4 border-border shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/30 transition-all duration-500">
                <img 
                  src={profilePhoto} 
                  alt="Lauri Hänninen - Product Marketing Lead" 
                  className="w-full h-full object-cover"
                  width={160}
                  height={160}
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Lauri <span className="text-gradient">Hänninen</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Tech-savvy Product Marketer turning complex products into clear, compelling stories that customers love.
          </motion.p>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-12"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="mono text-sm"><span className="sr-only">Location: </span>Prague, Czechia 🇨🇿</span>
            <span className="mx-2 text-border">•</span>
            <span className="mono text-sm">Finnish origins 🇫🇮</span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#about"
              className="px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] flex items-center justify-center bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-opacity text-sm sm:text-base"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] flex items-center justify-center bg-secondary text-secondary-foreground font-semibold rounded-lg border border-border hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors text-sm sm:text-base"
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
