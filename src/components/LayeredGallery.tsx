"use client";

import React, { useState, useEffect, startTransition } from "react";
import { motion } from "framer-motion";

interface CardProps {
  src: string;
  alt: string;
  index: number;
  isHovered: boolean;
  isMobile: boolean;
  isFront: boolean;
  frontCardIndex: number | null;
  onClick: (index: number) => void;
  width: number;
  height: number;
  spacingX: number;
  spacingY: number;
  borderRadius: number;
  shadowIntensity: number;
}

const Card = ({
  src,
  alt,
  index,
  isHovered,
  isMobile,
  isFront,
  frontCardIndex,
  onClick,
  width,
  height,
  spacingX,
  spacingY,
  borderRadius,
  shadowIntensity,
}: CardProps) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        width,
        height,
        transformStyle: "preserve-3d",
        transformOrigin: isMobile ? "top center" : "center",
        zIndex: isFront ? 50 : 20 - index,
        filter: isFront || frontCardIndex === null || !isHovered ? "none" : "blur(2px)",
        borderRadius,
        overflow: "hidden",
        cursor: "pointer",
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
      }}
      initial={{ rotateY: 0, x: 0, y: 0, scale: 1, boxShadow: `0px 0px 15px rgba(0, 0, 0, ${0.1 * shadowIntensity})` }}
      animate={
        isFront
          ? {
              scale: 1.1,
              rotateY: 0,
              x: 0,
              y: isMobile ? 0 : 0,
              z: 100,
              boxShadow: `0px 15px 40px rgba(0, 0, 0, ${0.5 * shadowIntensity})`,
              transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.8, duration: 0.6 },
            }
          : isHovered
          ? {
              rotateY: isMobile ? 0 : -35 - index * 10,
              rotateX: isMobile ? index * 3 : 0,
              x: isMobile ? 0 : index * spacingX + index * 15,
              y: isMobile ? index * spacingY : index * -5,
              z: index * 20,
              scale: 1,
              boxShadow: `${10 + index * 5}px ${20 + index * 5}px ${30 + index * 10}px rgba(0, 0, 0, ${(0.2 + index * 0.08) * shadowIntensity})`,
              transition: { type: "spring", stiffness: 350, damping: 30, mass: 0.6, delay: index * 0.05, duration: 0.8 },
            }
          : {
              rotateY: 0,
              rotateX: 0,
              x: index * 2,
              y: index * 2,
              z: -index * 10,
              scale: 1 - index * 0.02,
              boxShadow: `0px 0px 15px rgba(0, 0, 0, ${0.1 * shadowIntensity})`,
              transition: { type: "spring", stiffness: 300, damping: 35, mass: 0.7, delay: (3 - index) * 0.06, duration: 0.7 },
            }
      }
      whileHover={!isFront && !isHovered ? { scale: 1.05, z: 30, transition: { type: "spring", stiffness: 500, damping: 30 } } : {}}
      whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 600, damping: 20, duration: 0.1 } }}
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      aria-label={alt}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(index);
        }
      }}
    />
  );
};

interface LayeredGalleryProps {
  images?: { src: string; alt?: string }[];
  cardWidth?: number;
  cardHeight?: number;
  spacingX?: number;
  spacingY?: number;
  borderRadius?: number;
  shadowIntensity?: number;
}

export default function LayeredGallery({
  images = [
    { src: "/assets/hero/Phone1.png", alt: "Phone 1" },
    { src: "/assets/hero/Phone2.png", alt: "Phone 2" },
    { src: "/assets/hero/Phone3.png", alt: "Phone 3" },
  ],
  cardWidth = 350,
  cardHeight = 700,
  spacingX = 40,
  spacingY = 20,
  borderRadius = 40,
  shadowIntensity = 1,
}: LayeredGalleryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [frontCardIndex, setFrontCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      startTransition(() => setIsMobile(window.innerWidth <= 768));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = (index: number) => {
    startTransition(() => {
      setFrontCardIndex((prev) => (prev === index ? null : index));
    });
  };

  return (
    <div
      className="flex justify-center items-center w-full h-full relative"
    >
      <div
        className="relative"
        style={{ width: cardWidth, height: cardHeight, perspective: "1200px" }}
        onMouseEnter={() => startTransition(() => setIsHovered(true))}
        onMouseLeave={() => startTransition(() => setIsHovered(false))}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            src={image.src}
            alt={image.alt || `Image ${index + 1}`}
            index={index}
            isHovered={isHovered}
            isMobile={isMobile}
            isFront={frontCardIndex === index}
            frontCardIndex={frontCardIndex}
            onClick={handleCardClick}
            width={cardWidth}
            height={cardHeight}
            spacingX={spacingX}
            spacingY={spacingY}
            borderRadius={borderRadius}
            shadowIntensity={shadowIntensity}
          />
        ))}
      </div>
    </div>
  );
}
