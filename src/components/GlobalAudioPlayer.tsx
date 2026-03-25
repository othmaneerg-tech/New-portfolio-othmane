"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Monitor scroll for invitation text visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => {
      setIsPlaying(true);
      setHasInteracted(true);
    }).catch(() => {});
  }, []);

  // Attempt autoplay on mount
  useEffect(() => {
    tryPlay();
  }, [tryPlay]);

  // Fallback: play on first user interaction anywhere on the page
  useEffect(() => {
    if (hasInteracted) return;
    const handler = () => {
      tryPlay();
    };
    
    const events = ["click", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach(event => {
      window.addEventListener(event, handler, { once: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handler);
      });
    };
  }, [hasInteracted, tryPlay]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setHasInteracted(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/Sound-[AudioTrimmer.com].mp3"
        autoPlay
        playsInline
        loop
        preload="auto"
        style={{ display: "none" }}
      />
 
      {/* Floating Player & Invitation Text Container */}
      <motion.div
        className="fixed bottom-6 left-6 z-[9999] flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Main Player Bubble */}
        <motion.div
          className="relative flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer select-none overflow-hidden"
          style={{
            background: "rgba(13,13,13,0.85)",
            border: "1px solid rgba(168,85,247,0.25)",
            backdropFilter: "blur(16px)",
            boxShadow: isPlaying
              ? "0 0 20px rgba(168,85,247,0.3), 0 4px 20px rgba(0,0,0,0.5)"
              : "0 4px 20px rgba(0,0,0,0.5)",
          }}
          whileHover={{ scale: 1.03 }}
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
        >
          {/* Ambient glow */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: "radial-gradient(ellipse at left, rgba(168,85,247,0.15) 0%, transparent 70%)",
                }}
              />
            )}
          </AnimatePresence>
 
          {/* Play / Pause button */}
          <button
            onClick={togglePlay}
            className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300"
            style={{
              background: isPlaying ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.08)",
              color: isPlaying ? "#d8b4fe" : "#71717a",
            }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="1" width="4" height="12" rx="1" />
                <rect x="8" y="1" width="4" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M3 1.5l9 5.5-9 5.5z" />
              </svg>
            )}
          </button>
 
          {/* Animated Bars */}
          <div className="flex items-end gap-[3px] h-5 relative z-10">
            {[0.9, 0.5, 1, 0.7, 0.8].map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full"
                style={{
                  background: isPlaying ? "#a855f7" : "#3f3f46",
                  height: `${h * 20}px`,
                }}
                animate={
                  isPlaying && !isMuted
                    ? {
                        scaleY: [1, h * 1.4 + 0.3, 0.4, 1.2, 1],
                        opacity: [0.7, 1, 0.6, 1, 0.8],
                      }
                    : { scaleY: 0.3, opacity: 0.3 }
                }
                transition={{
                  duration: 0.8 + i * 0.15,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
 
          {/* Track label (visible on hover) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="label"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden relative z-10 pr-2"
              >
                <span className="text-[10px] font-bold text-purple-300 whitespace-nowrap tracking-wider uppercase">
                  Background Vibes
                </span>
              </motion.div>
            )}
          </AnimatePresence>
 
          {/* Mute toggle (visible on hover) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                key="mute"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                onClick={toggleMute}
                className="relative z-10 w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-200 text-zinc-400 hover:text-white"
                style={{ background: "rgba(255,255,255,0.07)" }}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
 
        {/* Outside Invitation Text - Permanently visible EXCLUSIVELY in hero section when not playing */}
        <AnimatePresence>
          {!isPlaying && isAtTop && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="hidden lg:block pointer-events-none select-none max-w-[200px] md:max-w-none"
            >
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-purple-500/20 shadow-2xl">
                <span className="text-[10px] md:text-xs text-zinc-200 leading-tight">
                  Want some good vibes while visiting? <span className="text-purple-400 font-bold block mt-0.5">Activate the sound</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
