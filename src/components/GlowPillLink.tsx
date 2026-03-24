"use client";

import { motion } from "framer-motion";
import React from "react";

interface GlowPillLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
  isExternal?: boolean;
}

export default function GlowPillLink({
  href,
  children,
  icon,
  onClick,
  className = "",
  glowColor = "rgba(56, 189, 248, 0.4)", // Default light blue glow (tailwind sky-400)
  isExternal = false,
}: GlowPillLinkProps) {
  const target = isExternal ? "_blank" : "_self";
  const rel = isExternal ? "noopener noreferrer" : undefined;

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`relative group inline-flex items-center justify-center ${className}`}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow Layer */}
      <motion.div
        className="absolute inset-0 rounded-full blur-md bg-transparent transition-all duration-300 pointer-events-none"
        variants={{
          hover: {
            backgroundColor: glowColor,
            scale: 1.1,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
          },
        }}
        initial={{ opacity: 0, scale: 0.9 }}
      />

      {/* Button Body */}
      <div className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] border border-white/10 group-hover:border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-colors duration-300">
        
        {/* Subtle inner top highlight to simulate glass curve */}
        <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {icon && (
          <span className="text-muted group-hover:text-white transition-colors duration-300 flex items-center justify-center">
            {icon}
          </span>
        )}
        <span className="text-sm font-medium text-muted group-hover:text-white transition-colors duration-300 tracking-wide">
          {children}
        </span>
      </div>
    </motion.a>
  );
}
