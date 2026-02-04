import { MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo1 from "@/assets/logo-1.avif";
import logo2 from "@/assets/logo-2.avif";
import logo3 from "@/assets/logo-3.avif";
import logo4 from "@/assets/logo-4.avif";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
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
      {/* Parallax background with rich gradient */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_30%_96%)_0%,hsl(220_25%_94%)_40%,hsl(220_20%_97%)_100%)]" />
        {/* Subtle mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(217_46%_21%/0.08),transparent)]" />
      </motion.div>
      
      {/* Floating accent shapes for depth and color variety */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(12_76%_61%/0.08)] rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[hsl(217_46%_21%/0.06)] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[hsl(172_66%_50%/0.06)] rounded-full blur-3xl" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity }} className="container relative z-10 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >

          {/* Status badge with accent glow */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg mb-6">
              <span className="w-2 h-2 rounded-full bg-[hsl(172_66%_50%)] animate-pulse" />
              <span className="text-sm font-medium text-primary">Tech-Savvy Product Marketer</span>
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
            Turning complex products into clear, compelling stories that customers love.
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

          {/* CTA buttons with accent styling */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <motion.a
              href="#about"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] flex items-center justify-center bg-primary text-primary-foreground font-semibold rounded-xl shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all text-sm sm:text-base overflow-hidden"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(217_50%_28%)_0%,hsl(217_46%_21%)_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] flex items-center justify-center bg-white text-primary font-semibold rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all text-sm sm:text-base"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Partner logos */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
            role="img"
            aria-label="Logos of companies I've worked with"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <img src={logo1} alt="Trezor - Hardware wallet company" className="h-16 md:h-20 w-auto object-contain" width={80} height={80} loading="eager" />
              <img src={logo2} alt="GoodData - Analytics platform" className="h-16 md:h-20 w-auto object-contain" width={80} height={80} loading="eager" />
              <img src={logo3} alt="Product Marketing Alliance" className="h-16 md:h-20 w-auto object-contain" width={80} height={80} loading="eager" />
              <img src={logo4} alt="Wunderman Thompson - Creative agency" className="h-16 md:h-20 w-auto object-contain" width={80} height={80} loading="eager" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
