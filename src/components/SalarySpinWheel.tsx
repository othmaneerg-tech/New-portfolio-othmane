"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const salaries = [
  { label: "0 MAD", bg: "black", text: "#fcf6ba" },
  { label: "1500 MAD", bg: "gold", text: "#111" },
  { label: "3500 MAD", bg: "black", text: "#fcf6ba" },
  { label: "100 MAD", bg: "gold", text: "#111" },
  { label: "66 MAD", bg: "black", text: "#fcf6ba" },
  { label: "999 MAD", bg: "gold", text: "#111" },
  { label: "120 MAD", bg: "black", text: "#fcf6ba" },
  { label: "12000 MAD", bg: "gold", text: "#111" }, // Winning spot
];

export default function SalarySpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCreeping, setIsCreeping] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowResult(false);
    setIsCreeping(false);

    // --- Segment math ---
    const segmentSize = 45;
    const zeroIndex = 0;       // "0 MAD" is at index 0
    const jackpotIndex = 7;    // "12,000 MAD" is at index 7

    // targetOffset is degrees clockwise rotation required to bring that index to top
    // For index 0: (8-0)*45 = 360 (same as 0)
    // For index 7: (8-7)*45 = 45
    const zeroOffset = 360; 
    const jackpotOffset = 45; 

    // Phase 1: Land ALMOST on 0 MAD — stop just 3-8 degrees short (inside the 0 segment)
    const tantalize = Math.random() * 5 + 3; // 3–8deg short
    const teaseDegrees = zeroOffset - tantalize; 

    const baseSpins = 360 * 8; // 8 full rotations for drama
    const teaseRotation = rotation + baseSpins + (teaseDegrees - (rotation % 360));

    setRotation(teaseRotation);

    // Transition times
    const fastDuration = 4500; // ms (Phase 1)
    const creepDuration = 3500; // ms (Phase 2)

    // Phase 2: After the fast spin settles on "almost 0"... creep slowly to 12,000
    setTimeout(() => {
      const creepDegrees = tantalize + jackpotOffset; 
      setIsCreeping(true);
      setRotation(prev => prev + creepDegrees);

      setTimeout(() => {
        setIsSpinning(false);
        setIsCreeping(false);
        setShowResult(true);
      }, creepDuration);

    }, fastDuration + 200); 
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-32 md:mb-10 w-full px-4 relative z-10">
      {/* Playful Header */}
      <h3 className="text-xl md:text-3xl font-bold text-center tracking-tight mb-2 uppercase">
        <span className="text-muted-foreground uppercase text-xs md:text-sm tracking-[0.2em] block mb-2 font-mono">Game Theory</span>
        STILL HESITATING? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#fcf6ba]">LET&apos;S GAMBLE ON MY FUTURE.</span>
      </h3>
      <p className="text-muted text-center mb-10 text-sm md:text-base max-w-lg">
        Take the risk. At this rate, you can even hire me for <span className="text-white font-bold italic">0 MAD</span> if the wheel says so.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full p-4 md:p-8 min-h-[auto] md:min-h-[600px] relative">

        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#bf953f]/10 blur-[150px] rounded-full pointer-events-none" />

        {/* AVATAR SECTION */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-40 sm:w-56 md:w-[450px] overflow-visible">
            <Image
              src="/assets/avatar_spin.png"
              alt="Othmane Spin Avatar"
              width={0}
              height={0}
              sizes="(max-width: 640px) 160px, (max-width: 768px) 224px, 450px"
              style={{ width: '100%', height: 'auto' }}
              className="drop-shadow-2xl object-contain z-10 relative"
            />

            {/* Glowing welcome bubble - Repositioned to clear the head */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className={`absolute transition-all duration-500 bg-[#111]/90 backdrop-blur-md p-3 md:p-5 rounded-2xl rounded-bl-none border border-[#bf953f]/40 shadow-[0_0_40px_rgba(191,149,63,0.2)] z-20 max-w-[140px] sm:max-w-[160px] md:max-w-none ${
                showResult 
                  ? "top-[38%] md:top-[3%] -right-2 md:-right-32" 
                  : "top-[32%] md:top-[5%] -right-2 md:-right-20"
              }`}
            >
              <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] text-base md:text-xl mb-1">
                Welcome!
              </h4>
              <p className="text-xs md:text-sm text-gray-300 font-medium whitespace-nowrap">
                {showResult
                  ? "Sold! My bags are at your desk.🤝"
                  : "Let's spin for my salary..."}
              </p>
            </motion.div>
          </div>
        </div>

        {/* WHEEL SECTION */}
        <div className="relative z-10 flex flex-col items-center mt-6 md:mt-0">

          {/* 3D Gold Stand Base — scales relative to wheel */}
          <div
            className="absolute -bottom-12 md:-bottom-16"
            style={{ width: 'clamp(90px, 28vw, 160px)', height: 'clamp(68px, 21vw, 96px)' }}
          >
            <div
              className="w-full h-full bg-gradient-to-b from-[#b38728] via-[#bf953f] to-[#aa771c]"
              style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', boxShadow: 'inset 0px 10px 20px rgba(0,0,0,0.5)' }}
            />
          </div>
          <div
            className="absolute -bottom-12 md:-bottom-16"
            style={{ width: 'clamp(112px, 35vw, 200px)', height: '16px', background: 'linear-gradient(to right, #aa771c, #fcf6ba, #aa771c)', borderRadius: '2px', transform: 'translateY(clamp(68px, 21vw, 96px))' }}
          />

          {/* The Outer Gold Frame — clamp to viewport */}
          <div
            className="relative rounded-full p-3 md:p-4 bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_5px_20px_rgba(255,255,255,0.8)]"
            style={{ width: 'clamp(260px, 82vw, 450px)', height: 'clamp(260px, 82vw, 450px)' }}
          >

            {/* Inner Dark Rim */}
            <div className="absolute inset-2 md:inset-3 rounded-full bg-[#111] shadow-[inset_0_10px_30px_rgba(0,0,0,0.9)] z-0" />

            {/* LED Bulbs */}
            <div className="absolute inset-0 rounded-full z-20 pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_15px_2px_#fff,0_0_5px_1px_#fcf6ba]"
                  style={{
                    top: `calc(50% - ${Math.cos((i * 22.5 * Math.PI) / 180) * 48.5}% - 5px)`,
                    left: `calc(50% + ${Math.sin((i * 22.5 * Math.PI) / 180) * 48.5}% - 5px)`
                  }}
                />
              ))}
            </div>

            {/* 3D Pointer / Flapper */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-40 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] flex flex-col items-center">
              <div className="w-6 h-5 md:w-8 md:h-6 bg-[#111] rounded-t-md border-t-2 border-x-2 border-[#bf953f]" />
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[22px] md:border-l-[16px] md:border-r-[16px] md:border-t-[28px] border-l-transparent border-r-transparent border-t-[#111] relative">
                <div className="absolute -top-[22px] md:-top-[28px] -left-[9px] md:-left-[12px] w-0 h-0 border-l-[9px] border-r-[9px] border-t-[17px] md:border-l-[12px] md:border-r-[12px] md:border-t-[22px] border-l-transparent border-r-transparent border-t-[#bf953f]" />
              </div>
            </div>

            {/* THE ROTATING WHEEL */}
            <motion.div
              className="w-full h-full rounded-full overflow-hidden relative shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] border-4 border-[#1a1a1a]"
              style={{
                willChange: "transform",
                background: `conic-gradient(from -22.5deg, 
                #1a1a1a 0 45deg, 
                #d4af37 45deg 90deg, 
                #1a1a1a 90deg 135deg, 
                #d4af37 135deg 180deg, 
                #1a1a1a 180deg 225deg, 
                #d4af37 225deg 270deg, 
                #1a1a1a 270deg 315deg, 
                #d4af37 315deg 360deg
              )`
              }}
              animate={{ rotate: rotation }}
              transition={isCreeping ? {
                duration: 3.5,
                ease: "linear",
              } : {
                duration: 4.5,
                ease: [0.15, 0.9, 0.25, 1],
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />

              {/* Salary Text Labels */}
              {salaries.map((salary, index) => {
                const rotateAngle = index * 45;
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full flex justify-center items-start pt-5 md:pt-12 font-bold text-[0.6rem] sm:text-xs md:text-xl tracking-tighter"
                    style={{
                      transform: `rotate(${rotateAngle}deg)`,
                      color: salary.text,
                    }}
                  >
                    <span className="drop-shadow-md">
                      {salary.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Luxury Center Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 z-30">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-2xl border-4 border-[#111] flex items-center justify-center overflow-hidden">
                <button
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className="w-full h-full rounded-full bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] border-4 border-[#111] relative overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-90 disabled:opacity-50 shadow-2xl"
                >
                  <span className="text-[#111] font-black tracking-widest text-[0.55rem] md:text-sm uppercase relative z-10">
                    {isSpinning ? "???" : "SPIN"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}