import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Secret = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7931A] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors flex items-center gap-2 font-mono text-sm z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Animated Bitcoin logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 12, duration: 0.8 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-40 h-40 md:w-56 md:h-56 drop-shadow-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="32" cy="32" r="32" fill="white" />
          <path
            d="M46.1 27.2c.6-3.9-2.4-6-6.4-7.4l1.3-5.3-3.2-.8-1.3 5.1c-.8-.2-1.7-.4-2.5-.6l1.3-5.2-3.2-.8-1.3 5.3c-.7-.2-1.3-.3-1.9-.5l0 0-4.4-1.1-.9 3.4s2.4.5 2.3.6c1.3.3 1.5 1.2 1.5 1.9l-1.5 6c.1 0 .2 0 .3.1-.1 0-.2-.1-.3-.1l-2.1 8.4c-.2.4-.6 1.1-1.5.8 0 0-2.3-.6-2.3-.6l-1.6 3.7 4.2 1 c.8.2 1.5.4 2.3.6l-1.3 5.4 3.2.8 1.3-5.3c.9.2 1.7.4 2.5.6l-1.3 5.3 3.2.8 1.3-5.3c5.5 1 9.7.6 11.4-4.4 1.4-4-.1-6.3-3-7.8 2.1-.5 3.7-1.9 4.1-4.7zM39.7 36.8c-1 4-7.8 1.8-10 1.3l1.8-7.1c2.2.6 9.3 1.6 8.2 5.8zm1-9.7c-.9 3.6-6.6 1.8-8.4 1.3l1.6-6.5c1.8.5 7.8 1.3 6.8 5.2z"
            fill="#F7931A"
          />
        </motion.svg>
      </motion.div>

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-5xl md:text-8xl font-black text-white mt-8 tracking-tight drop-shadow-lg"
      >
        Buy Bitcoin
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-white/70 font-mono text-xs mt-6 tracking-widest uppercase"
      >
        Bitcoin is a decentralized, permissionless, and censorship-resistant form of money that puts financial freedom back in our hands. ₿
      </motion.p>
    </div>
  );
};

export default Secret;
