"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  backgroundImage?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.3,
  backgroundImage,
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 -inset-y-[20%]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
