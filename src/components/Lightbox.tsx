"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialIndex,
    align: "center",
    dragFree: false,
    containScroll: "trimSnaps"
  });

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Jump to correct index when opened
  useEffect(() => {
    if (emblaApi && isOpen) {
      emblaApi.scrollTo(initialIndex, true);
    }
  }, [emblaApi, initialIndex, isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, scrollPrev, scrollNext]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full interactive"
          >
            <X size={24} />
          </button>

          {/* Carousel */}
          <div className="w-full max-w-7xl px-4 relative h-full flex items-center" ref={emblaRef}>
            <div className="flex h-[80vh] items-center cursor-grab active:cursor-grabbing w-full">
              {images.map((img, idx) => (
                <div key={idx} className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center px-4 md:px-12">
                  <motion.img
                    src={img}
                    alt={`Gallery Image ${idx + 1}`}
                    className="max-w-full max-h-full object-contain select-none"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: currentIndex === idx ? 1 : 0.9, opacity: currentIndex === idx ? 1 : 0.5 }}
                    transition={{ duration: 0.4 }}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-4 md:left-8 z-50 p-3 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full interactive"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-4 md:right-8 z-50 p-3 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full interactive"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Pagination Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
                } interactive`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
