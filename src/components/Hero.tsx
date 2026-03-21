import { useState, useCallback, useRef } from "react";
import { MapPin, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FloatingBitcoin {
  id: number;
  x: number;
  y: number;
  size: number;
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const [spinTriggered, setSpinTriggered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const cursorSize = 24;
  const [shakeKey, setShakeKey] = useState(0);
  const [floatingBitcoins, setFloatingBitcoins] = useState<FloatingBitcoin[]>([]);
  const [haloScale, setHaloScale] = useState(0);
  const bitcoinIdRef = useRef(0);

  const getBitcoinCursor = (size: number) =>
    `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><text y="${size * 0.75}" font-size="${size * 0.75}" fill="%23F7931A">₿</text></svg>') ${size / 2} ${size / 2}, pointer`;

  const handlePhotoClick = useCallback((e: React.MouseEvent) => {
    clickCountRef.current += 1;
    const count = clickCountRef.current;

    if (count < 5 && !spinTriggered) {
      setShakeKey(prev => prev + 1);
      setHaloScale(count);

      // Spawn floating Bitcoin on click
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = bitcoinIdRef.current++;
      const size = 20 + count * 10;
      setFloatingBitcoins(prev => [...prev, { id, x, y, size }]);
      setTimeout(() => {
        setFloatingBitcoins(prev => prev.filter(b => b.id !== id));
      }, 1200);
    }

    if (count >= 5 && !spinTriggered) {
      setSpinTriggered(true);
      setHaloScale(0);
      setTimeout(() => setFadeOut(true), 200);
      setTimeout(() => {
        document.documentElement.style.backgroundColor = '#F7931A';
        navigate("/secret");
      }, 1100);
    }
  }, [spinTriggered, navigate]);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Stagger orchestration only — no opacity animation on container itself
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section ref={sectionRef} aria-labelledby="hero-heading" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background" data-description="Lauri Hänninen — Product Marketing Lead at Trezor, based in Prague. Turning complex tech into stories people actually understand.">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      {/* Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-highlight/4 rounded-full blur-3xl" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/4 rounded-full blur-3xl" style={{ transform: 'translateZ(0)' }} />
      </div>

      <motion.div style={{ opacity }} className="container relative z-10 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Profile photo with all your hover effects preserved */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10 -mt-8 md:mt-20">
              <div className="relative group flex items-center justify-center" onClick={handlePhotoClick} style={{ cursor: getBitcoinCursor(cursorSize) }}>
              {/* Outer soft glow — scales up with clicks */}
              <motion.div
                className="absolute w-44 h-44 md:w-52 md:h-52 rounded-full pointer-events-none"
                animate={{
                  scale: haloScale > 0 ? 1 + haloScale * 0.25 : 0,
                  opacity: haloScale > 0 ? [0.4, 0.7, 0.4] : 0,
                }}
                transition={{
                  scale: { duration: 0.5, ease: "easeOut" },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(247,147,26,0.35) 0%, rgba(247,147,26,0.15) 40%, rgba(247,147,26,0.05) 70%, transparent 100%)',
                  filter: 'blur(20px)',
                }}
              />
              {/* Inner ring glow — hugs the photo edge */}
              <motion.div
                className="absolute w-44 h-44 md:w-52 md:h-52 rounded-full pointer-events-none"
                animate={{
                  scale: haloScale > 0 ? 1 + haloScale * 0.12 : 0,
                  opacity: haloScale > 0 ? 0.8 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  background: 'radial-gradient(circle, transparent 42%, rgba(247,147,26,0.6) 50%, rgba(247,147,26,0.4) 60%, rgba(247,147,26,0.15) 75%, transparent 100%)',
                  filter: 'blur(4px)',
                }}
              />
              <motion.div
                key={spinTriggered ? "spin" : shakeKey}
                animate={spinTriggered 
                  ? { rotate: 360, scale: 0, opacity: 0 } 
                  : shakeKey > 0 ? { x: [0, -6, 6, -4, 4, -2, 2, 0] } : {}
                }
                transition={spinTriggered 
                  ? { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }
                  : { duration: 0.4, ease: "easeOut" }
                }
                className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-secondary dark:bg-transparent border-4 border-border/20 dark:border-border/40 shadow-sm overflow-hidden group-hover:shadow-lg group-hover:shadow-highlight/10 group-hover:border-highlight/30 transition-[shadow,border-color] duration-500"
              >
                <img 
                  src="/lauri-hanninen-profile-photo.webp" 
                  alt="Lauri Hänninen — Product Marketing Lead at Trezor" 
                  className="w-full h-full object-cover"
                  width={208}
                  height={208}
                  sizes="176px"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </motion.div>
              {/* Floating Bitcoin logos on click */}
              <AnimatePresence>
                {floatingBitcoins.map(b => (
                  <motion.span
                    key={b.id}
                    initial={{ opacity: 1, y: 0, scale: 0.7 }}
                    animate={{ opacity: 0, y: -260, scale: 1.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute pointer-events-none select-none font-black"
                    style={{
                      left: b.x,
                      top: b.y,
                      fontSize: Math.max(b.size * 1.5, 36),
                      color: '#F7931A',
                      zIndex: 20,
                      textShadow: '0 0 12px rgba(247,147,26,0.7), 0 0 24px rgba(247,147,26,0.4)',
                    }}
                  >
                    ₿
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Name — no framer-motion animation to avoid non-composited paint */}
          <h1
            id="hero-heading"
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] mb-6 leading-[0.85]"
          >
            Lauri <span className="text-gradient">Hänninen</span>
          </h1>

          {/* Tagline — LCP element: starts visible, no opacity:0 */}
          <p
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-4 font-medium"
          >
            Product Marketing Lead turning complex tech into stories people actually understand.
          </p>
          
          {/* Location details */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-14"
          >
            <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider">Prague 🇨🇿 · Finnish origins 🇫🇮</span>
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
              About Me
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="ml-2 inline-flex"
              >
                <ArrowDown className="w-4 h-4" />
              </motion.span>
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

      {/* Full-screen fade-out overlay */}
      {fadeOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#F7931A]"
        />
      )}
    </section>
  );
};

export default Hero;
