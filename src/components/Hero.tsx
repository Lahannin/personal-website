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
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

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
      {/* Parallax background layer */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20"
      />
      
      {/* Subtle floating shapes for depth */}
      <motion.div 
        style={{ y: backgroundY, rotate: blobRotate }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Organic blob shapes */}
        <div className="absolute top-[10%] -left-20 w-[500px] h-[400px] bg-primary/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl" />
        <div className="absolute bottom-[20%] -right-32 w-[450px] h-[350px] bg-primary/4 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/3 rounded-[50%_50%_40%_60%/40%_60%_50%_50%] blur-3xl" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity }} className="container relative z-10 px-6 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >

          {/* Status badge */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start md:ml-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/70 backdrop-blur-sm border border-border mb-6">
              <span className="text-sm text-muted-foreground">Tech-Savvy Product Marketer</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-center md:text-left md:-ml-1"
          >
            Lauri<br className="md:hidden" /> <span className="text-gradient">Hänninen</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-8 text-center md:text-left md:ml-2"
          >
            Turning complex products into clear, compelling stories that customers love.
          </motion.p>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-12 md:ml-2"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="mono text-sm"><span className="sr-only">Location: </span>Prague, Czechia 🇨🇿</span>
            <span className="mx-2 text-border">•</span>
            <span className="mono text-sm">Finnish origins 🇫🇮</span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 md:ml-2"
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

          {/* Partner logos */}
          <motion.div
            variants={itemVariants}
            className="mt-20 md:mt-24 relative"
            role="img"
            aria-label="Logos of companies I've worked with"
          >
            {/* Decorative line */}
            <div className="hidden md:block absolute -left-20 top-1/2 w-16 h-px bg-gradient-to-r from-transparent to-border" />
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-12 lg:gap-16 md:ml-2">
              <motion.img whileHover={{ scale: 1.1, y: -4 }} transition={{ type: "spring", stiffness: 400 }} src={logo1} alt="Trezor - Hardware wallet company" className="h-14 md:h-16 lg:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" width={80} height={80} loading="eager" />
              <motion.img whileHover={{ scale: 1.1, y: -4 }} transition={{ type: "spring", stiffness: 400 }} src={logo2} alt="GoodData - Analytics platform" className="h-14 md:h-16 lg:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" width={80} height={80} loading="eager" />
              <motion.img whileHover={{ scale: 1.1, y: -4 }} transition={{ type: "spring", stiffness: 400 }} src={logo3} alt="Product Marketing Alliance" className="h-14 md:h-16 lg:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" width={80} height={80} loading="eager" />
              <motion.img whileHover={{ scale: 1.1, y: -4 }} transition={{ type: "spring", stiffness: 400 }} src={logo4} alt="Wunderman Thompson - Creative agency" className="h-14 md:h-16 lg:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" width={80} height={80} loading="eager" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
