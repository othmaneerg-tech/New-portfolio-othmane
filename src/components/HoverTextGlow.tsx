import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  const [isIntro, setIsIntro] = useState(true);
  const [introActive, setIntroActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Trigger intro sequence only when scrolled into view
  useEffect(() => {
    if (isInView && isIntro) {
      const timer1 = setTimeout(() => setIntroActive(true), 200); // Start animation
      const timer2 = setTimeout(() => setIntroActive(false), 1400); // Return pulse
      const timer3 = setTimeout(() => setIsIntro(false), 2000); // Enable hover interactivity

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isInView, isIntro]);

  const activeState = {
    color: textActive,
    textShadow: `0px 0px 50px ${glowColor}`,
    WebkitTextStroke: `1px ${textActive}`,
  };

  const normalState = {
    color: textNormal,
    textShadow: "0px 0px 0px transparent",
    WebkitTextStroke: `1px rgba(255, 255, 255, 0.6)`,
  };

  // Determine which state to show based on phase
  const showActive = isIntro ? introActive : isHovered;

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-flex items-center px-6 py-2 group cursor-pointer ${className}`}
      onHoverStart={() => !isIntro && setIsHovered(true)}
      onHoverEnd={() => !isIntro && setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      style={{ isolation: "isolate" }}
    >
      {/* Moving Border Bar */}
      <motion.div
        className="absolute top-0 bottom-0 w-1.5 z-10"
        animate={{ 
          left: showActive ? "calc(100% - 6px)" : "0%",
        }}
        style={{ backgroundColor: borderColor }}
        transition={{ duration: 0.8, ease: [0.44, 0, 0.56, 1] }}
      />

      {/* Text with Stroke/Glow */}
      <motion.span
        animate={showActive ? activeState : normalState}
        transition={{ duration: 0.8, ease: [0.44, 0, 0.56, 1] }}
        style={{
          fontSize: fontSize,
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          transition: "WebkitTextStroke 0.5s cubic-bezier(0.44, 0, 0.56, 1)",
        }}
        className="relative z-0 whitespace-nowrap inline-block"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
