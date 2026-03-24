"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Laugh, Play, Maximize2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const galleryItems = [
  {
    type: "image",
    src: "/assets/unlocked/img1.jpeg",
    title: "Always Learning",
    description: "I read because the best conversations start with curiosity.",
    color: "164, 53, 240",
  },
  {
    type: "image",
    src: "/assets/unlocked/Surf champion.jpeg",
    title: "Surf Champion",
    description: "Just kidding… I fell on the first wave..",
    color: "255, 122, 89",
  },
  {
    type: "video",
    src: "/assets/unlocked/babbyfoot.mp4",
    title: "Baby Foot legend",
    description: "I spent more energy shouting at the table than actually scoring goals.",
    isMuted: true,
    color: "41, 151, 255",
  },
  {
    type: "image",
    src: "/assets/unlocked/img4.jpeg",
    title: "Leadership Training",
    description: "Practicing how to stay calm under pressure.",
    color: "190, 24, 93",
  },
  {
    type: "image",
    src: "/assets/unlocked/img6.jpeg",
    title: "High Performance Team",
    description: "Our strategy is simple: run, shout, and hope someone scores.",
    color: "16, 185, 129",
  },
  {
    type: "video",
    src: "/assets/unlocked/vid3.mp4",
    title: "Mountain Lunch",
    description: "Best brainstorming sessions start with tajine.",
    isMuted: true,
    color: "249, 115, 22",
  },
];

