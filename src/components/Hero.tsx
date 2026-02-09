import { MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profilePhoto from "@/assets/profile-photo.png";
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
      {/* Parallax background layer */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20"
      />
      
      {/* Subtle floating shapes for depth */}
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
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-secondary border-4 border-border shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/30 transition-all duration-500">
                <img 
                  src={profilePhoto} 
                  alt="Lauri Hänninen - Product Marketing Lead at Trezor, based in Prague" 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  width={144}
                  height={144}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6">
              <span className="text-sm text-muted-foreground">Tech-Savvy Product Marketer</span>
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
              <img src={logo1} alt="Trezor logo — Lauri Hänninen led product marketing and global hardware wallet launches" className="h-16 md:h-20 w-auto object-contain" width={80} height={80} loading="eager" />
              <img src={logo2} alt="GoodData logo — Lauri Hänninen drove analytics platform positioning and SaaS go-to-market" className="h-16 md:h-20 w-auto object-contain" width={80} height={80} loading="eager" />
              <img src={logo3} alt="Product Marketing Alliance logo — Lauri Hänninen founded the Czech Republic chapter" className="h-16 md:h-20 w-auto object-contain" width={80} height={80} loading="eager" />
              <img src={logo4} alt="Wunderman Thompson logo — Lauri Hänninen managed Ford of Europe web analytics and lead management" className="h-16 md:h-20 w-auto object-contain" width={80} height={80} loading="eager" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
