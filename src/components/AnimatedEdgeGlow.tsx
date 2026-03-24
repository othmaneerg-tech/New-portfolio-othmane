"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AnimatedEdgeGlowProps {
    glowColor: string;
    glowSize?: number;
    borderWidth?: number;
    borderRadius?: number;
    glowType?: "border" | "shine";
    children: React.ReactNode;
    className?: string;
}

export default function AnimatedEdgeGlow({
    glowColor,
    glowSize = 400,
    borderWidth = 1,
    borderRadius = 32,
    glowType = "border",
    children,
    className = "",
}: AnimatedEdgeGlowProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the movement to prevent "jitter" or lag
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Determine if we are doing a Border Highlight or a Full Shine
    const background = useTransform(
        [smoothX, smoothY],
        ([x, y]) => {
            if (glowType === "border") {
                return `radial-gradient(${glowSize}px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`;
            } else {
                // Full Shine logic: subtle radial spotlight
                return `radial-gradient(${glowSize * 1.5}px circle at ${x}px ${y}px, ${glowColor}33, transparent 100%)`;
            }
        }
    );

    return (
      <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={className}
          style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: borderRadius,
              background: "rgba(255,255,255,0.03)", // Base card color
              overflow: "hidden",
              padding: borderWidth, // This creates the "border" area
              cursor: "pointer",
          }}
      >
          {/* THE GLOW LAYER */}
          <motion.div
              style={{
                  position: "absolute",
                  inset: 0,
                  background: background,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 0,
              }}
          />

          {/* LIGHT SWEEP ENTRANCE EFFECT */}
          <motion.div
            initial={{ x: "-150%", y: "-150%", rotate: 45 }}
            animate={{ x: "150%", y: "150%" }}
            transition={{ 
              duration: 2.5, 
              delay: 1.4, // Triggered slightly later to let 3D settle longer
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
              width: "200%",
              height: "200%",
            }}
          />

          {/* THE INNER CONTENT (Masks the center so only the edge glows) */}
          <div
              style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: Math.max(0, borderRadius - borderWidth),
                  background: "transparent", // Made transparent per user request
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
              }}
          >
              {children}
          </div>
      </motion.div>
    );
}
