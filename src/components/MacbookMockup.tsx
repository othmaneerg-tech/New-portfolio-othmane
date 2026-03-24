"use client";

import { motion } from "framer-motion";

interface MacbookMockupProps {
  imageUrl: string;
  className?: string;
}

export default function MacbookMockup({ imageUrl, className = "" }: MacbookMockupProps) {
  return (
    <motion.div
      className={`macbook w-full relative ${className}`}
      style={{
        padding: "4% 6%",
        margin: "0 auto",
        maxWidth: "800px",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative w-full">
        {/* Screen (Inner Frame) */}
        <div
          className="screen bg-black mx-auto relative overflow-hidden"
          style={{
            width: "80%",
            borderRadius: "3% 3% 0.5% 0.5% / 5%",
          }}
        >
          {/* Screen inner shadow/border (before equivalent) */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              border: "2px solid #cacacc",
              borderRadius: "3% 3% 0.5% 0.5% / 5%",
              boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.8) inset, 0 0 1px 2px rgba(255, 255, 255, 0.3) inset",
            }}
          />

          {/* Aspect Ratio Box (before: content) */}
          <div style={{ paddingTop: "67%" }} />

          {/* Viewport (The actual screen content) */}
          <div
            className="macbook-viewport absolute inset-0 cursor-pointer overflow-hidden transition-[background-position] duration-[3000ms] ease-in-out"
            style={{
              margin: "4.3% 3.2%",
              background: "#1a1a1a",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              backgroundRepeat: "no-repeat",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "bottom center")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "top center")}
          >
            {/* Glossy Overlay/Reflection (viewport:after equivalent) */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: "radial-gradient(circle at right bottom, transparent 75%, rgba(255, 255, 255, 0.05) 75%, transparent)"
              }}
            />
          </div>

          {/* Bottom Screen Border Line (after equivalent) */}
          <div
            className="absolute bottom-0 left-[0.5%] w-[99%] pointer-events-none z-30"
            style={{
              borderTop: "2px solid rgba(255, 255, 255, 0.15)",
              paddingTop: "1%",
              bottom: "0.75%"
            }}
          />
        </div>

        {/* MacBook Base (Keyboard/Bottom part) */}
        <div className="base relative w-full">
          {/* Aspect Ratio and Styling (before equivalent) */}
          <div
            className="relative"
            style={{
              paddingTop: "3.3%",
              background: "linear-gradient(#eaeced, #edeef0 55%, #fff 55%, #8a8b8f 56%, #999ba0 61%, #4B4B4F 84%, #262627 89%, rgba(0, 0, 0, .01) 98%)",
              borderRadius: "0 0 10% 10% / 0 0 50% 50%",
            }}
          >
            {/* Gradient Overlay (after equivalent) */}
            <div
              className="absolute top-0 w-full h-[53%]"
              style={{
                background: "linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.8) 0.5%, rgba(0, 0, 0, 0.4) 3.3%, transparent 15%, rgba(255, 255, 255, 0.8) 50%, transparent 85%, rgba(0, 0, 0, 0.4) 96.7%, rgba(255, 255, 255, 0.8) 99.5%, rgba(0, 0, 0, 0.5) 100%)"
              }}
            />
          </div>
        </div>

        {/* Base Notch */}
        <div
          className="notch relative mx-auto z-40"
          style={{
            width: "14%",
            marginTop: "-3.5%",
            background: "#ddd",
            borderRadius: "0 0 7% 7% / 0 0 95% 95%",
            boxShadow: "-5px -1px 3px rgba(0, 0, 0, 0.2) inset, 5px -1px 3px rgba(0, 0, 0, 0.2) inset",
          }}
        >
          {/* Aspect Ratio Box (before equivalent) */}
          <div style={{ paddingTop: "10%" }} />
        </div>
      </div>
    </motion.div>
  );
}
