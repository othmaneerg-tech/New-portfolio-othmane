"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface HoverTextGlowProps {
  text: string;
  fontSize?: string | number;
  borderColor?: string;
  textNormal?: string;
  textActive?: string;
  glowColor?: string;
  className?: string;
}

export default function HoverTextGlow({
  text = "Button",
  fontSize = "inherit",
  borderColor = "#2997ff",
  textNormal = "rgba(255, 255, 255, 0)",
  textActive = "#2997ff",
  glowColor = "rgba(41, 151, 255, 0.8)",
  className = "",
}: HoverTextGlowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative inline-flex items-center px-6 py-2 cursor-pointer group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      style={{ isolation: "isolate" }}
    >
      {/* Moving Border Bar */}
      <motion.div
        className="absolute top-0 bottom-0 w-1.5 z-10"
        initial={{ left: 0 }}
        animate={{ 
          left: isHovered ? "calc(100% - 6px)" : "0%",
        }}
        style={{ backgroundColor: borderColor }}
        transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
      />

      {/* Text with Stroke/Glow */}
      <motion.span
        animate={{
          color: isHovered ? textActive : textNormal,
          textShadow: isHovered ? `0px 0px 50px ${glowColor}` : "0px 0px 0px transparent",
        }}
        style={{
          fontSize: fontSize,
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          WebkitTextStroke: isHovered ? `1px ${textActive}` : `1px rgba(255, 255, 255, 0.6)`,
          transition: "WebkitTextStroke 0.5s cubic-bezier(0.44, 0, 0.56, 1)",
        }}
        className="relative z-0 whitespace-nowrap inline-block"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
