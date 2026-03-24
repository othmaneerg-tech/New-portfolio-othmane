"use client";

import React, { useState, useEffect, useRef, startTransition } from "react";
import { motion, useInView } from "framer-motion";

interface CharacterColumnProps {
  character: string;
  duplicateCount: number;
  rollDuration: number;
  delay: number;
  blurIntensity: number;
  isAnimating: boolean;
  textColor: string;
  fontSize: number | string;
  fontWeight: string | number;
  lineHeight: string | number;
  characterIndex: number;
  animationPattern: "sequential" | "alternating";
}

function CharacterColumn({
  character,
  duplicateCount,
  rollDuration,
  delay,
  blurIntensity,
  isAnimating,
  textColor,
  fontSize,
  fontWeight,
  lineHeight,
  characterIndex,
  animationPattern,
}: CharacterColumnProps) {
  const [activeHeight, setActiveHeight] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const duplicates = Array(duplicateCount).fill(character);

  useEffect(() => {
    if (measureRef.current) {
      // Add a small buffer (4px) to ensure descenders aren't clipped
      setActiveHeight(measureRef.current.offsetHeight + 4);
    }
  }, [fontSize, lineHeight]);

  const characterHeight = activeHeight;
  const totalScrollDistance = characterHeight * (duplicateCount - 1);
  const isOddPosition = characterIndex % 2 === 0;
  const shouldRollFromBottom = animationPattern === "alternating" && !isOddPosition;

  const initialY = shouldRollFromBottom ? -totalScrollDistance : 0;
  const finalY = shouldRollFromBottom ? 0 : -totalScrollDistance;

  return (
    <div
      style={{
        position: "relative",
        height: characterHeight > 0 ? `${characterHeight}px` : "auto",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {/* Measurement Span (Hidden) */}
      <span
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          fontSize,
          fontWeight,
          lineHeight,
        }}
      >
        {character}
      </span>

      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        initial={{ y: initialY }}
        animate={isAnimating && characterHeight > 0 ? { y: finalY } : { y: initialY }}
        transition={{
          duration: rollDuration,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "tween",
        }}
      >
        {duplicates.map((char, index) => (
          <motion.span
            key={index}
            style={{
              color: textColor,
              height: `${characterHeight}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: fontSize,
              fontWeight: fontWeight,
              lineHeight: lineHeight,
            }}
            initial={{ filter: "blur(0px)" }}
            animate={
              isAnimating
                ? { filter: ["blur(0px)", `blur(${blurIntensity}px)`, `blur(${blurIntensity}px)`, "blur(0px)"] }
                : { filter: "blur(0px)" }
            }
            transition={{
              duration: rollDuration,
              delay: delay,
              times: [0, 0.2, 0.8, 1],
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

interface RollingTextProps {
  text?: string;
  duplicateCount?: number;
  rollDuration?: number;
  staggerDelay?: number;
  blurIntensity?: number;
  autoPlay?: boolean;
  textColor?: string;
  fontSize?: number | string;
  fontWeight?: string | number;
  lineHeight?: string | number;
  animationPattern?: "sequential" | "alternating";
  className?: string;
}

export default function RollingText({
  text = "ROLLING",
  duplicateCount = 8,
  rollDuration = 2,
  staggerDelay = 0.1,
  blurIntensity = 8,
  autoPlay = true,
  textColor = "#FFFFFF",
  fontSize = "60px",
  fontWeight = "bold",
  lineHeight = 1.2,
  animationPattern = "sequential",
  className = "",
}: RollingTextProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (autoPlay && isInView) {
      const timer = setTimeout(() => {
        startTransition(() => setIsAnimating(true));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, isInView]);

  const handleReplay = () => {
    startTransition(() => {
      setIsAnimating(false);
      setTimeout(() => {
        startTransition(() => setIsAnimating(true));
      }, 50);
    });
  };

  const characters = text.split("");

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        userSelect: "none",
        cursor: "pointer",
      }}
      onClick={handleReplay}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "0.02em" }}>
        {characters.map((char, index) => (
          <CharacterColumn
            key={`${char}-${index}`}
            character={char === " " ? "\u00A0" : char}
            duplicateCount={duplicateCount}
            rollDuration={rollDuration}
            delay={index * staggerDelay}
            blurIntensity={blurIntensity}
            isAnimating={isAnimating}
            textColor={textColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            animationPattern={animationPattern}
            characterIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