export default function UnlockedPage() {
  const [index, setIndex] = useState(0);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const router = useRouter();
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  const unlockAudio = useCallback(() => {
    setIsAudioUnlocked(true);
  }, []);

  const nextItem = useCallback(() => setIndex((prev) => (prev + 1) % galleryItems.length), []);
  const prevItem = useCallback(() => setIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length), []);

  const handleDragEnd = (x: number) => {
    unlockAudio();
    const threshold = 80;
    if (x <= -threshold) nextItem();
    else if (x >= threshold) prevItem();
    dragX.set(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      unlockAudio();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "ArrowRight") nextItem();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlockAudio, nextItem, prevItem]);

  // Wheel scroll navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      unlockAudio();

      const now = Date.now();
      if (now - lastScrollTime.current < 350) return;

      if (e.deltaY > 30 || e.deltaX > 30) {
        nextItem();
        lastScrollTime.current = now;
      } else if (e.deltaY < -30 || e.deltaX < -30) {
        prevItem();
        lastScrollTime.current = now;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [unlockAudio, nextItem, prevItem]);

  return (
    <main 
      className="min-h-screen bg-[#050505] text-white py-20 px-4 relative overflow-hidden flex flex-col items-center justify-center"
      onClick={unlockAudio}
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <Link href="/">
          <motion.div
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8 group cursor-pointer"
            whileHover={{ x: -10 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium tracking-tight">Back to Professional Side</span>
          </motion.div>
        </Link>

        <AnimatedSection className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6 mx-auto">
            <Laugh className="w-4 h-4" />
            Hidden Bonus Level
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-[-0.03em] mb-4">
            The Real Othmane — <span className="text-purple-500">Unlocked</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Congratulations! You found the hidden side of the portfolio. This is where the marketing talk stops and the real personality begins.
          </p>
          <p className="text-sm text-muted/60 mt-4 italic">Swipe, scroll, or use arrows to navigate</p>
        </AnimatedSection>

        {/* 3D CAROUSEL CONTAINER */}
        <div
          className="relative h-[500px] md:h-[600px] w-full mt-10 overflow-hidden"
          ref={containerRef}
          style={{ overscrollBehavior: "contain" }}
        >
          {/* Added unified 3D perspective to the wrapper */}
          <div 
            className="absolute inset-0 flex items-center justify-center overflow-visible"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <div className="relative w-full max-w-[320px] md:max-w-[420px] h-full flex items-center justify-center">
              {galleryItems.map((item, i) => {
                let offset = i - index;
                const total = galleryItems.length;

                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                if (Math.abs(offset) > 2) return null;

                return (
                  <CarouselCard 
                    key={i} 
                    item={item} 
                    offset={offset} 
                    isActive={offset === 0} 
                    dragX={dragX}
                    onDragEnd={handleDragEnd}
                    isAudioUnlocked={isAudioUnlocked}
                    router={router}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <AnimatedSection className="mt-20 text-center">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=othmaneelrhareg@gmail.com&su=Bonus%20Unlocked%20Inquiry&body=${encodeURIComponent("Salam Othmane. Portfolio dyalk naaaadi. Lets talk business!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full text-lg font-bold hover:scale-105 transition-all shadow-xl shadow-white/10"
          >
            Hire the Real Othmane
          </a>
        </AnimatedSection>
      </div>
    </main>
  );
}

function CarouselCard({
  item,
  offset,
  isActive,
  dragX,
  onDragEnd,
  isAudioUnlocked,
  router,
}: any) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      if (isActive) {
        // Respect per-item mute override
        videoRef.current.muted = item.isMuted || !isAudioUnlocked;
        videoRef.current.volume = 1.0;
        
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play();
            }
          });
        }
      } else {
        videoRef.current.muted = true;
      }
    }
  }, [isActive, item.type, isAudioUnlocked, item.isMuted]);

  // Combine static index offset with continuous drag offset
  const virtualOffset = useTransform(dragX, (v: number) => offset + v / 280);

  // Smooth out the movement
  const springConfig = { stiffness: 150, damping: 20 };

  // Using exact keyframes [-2, -1, 0, 1, 2] to map precisely to the 3D positions
  const x = useSpring(
    useTransform(virtualOffset, [-2, -1, 0, 1, 2], [-380, -220, 0, 220, 380]),
    springConfig
  );

  const z = useSpring(
    useTransform(virtualOffset, [-2, -1, 0, 1, 2], [-400, -150, 0, -150, -400]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(virtualOffset, [-2, -1, 0, 1, 2], [45, 35, 0, -35, -45]),
    springConfig
  );

  const scale = useSpring(
    useTransform(virtualOffset, [-2, -1, 0, 1, 2], [0.75, 0.85, 1, 0.85, 0.75]),
    springConfig
  );

  const opacity = useTransform(virtualOffset, [-2, -1, 0, 1, 2], [0, 0.6, 1, 0.6, 0]);

  // Dynamic Z-Index
  const zIndex = useTransform(virtualOffset, (v) => 100 - Math.round(Math.abs(v)) * 10);

  // Text opacity
  const textOpacity = useTransform(virtualOffset, (v) => {
    const absOffset = Math.abs(v);
    return absOffset < 0.5 ? 1 : 0;
  });

  const handleClick = () => {
    if (item.type === "video" && videoRef.current && isActive && !item.isMuted) {
      videoRef.current.muted = false;
      videoRef.current.play();
    } else if (item.href && isActive) {
      router.push(item.href);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      dragMomentum={false}
      onDrag={(e, info) => dragX.set(info.offset.x)}
      onDragEnd={(e, info) => onDragEnd(info.offset.x)}
      whileTap={{ cursor: "grabbing" }}
      onClick={handleClick}
      style={{
        x,
        z,
        rotateY,
        scale,
        opacity,
        zIndex,
        transformPerspective: 1200, // <-- THIS IS THE MAGIC FIX FOR 3D
        position: "absolute",
        cursor: isActive ? "grab" : "pointer",
      }}
      className="w-[280px] md:w-[380px] h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-surface/50 backdrop-blur-sm group will-change-transform"
    >
      <div className="relative w-full h-full">
        {item.type === "video" ? (
          <div className="w-full h-full bg-black relative">
            <video
              ref={videoRef}
              src={item.src}
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {!isActive && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-white/30" />
              </div>
            )}
          </div>
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        <motion.div
          className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center text-center pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-white/70 max-w-[80%] leading-relaxed">
            {item.description}
          </p>
        </motion.div>

        <div className={`absolute -inset-1 bg-gradient-to-br from-[rgba(${item.color},0.3)] to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
      </div>
    </motion.div>
  );
}
