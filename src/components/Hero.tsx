import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo1 from "@/assets/logo-1.avif";
import logo2 from "@/assets/logo-2.avif";
import logo3 from "@/assets/logo-3.avif";
import logo4 from "@/assets/logo-4.avif";

const Hero = () => {
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
    <section aria-labelledby="hero-heading" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <div className="container relative z-10 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >

          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6">
              <span className="text-sm text-muted-foreground">Product Marketing Leader</span>
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

          {/* Partner logos */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
            role="img"
            aria-label="Logos of companies I've worked with"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <img src={logo1} alt="Trezor - Hardware wallet company" className="h-16 md:h-20" width={80} height={80} loading="eager" />
              <img src={logo2} alt="GoodData - Analytics platform" className="h-16 md:h-20" width={80} height={80} loading="eager" />
              <img src={logo3} alt="Product Marketing Alliance" className="h-16 md:h-20" width={80} height={80} loading="eager" />
              <img src={logo4} alt="Wunderman Thompson - Creative agency" className="h-16 md:h-20" width={80} height={80} loading="eager" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
