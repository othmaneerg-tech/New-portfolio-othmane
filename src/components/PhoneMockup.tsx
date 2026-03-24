"use client";

import { motion } from "framer-motion";

interface PhoneMockupProps {
  videoUrl?: string;
  imageUrl?: string;
  poster?: string;
  deviceColor?: string;
  screenBackgroundColor?: string;
  notchColor?: string;
}

export default function PhoneMockup({
  videoUrl,
  imageUrl,
  poster,
  deviceColor = "#1a1a1a",
  screenBackgroundColor = "#000000",
  notchColor = "#000000",
}: PhoneMockupProps) {
  // Configured to match the Framer template's default look
  const borderRadius = 45;
  const screenPadding = 8;
  const innerBorderRadius = borderRadius - screenPadding - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex justify-center items-center w-full max-w-[320px] mx-auto"
      // Force an approximate modern iPhone aspect ratio 19.5:9
      style={{ aspectRatio: "9/19.5" }}
    >
      {/* Outer Phone Casing */}
      <div
        className="w-full h-full relative flex flex-col"
        style={{
          backgroundColor: deviceColor,
          borderRadius: `${borderRadius}px`,
          padding: `${screenPadding}px`,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* Dynamic Island / Notch */}
        <div
          className="absolute z-20"
          style={{
            top: `${screenPadding + 12}px`,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "28px",
            backgroundColor: notchColor,
            borderRadius: "14px",
            boxShadow: "inset 0 -1px 2px rgba(255, 255, 255, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Subtle camera lens reflection */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#1e1e1e]" />
          </div>
        </div>

        {/* Inner Screen Container */}
        <div
          className="w-full h-full relative overflow-hidden flex flex-col justify-center items-center"
          style={{
            backgroundColor: screenBackgroundColor,
            borderRadius: `${innerBorderRadius}px`,
          }}
        >
          {videoUrl ? (
            <video
              src={videoUrl}
              poster={poster}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="w-full h-full object-cover"
              style={{ borderRadius: `${innerBorderRadius}px` }}
            />
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Phone Mockup Content"
              className="w-full h-full object-cover"
              style={{ borderRadius: `${innerBorderRadius}px` }}
            />
          ) : null}
        </div>

        {/* Home Indicator line at the bottom */}
        <div
          className="absolute z-20"
          style={{
            bottom: `${screenPadding + 6}px`,
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "2px",
          }}
        />
      </div>
    </motion.div>
  );
}
