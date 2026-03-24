"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Maximize2, X, Lock, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Lightbox from "@/components/Lightbox";
import PhoneMockup from "@/components/PhoneMockup";
import MacbookMockup from "@/components/MacbookMockup";
import ProjectMetricsDashboard from "@/components/ProjectMetricsDashboard";
import type { Project } from "@/data/projects";

export default function ProjectPageClient({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Hide button when footer is visible
  useEffect(() => {
    if (project.slug !== "tribal-ddb-challenge") return;

    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [project.slug]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const breakpointColumnsObj = {
    default: 2,
    768: 1
  };

  return (
    <article>
      {/* Hero */}
      <section className="relative pt-32 pb-10 md:pt-44 md:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(41,151,255,0.1)_0%,_transparent_50%)]" />

        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8 group"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to Projects
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4"
          >
            {project.category} · {project.year}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] mb-6 leading-[1.05]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Project KPI Dashboard / Results Section */}
      {project.metrics && project.metrics.length > 0 ? (
        <ProjectMetricsDashboard project={project} />
      ) : (
        <section className="border-y border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="py-8 flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-16"
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-muted block mb-1">
                  Key Results
                </span>
                <span className="text-2xl md:text-3xl font-bold text-emerald-400">
                  {project.results}
                </span>
              </div>
              <div className="h-10 w-px bg-border hidden md:block" />
              <div>
                <span className="text-xs uppercase tracking-widest text-muted block mb-1">
                  Category
                </span>
                <span className="text-lg font-medium text-foreground">
                  {project.category}
                </span>
              </div>
              <div className="h-10 w-px bg-border hidden md:block" />
              <div>
                <span className="text-xs uppercase tracking-widest text-muted block mb-1">
                  Year
                </span>
                <span className="text-lg font-medium text-foreground">
                  {project.year}
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      <section id="project-media" className="py-20 md:py-28">
        <div className={`mx-auto px-6 md:px-12 ${ (project.slug === 'artgallery-website' || project.slug === 'tribal-ddb-challenge') ? 'max-w-[1400px]' : 'max-w-7xl'}`}>
          {project.slug === "lougha-institute-social-media" ? (
            /* Custom Phone Grid specifically for Lougha's vertical social media posts */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full justify-items-center">
              {/* Render Phones for all Videos */}
              {project.videos?.map((vid, i) => (
                <AnimatedSection key={`vid-${i}`} delay={i * 0.1}>
                  <div className="relative group transition-transform duration-500 hover:scale-[1.02]">
                    <PhoneMockup videoUrl={vid} />
                  </div>
                </AnimatedSection>
              ))}
              
              {/* Render Phones for all Images (excluding thumbnail for cleaner UI, but rendering the rest) */}
              {project.images.filter((img) => !img.includes("thumbnail")).map((img, i) => (
                <AnimatedSection key={`img-${i}`} delay={(project.videos?.length || 0) * 0.1 + i * 0.1}>
                  <div 
                    className="relative cursor-pointer interactive group flex justify-center transition-transform duration-500 hover:scale-[1.02]"
                    onClick={() => openLightbox(project.videos ? i + 1 : i)} // Adjust index roughly (won't light box videos anyway)
                  >
                    <PhoneMockup imageUrl={img} />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-[45px] pointer-events-none flex items-center justify-center">
                      <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Maximize2 size={18} />
                        <span>View</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (project.slug === "artgallery-website" || project.slug === "tribal-ddb-challenge" || project.slug === "bcp-internship") ? (
            /* MacBook Mockup Grid for ArtGallery & Tribal DDB website screenshots */
            <div className="flex flex-col items-center w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full justify-items-center">
                {project.images.filter((img) => !img.includes("thumbnail")).map((img, i) => (
                  <AnimatedSection key={`mac-${i}`} delay={i * 0.1} className="w-full">
                    <MacbookMockup imageUrl={img} />
                  </AnimatedSection>
                ))}
              </div>

              {project.galleryCaption && project.slug === "bcp-internship" && (
                <AnimatedSection delay={0.4} className="mt-12 w-full max-w-4xl mx-auto px-4">
                  <div className="relative group overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20 transition-all duration-500 hover:scale-[1.01]">
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-accent/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10 flex items-center gap-4 bg-background/80 backdrop-blur-xl rounded-[15px] p-5 border border-white/5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shadow-[0_0_15px_rgba(41,151,255,0.2)]">
                        <Lock size={20} className="animate-pulse" />
                      </div>
                      <p className="text-muted text-xs md:text-sm font-medium leading-relaxed">
                        <span className="text-accent font-bold uppercase tracking-wider mr-2">Security Notice:</span>
                        {project.galleryCaption}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          ) : (
            /* Standard Masonry Gallery for all other horizontal/mixed aspect ratio projects */
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-6 md:-ml-8 w-auto"
              columnClassName="pl-6 md:pl-8 bg-clip-padding"
            >
              {project.images.map((img, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="mb-6 md:mb-8">
                  <div 
                    className="group relative overflow-hidden rounded-2xl bg-surface cursor-pointer ring-1 ring-border/50 hover:ring-accent/50 transition-all duration-500 interactive"
                    onClick={() => openLightbox(i)}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - Image ${i + 1}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ width: '100%', height: 'auto' }}
                      className="object-cover transform transition-transform duration-700 scale-[1.12] group-hover:scale-[1.2]"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 text-white font-medium bg-black/50 backdrop-blur-md px-6 py-3 rounded-full">
                        <Maximize2 size={18} />
                        <span className="text-sm">Fullscreen Preview</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </Masonry>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        images={project.images}
        initialIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />


      {/* Video Section (Standard landscape only) */}
      {project.videoUrl && project.slug !== "lougha-institute-social-media" && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <AnimatedSection>
              <div className="mb-8 text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
                  Project Video
                </span>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl bg-surface aspect-video border border-border mt-8">
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} video`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {project.videoDescription && (
                <div className="mt-8 text-center">
                  <p className="text-muted italic text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                    &quot;{project.videoDescription}&quot;
                  </p>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Back to projects CTA */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <AnimatedSection>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Like what you see?
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/#projects"
                className="px-8 py-4 border border-border rounded-full text-sm font-medium text-muted hover:text-foreground hover:border-foreground/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← More Projects
              </motion.a>
              <motion.a
                href="/#project-media"
                className="px-8 py-4 bg-accent text-white rounded-full text-sm font-semibold hover:bg-accent-hover transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project Media →
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Floating See Credentials Button — only on Tribal DDB page — hides at footer */}
      {project.slug === "tribal-ddb-challenge" && (
        <>
          <AnimatePresence>
            {!isFooterVisible && (
              <motion.button
                key="credentials-btn"
                onClick={() => setShowCertificate(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-accent/10 border border-accent/40 text-accent text-sm font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(41,151,255,0.2)] hover:bg-accent/20 hover:scale-105 transition-all duration-300"
              >
                <Award size={16} />
                See Credentials
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showCertificate && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setShowCertificate(false)}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-3xl bg-surface/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl p-8 overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-col">
                      <span className="text-sm uppercase tracking-[0.4em] text-accent font-bold mb-2">Achievement Unlocked</span>
                      <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight">DDB Talent Factory</h4>
                    </div>
                    <button 
                      onClick={() => setShowCertificate(false)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors mt-[-4px]"
                    >
                      <X size={32} />
                    </button>
                  </div>
                  
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-black/50 shadow-2xl">
                    <Image 
                      src="/images/projects/tribal-ddb/ddb-talent.jpg" 
                      alt="DDB Talent Certificate" 
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  
                  <div className="mt-8 text-center px-4">
                    <p className="text-lg text-muted/90 leading-relaxed italic font-light">
                      &quot;Finalist certification for the prestigious strategy 360 innovation challenge conducted by Tribal DDB Morocco.&quot;
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </article>
  );
}
