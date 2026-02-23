import { MapPin, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const disableParallax = isMobile || prefersReducedMotion;
  
  // Parallax settings optimized for "smooth" over "dramatic"
  const backgroundY = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Snappier than 0.15
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // 20px is easier on the GPU than 30px
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 0.61, 0.36, 1] as const,
      },
    },
  };

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background noise-overlay">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      {/* Background Gradients */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none"
      />
      
      {/* Glow Blobs */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-highlight/4 rounded-full blur-3xl" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/4 rounded-full blur-3xl" style={{ transform: 'translateZ(0)' }} />
      </motion.div>

      <motion.div style={{ y: contentY, opacity }} className="container relative z-10 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Profile photo with all your hover effects preserved */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10 -mt-8 md:mt-0">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-highlight/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-highlight/40 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-secondary border-4 border-border shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:shadow-highlight/15 group-hover:border-highlight/40 transition-all duration-500">
                <img 
                  src="/lauri-hanninen-profile-photo.webp" 
                  alt="Lauri Hänninen — Product Marketing Lead at Trezor" 
                  className="w-full h-full object-cover"
                  width={208}
                  height={208}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] mb-6 leading-[0.85]"
          >
            Lauri <span className="text-gradient">Hänninen</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-4 font-medium"
          >
            Product Marketing Lead turning complex tech into stories people actually understand.
          </motion.p>
          
          {/* Location details */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-14"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider">Prague, Czechia 🇨🇿</span>
            <span className="mx-2 text-border">•</span>
            <span className="font-mono text-xs tracking-wider">Finnish origins 🇫🇮</span>
          </motion.div>

          {/* All CTA buttons restored */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <a
              href="#about"
              className="group px-8 sm:px-10 py-4 sm:py-5 min-h-[52px] flex items-center justify-center bg-foreground text-background font-bold rounded-lg shadow-lg hover:shadow-highlight/20 hover:scale-[1.03] transition-all duration-300 text-base sm:text-lg tracking-tight"
            >
              Learn More
              <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 sm:px-10 py-4 sm:py-5 min-h-[52px] flex items-center justify-center bg-transparent text-foreground font-bold rounded-lg border-2 border-foreground/20 hover:border-highlight hover:text-highlight hover:scale-[1.03] transition-all duration-300 text-base sm:text-lg tracking-tight"
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
