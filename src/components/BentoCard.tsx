"use client";

import { motion, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

// Generate random particles once per card
const generateParticles = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    dx: (Math.random() - 0.5) * 120, // Movement delta X
    dy: (Math.random() - 0.5) * 120, // Movement delta Y
    size: 2 + Math.random() * 3,     // 2px to 5px
    duration: 2 + Math.random() * 2.2, // Animation duration
    delay: Math.random() * 0.8,        // Animation delay
  }));
};

export default function BentoCard({ 
  children, 
  className = "", 
  glowColor = "41, 151, 255",
  onClick 
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(generateParticles(6));
  }, []);
  
  // Mouse tracking springs for smooth spotlight follow
  // We use high stiffness and lower damping for a "snappy" but organic feel
  const mouseX = useSpring(50, { stiffness: 800, damping: 40 });
  const mouseY = useSpring(50, { stiffness: 800, damping: 40 });
  
  // Physics springs for 3D tilt effect
  const tiltX = useSpring(0, { stiffness: 500, damping: 30 });
  const tiltY = useSpring(0, { stiffness: 500, damping: 30 });
  
  // Magnetism (subtle pull of the card towards the mouse)
  const magX = useSpring(0, { stiffness: 500, damping: 30 });
  const magY = useSpring(0, { stiffness: 500, damping: 30 });

  // Map normalized tilt (-1 to 1) to rotation degrees
  const rotateX = useTransform(tiltY, [-1, 1], [5, -5]); // Mouse up -> tilt up
  const rotateY = useTransform(tiltX, [-1, 1], [-5, 5]); // Mouse right -> tilt right

  // Combine into a transform template
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${magX}px) translateY(${magY}px)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Calculate mouse position relative to card bounds
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update spotlight percentages
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    mouseX.set(pctX);
    mouseY.set(pctY);
    
    // Calculate normalized values from center (-1 to 1) for tilt/magnetism
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const nx = (x - cx) / cx;
    const ny = (y - cy) / cy;
    
    tiltX.set(nx);
    tiltY.set(ny);
    
    // Subtle magnetism pull
    magX.set(nx * 4); // max 4px pull
    magY.set(ny * 4);
    
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    // Smooth reset to center
    tiltX.set(0);
    tiltY.set(0);
    magX.set(0);
    magY.set(0);
    // Keep spotlight roughly centered when leaving
    mouseX.set(50);
    mouseY.set(50);
  };

  // Convert spring values to CSS variables for smooth gradient updates
  // We use a base opacity (0.03 for bg, 0.15 for border) that persists even when not hovered
  const backgroundStyle = useMotionTemplate`
    radial-gradient(circle 350px at ${mouseX}% ${mouseY}%, rgba(${glowColor}, ${hovered ? 0.1 : 0.03}), transparent),
    rgba(255, 255, 255, 0.02)
  `;
  
  const borderStyle = useMotionTemplate`
    radial-gradient(circle 300px at ${mouseX}% ${mouseY}%, rgba(${glowColor}, ${hovered ? 0.6 : 0.15}), rgba(255, 255, 255, 0.1))
  `;

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{ transform, cursor: onClick ? "pointer" : "default" }}
      className={`relative group rounded-3xl p-[1px] overflow-hidden transition-shadow duration-500 hide-cursor-trail ${className}`}
    >
      {/* Dynamic Border Layer */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
        style={{ background: borderStyle }}
      />
      
      {/* Main Content Area */}
      <motion.div
        className="relative z-10 w-full h-full rounded-[23px] bg-background/90 backdrop-blur-md p-6 md:p-8 flex flex-col overflow-hidden"
        style={{ background: backgroundStyle, willChange: "transform" }}
      >
        {/* Subtle top reflection simulating glass volume */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20" />
        
        {/* Floating Particles - Now permanently active with subtle pulses */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
          {particles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `rgba(${glowColor}, 0.8)`,
                boxShadow: `0 0 10px rgba(${glowColor}, 0.6)`,
              }}
              initial={{ opacity: 0, x: 0, y: 0, filter: "blur(0px)" }}
              animate={{
                opacity: hovered ? [0.2, 1, 0.2] : [0.1, 0.4, 0.1],
                x: hovered ? [0, p.dx] : [0, p.dx * 0.5],
                y: hovered ? [0, p.dy] : [0, p.dy * 0.5],
                filter: hovered ? ["blur(0px)", "blur(1px)"] : ["blur(1px)", "blur(2px)"],
              }}
              transition={{
                duration: p.duration * (hovered ? 1 : 2),
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Actual Children (Text/Icons) */}
        <div className="relative z-30 flex-grow pt-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
