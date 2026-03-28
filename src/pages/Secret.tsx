import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useViewTransitionNavigate } from "@/hooks/use-view-transition";
import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Secret = () => {
  const navigate = useViewTransitionNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.backgroundColor = '';
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const disableParallax = isMobile || prefersReducedMotion;
  const backgroundY = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(var(--bitcoin-orange))] noise-overlay"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Background Gradients */}
      <m.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Glow Blobs */}
      <m.div
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" style={{ transform: 'translateZ(0)' }} />
      </m.div>

      {/* Back button */}
      <button
        onClick={() => {
          const returnSection = sessionStorage.getItem("secretReturnSection");
          navigate("/");

          if (!returnSection || returnSection === "hero") {
            setTimeout(() => window.scrollTo(0, 0), 100);
            return;
          }

          // Scroll to the section with nav offset.
          // Lazy sections may not be in the DOM yet — poll until the element appears.
          // After finding it, we re-check position after a delay because lazy content
          // above the target may still be loading and shifting layout.
          let attempts = 0;
          const getTargetTop = (el: HTMLElement) => {
            const nav = document.querySelector("nav");
            const navHeight = nav?.offsetHeight ?? 64;
            return el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
          };

          const scrollToSection = () => {
            const el = document.getElementById(returnSection);
            if (el) {
              // First scroll to approximate position
              window.scrollTo({ top: getTargetTop(el), behavior: "instant" as ScrollBehavior });
              // Then re-verify after lazy content settles — layout may shift
              // as sections above load images/content
              let stabilizeAttempts = 0;
              let lastTop = -1;
              const stabilize = () => {
                const currentTop = getTargetTop(el);
                if (Math.abs(currentTop - lastTop) < 2 || stabilizeAttempts >= 10) {
                  // Position is stable, do final smooth scroll
                  window.scrollTo({ top: currentTop, behavior: "smooth" });
                } else {
                  lastTop = currentTop;
                  window.scrollTo({ top: currentTop, behavior: "instant" as ScrollBehavior });
                  stabilizeAttempts++;
                  setTimeout(stabilize, 200);
                }
              };
              setTimeout(stabilize, 300);
            } else if (attempts < 30) {
              attempts++;
              setTimeout(scrollToSection, 150);
            }
          };
          setTimeout(scrollToSection, 150);
        }}
        className="fixed top-6 left-6 text-white/70 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs tracking-wider z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <m.div style={{ y: contentY, opacity }} className="container relative z-10 px-6">
        <div
          className="max-w-5xl mx-auto text-center"
        >
          {/* Bitcoin logo — starts small like profile pic, scales up */}
          <m.div
            initial={{ scale: 0.3, rotate: -360, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
            className="flex justify-center mb-10 -mt-8 md:mt-20"
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <m.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-white border-4 border-white/30 shadow-lg overflow-hidden flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-white/15 group-hover:border-white/60 transition-[shadow,border-color] duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="w-28 h-28 md:w-36 md:h-36"
                >
                  <path
                    d="M46.1 27.2c.6-3.9-2.4-6-6.4-7.4l1.3-5.3-3.2-.8-1.3 5.1c-.8-.2-1.7-.4-2.5-.6l1.3-5.2-3.2-.8-1.3 5.3c-.7-.2-1.3-.3-1.9-.5l0 0-4.4-1.1-.9 3.4s2.4.5 2.3.6c1.3.3 1.5 1.2 1.5 1.9l-1.5 6c.1 0 .2 0 .3.1-.1 0-.2-.1-.3-.1l-2.1 8.4c-.2.4-.6 1.1-1.5.8 0 0-2.3-.6-2.3-.6l-1.6 3.7 4.2 1c.8.2 1.5.4 2.3.6l-1.3 5.4 3.2.8 1.3-5.3c.9.2 1.7.4 2.5.6l-1.3 5.3 3.2.8 1.3-5.3c5.5 1 9.7.6 11.4-4.4 1.4-4-.1-6.3-3-7.8 2.1-.5 3.7-1.9 4.1-4.7zM39.7 36.8c-1 4-7.8 1.8-10 1.3l1.8-7.1c2.2.6 9.3 1.6 8.2 5.8zm1-9.7c-.9 3.6-6.6 1.8-8.4 1.3l1.6-6.5c1.8.5 7.8 1.3 6.8 5.2z"
                    fill="#F7931A"
                  />
                </svg>
              </m.div>
            </div>
          </m.div>

          {/* Title — fades in after logo scales up */}
          <m.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] mb-6 leading-[0.85] text-white"
          >
            Buy <span className="text-white/80">Bitcoin</span>
          </m.h1>

          {/* Tagline */}
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.0 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-3xl mx-auto mb-4 font-medium"
          >
            Bitcoin is the best money ever created. Truly scarce, independent of any authority, and yours alone to control. It puts financial power back in our hands. ₿
          </m.p>
        </div>
      </m.div>
    </section>
  );
};

export default Secret;
