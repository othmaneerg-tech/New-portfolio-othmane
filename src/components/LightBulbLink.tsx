"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

interface LightBulbLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  activeColor?: string;
  className?: string;
  isExternal?: boolean;
}

export default function LightBulbLink({
  href,
  children,
  icon,
  activeColor = "#0077b5", // Default to a vivid blue
  className = "",
  isExternal = false,
}: LightBulbLinkProps) {
  const [hovered, setHovered] = useState(false);
  const target = isExternal ? "_blank" : "_self";
  const rel = isExternal ? "noopener noreferrer" : undefined;

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-stretch h-[46px] rounded-full cursor-pointer select-none group ${className}`}
    >
      {/* Socket (Left side) */}
      <div 
        className="relative z-10 flex flex-shrink-0 items-center justify-center w-[50px] rounded-l-full overflow-hidden transition-colors duration-300"
        style={{
          background: hovered ? "#4a4a4a" : "#2a2a2a",
          boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.8)",
          borderRight: "1px solid #1a1a1a"
        }}
      >
        {/* Metal glare/reflection on the socket */}
        <div 
          className="absolute top-1 right-0 w-[40px] h-[15px] rounded-tl-full bg-white/30 blur-[2px] transition-opacity duration-300" 
          style={{ opacity: hovered ? 0.8 : 0.4 }}
        />
        {/* Metallic ridges */}
        <div className="absolute right-1 w-[2px] h-[60%] bg-black/40 rounded-full" />
        <div className="absolute right-3 w-[2px] h-[60%] bg-black/40 rounded-full" />
      </div>

      {/* Glass Bulb (Right side) */}
      <div 
        className="relative z-10 flex flex-grow items-center pr-6 pl-4 rounded-r-full transition-all duration-300"
        style={{
          backgroundColor: hovered ? `${activeColor}15` : "rgba(255,255,255,0.02)",
          borderColor: hovered ? activeColor : "rgba(255,255,255,0.1)",
          borderWidth: "1px",
          borderLeftWidth: "0",
          boxShadow: hovered 
            ? `inset 0 -2px 10px rgba(255,255,255,0.3), 0 0 15px ${activeColor}88` 
            : "inset 0 -2px 5px rgba(255,255,255,0.05)",
        }}
      >
        {/* Top edge glass reflection */}
        <div 
          className="absolute top-0 right-2 left-0 h-[40%] rounded-tr-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
        />

        {/* Content (Filament / Text / Icon) */}
        <motion.div 
          className="flex items-center gap-2 relative z-20"
          animate={{
            color: hovered ? "#ffffff" : "#a1a1aa",
            textShadow: hovered ? `0 0 8px ${activeColor}, 0 0 16px ${activeColor}` : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          {icon && (
            <span 
              className="flex items-center justify-center transition-colors duration-300"
              style={{ color: hovered ? "#ffffff" : "#a1a1aa" }}
            >
              {icon}
            </span>
          )}
          <span className="text-sm font-bold tracking-wide">
            {children}
          </span>
        </motion.div>

        {/* Inner bulb ambient glow element */}
        <motion.div
          className="absolute inset-0 rounded-r-full pointer-events-none mix-blend-screen"
          animate={{
            background: hovered 
              ? `radial-gradient(circle at 30% 50%, ${activeColor}55 0%, transparent 80%)` 
              : "none",
            opacity: hovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.a>
  );
}
