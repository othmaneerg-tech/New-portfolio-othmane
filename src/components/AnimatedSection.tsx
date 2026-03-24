"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  viewport?: any;
  transition?: any;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  viewport = { once: true, margin: "-100px" },
  transition,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={transition || {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
