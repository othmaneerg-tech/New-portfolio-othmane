"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

export default function HorizontalProjects({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [itemWidth, setItemWidth] = useState(400);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsMobile(w < 1024);
      if (w < 640) {
        setItemWidth(w - 48);
      } else if (w < 1024) {
        setItemWidth(400);
      } else {
        setItemWidth(500);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gap = 32;

  const initialSpacerWidth = windowWidth >= 1024 
    ? (windowWidth - 1280) / 2 + 48 
    : (windowWidth >= 768 ? 48 : 24);

  const distanceToLastCardLeftEdge = (projects.length - 1) * (itemWidth + gap);
  const totalWidthToLastCard = initialSpacerWidth + distanceToLastCardLeftEdge;
  const centerOfLastCardPos = totalWidthToLastCard + (itemWidth / 2);
  const totalScrollDistance = centerOfLastCardPos - (windowWidth / 2);
  const scrollableDistance = Math.max(0, totalScrollDistance);

  const xTranslation = useTransform(scrollYProgress, [0, 1], [0, Number.isNaN(scrollableDistance) ? 0 : -scrollableDistance]);
  
  const x = useSpring(xTranslation, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  const headerSection = (
    <section className="pt-8 pb-4 md:pt-10 md:pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4 text-white uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Selected Work
          </h2>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            You&apos;ve seen the background—now discover the impact. A deep dive into my favorite projects, where product strategy, SEO mastery, and performance analytics converge to drive real growth.
          </p>
        </motion.div>
      </div>
    </section>
  );

  // ─── MOBILE: Native horizontal snap scroll ───────────────────────────────
  if (isMobile) {
    return (
      <div id="projects" className="relative group/projects">
        {headerSection}
        <div
          className="flex gap-6 overflow-x-auto pb-8 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="shrink-0 snap-center"
              style={{ width: itemWidth }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── DESKTOP: Framer Motion sticky scroll ────────────────────────────────
  return (
    <div id="projects" className="relative group/projects">
      {headerSection}
      <div ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden z-20">
          <motion.div 
            className="flex will-change-transform"
            style={{ x, translateZ: 0, backfaceVisibility: "hidden" }}
          >
            <div className="shrink-0 w-6 md:w-12 lg:w-[calc((100vw-1280px)/2+48px)] transition-all" />
            {projects.map((project, index) => (
              <div 
                key={project.slug} 
                className="shrink-0"
                style={{ width: itemWidth, marginRight: gap }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
            <div className="shrink-0 w-[50vw] transition-all" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
