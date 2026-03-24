"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import BentoCard from "./BentoCard";
import CertificateModal from "./CertificateModal";
import { GraduationCap, Megaphone, Compass, Award, BarChart3 } from "lucide-react";

export default function EducationBentoGrid() {
  const [selectedCert, setSelectedCert] = useState<{
    image: string;
    title: string;
  } | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <>
      <motion.div 
        data-bento-grid
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* 
          LARGE TILE: Main Education (Master's Degree)
        */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2">
          <BentoCard className="h-full" glowColor="41, 151, 255">
            <div className="flex flex-col h-full justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 bg-white rounded-xl border border-white/20 shadow-lg overflow-hidden flex items-center justify-center">
                    <Image 
                      src="/assets/logos/encg.png" 
                      alt="ENCG Logo" 
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                  <span className="text-accent font-bold tracking-wide text-lg">ENCG Beni Mellal</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-semibold mb-3 leading-snug">
                  Master&apos;s — Commerce &amp; Management
                </h4>
                <p className="text-base text-muted/80 max-w-md leading-relaxed">
                  National School of Commerce and Management, Morocco
                </p>
              </div>
              <div className="mt-auto inline-flex self-start px-4 py-2 border border-accent/30 bg-accent/10 rounded-full">
                <span className="text-xs font-semibold text-accent tracking-wider uppercase">
                  Specialization: Digital Marketing
                </span>
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Medium Tile: Content Marketing */}
        <motion.div variants={itemVariants} className="lg:col-span-1 border border-transparent">
          <BentoCard 
            className="h-full" 
            glowColor="255, 122, 89"
            onClick={() => setSelectedCert({
              title: "Content Marketing Fundamentals",
              image: "/assets/certificates/Content marketing semrush.JPG"
            })}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff7a59]/20 to-transparent border border-[#ff7a59]/20 flex items-center justify-center text-[#ff7a59]">
                  <Megaphone className="w-6 h-6" strokeWidth={2} />
                </div>
              </div>
              <h4 className="font-semibold text-foreground text-lg mb-1 leading-snug">Content Marketing</h4>
              <p className="text-sm text-muted mt-auto">Semrush Academy</p>
            </div>
          </BentoCard>
        </motion.div>

        {/* Medium Tile: Marketing Strategy */}
        <motion.div variants={itemVariants} className="lg:col-span-1 text-left">
          <BentoCard 
            className="h-full" 
            glowColor="0, 119, 181"
            onClick={() => setSelectedCert({
              title: "LinkedIn Marketing Strategy",
              image: "/assets/certificates/Linkedin marketing strategy.JPG"
            })}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0077b5]/20 to-transparent border border-[#0077b5]/20 flex items-center justify-center text-[#0077b5]">
                  <Compass className="w-6 h-6" strokeWidth={2} />
                </div>
              </div>
              <h4 className="font-semibold text-foreground text-lg mb-1 leading-snug">Marketing Strategy</h4>
              <p className="text-sm text-muted mt-auto">LinkedIn Learning</p>
            </div>
          </BentoCard>
        </motion.div>

        {/* Wide Tile: DDB Talent Factory */}
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
          <BentoCard 
            className="h-full" 
            glowColor="255, 215, 0"
            onClick={() => setSelectedCert({
              title: "DDB Talent Factory Finalist",
              image: "/assets/certificates/ddb talent.jpg"
            })}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 h-full">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-transparent border border-yellow-400/30 flex items-center justify-center text-yellow-500 shadow-inner">
                    <Award className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1 tracking-tight">
                    DDB Talent Factory — Finalist
                  </h4>
                  <p className="text-sm text-muted">Tribal DDB, Casablanca</p>
                </div>
              </div>
              <div className="md:text-right hidden sm:block">
                <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted/80 tracking-widest font-mono">
                  FEB 2025
                </span>
              </div>
            </div>
          </BentoCard>
        </motion.div>
        
        {/* Medium Tile: Digital Advertising */}
        <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-1">
          <BentoCard 
            className="h-full" 
            glowColor="164, 53, 240"
            onClick={() => setSelectedCert({
              title: "Digital Advertising Mastery",
              image: "/assets/certificates/Digital advertising course.JPG"
            })}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a435f0]/20 to-transparent border border-[#a435f0]/20 flex items-center justify-center text-[#a435f0]">
                  <BarChart3 className="w-6 h-6" strokeWidth={2} />
                </div>
              </div>
              <h4 className="font-semibold text-foreground text-lg mb-1 leading-snug">Digital Advertising Mastery</h4>
              <p className="text-sm text-muted mt-auto">Udemy</p>
            </div>
          </BentoCard>
        </motion.div>
      </motion.div>

      <CertificateModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        imageSrc={selectedCert?.image || ""}
        title={selectedCert?.title || ""}
      />
    </>
  );
}
