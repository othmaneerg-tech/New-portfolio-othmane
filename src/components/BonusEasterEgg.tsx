"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, X } from "lucide-react";

export default function BonusEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinWheelVisible, setIsSpinWheelVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const [started, setStarted] = useState(false);
  const router = useRouter();

  // Watch for spin wheel and footer visibility
  useEffect(() => {
    const spinWheel = document.getElementById("salary-spin-wheel");
    const footer = document.querySelector("footer");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "salary-spin-wheel") {
            setIsSpinWheelVisible(entry.isIntersecting);
          }
          if (entry.target.tagName.toLowerCase() === "footer") {
            setIsFooterVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (spinWheel) observer.observe(spinWheel);
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Reset countdown when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCountdown(7);
      setStarted(false);
      return;
    }

    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!started) return;
    if (countdown <= 0) {
      router.push("/othmane-unlocked");
      return;
    }
    const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(interval);
  }, [started, countdown, router]);

  return (
    <>
      {/* Floating Easter Egg Button — only visible when footer is in view */}
      <AnimatePresence>
        {isSpinWheelVisible && !isFooterVisible && (
          <motion.button
            key="bonus-btn"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] w-18 h-18 md:w-20 md:h-20 rounded-full p-[2px] bg-white/10 backdrop-blur-xl cursor-pointer group overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
            aria-label="Unlock Bonus"
          >
            {/* Pulsing ambient glow behind */}
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/30 blur-md"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Mirror Glass Inner Surface */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 group-hover:border-purple-400/50 transition-colors duration-500 bg-gradient-to-br from-white/20 to-transparent">
              <img 
                src="/assets/unlocked/img1.jpeg" 
                alt="Unlock Bonus" 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
              />
              
              {/* Continuous Shine Sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full skew-x-12"
                animate={{
                  translateX: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
              />

              {/* Glass Overlay Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />
            </div>

            {/* Bottom reflecting shadow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_-4px_8px_rgba(0,0,0,0.5)] pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-lg bg-[#0d0d0d] border border-purple-500/20 rounded-[2rem] p-10 text-center shadow-[0_0_80px_rgba(168,85,247,0.2)] overflow-hidden"
            >
              {/* Glow BG */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(164,53,240,0.12)_0%,_transparent_60%)] pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-muted" />
              </button>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                Bonus Unlocked
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight relative z-10">
                Since you reached this stage...
                <br />
                <span className="text-purple-500">you unlocked a bonus.</span>
              </h2>

              <p className="text-muted text-base md:text-lg max-w-sm mx-auto mb-10 leading-relaxed relative z-10">
                You've officially bypassed the LinkedIn filter.
                <br />
                Ready to see the human behind the pixels?
              </p>

              {/* Countdown */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="4" />
                    <motion.circle
                      cx="28" cy="28" r="24"
                      fill="none"
                      stroke="url(#purpleGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      animate={{ strokeDashoffset: started ? 0 : 2 * Math.PI * 24 }}
                  transition={{ duration: 7, ease: "linear" }}
                    />
                    <defs>
                      <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white">
                    {countdown > 0 ? countdown : "✨"}
                  </span>
                </div>
                <p className="text-xs text-muted/60 uppercase tracking-widest font-mono">
                  {started && countdown > 0 ? "Redirecting in..." : !started ? "Get ready..." : "Here we go!"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
