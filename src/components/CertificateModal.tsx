"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

export default function CertificateModal({
  isOpen,
  onClose,
  imageSrc,
  title,
}: CertificateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl h-[80vh] bg-surface rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10 flex flex-col"
          >
            {/* Header */}
            <div className="relative p-6 flex justify-between items-center border-b border-white/5 bg-surface z-20">
              <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
 
            {/* Image Container */}
            <div className="relative flex-1 w-full bg-black/40 overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
