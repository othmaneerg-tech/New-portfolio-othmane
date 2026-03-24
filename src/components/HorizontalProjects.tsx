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

  const [itemWidth, setItemWidth] = useState(400);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 640) {
        setItemWidth(window.innerWidth - 48); // Full width minus padding
      } else if (window.innerWidth < 1024) {
        setItemWidth(400);
      } else {
        setItemWidth(500);
      }
    };
    
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gap = 32; // 2rem

  // Calculate the distance from the very start of the flexible track to the center of the last item.
  // The track starts with:
  // 1. An initial spacer
  // 2. n-1 items + gaps
  // 3. The 1/2 of the last item

  const initialSpacerWidth = windowWidth >= 1024 
    ? (windowWidth - 1280) / 2 + 48 
    : (windowWidth >= 768 ? 48 : 24);

  // Distance from the start of the first card to the left edge of the last card
  const distanceToLastCardLeftEdge = (projects.length - 1) * (itemWidth + gap);
  
  // Total width from the very start of the track to the left edge of the last card
  const totalWidthToLastCard = initialSpacerWidth + distanceToLastCardLeftEdge;

  // We want the center of the last card to align with the center of the viewport.
  // The center of the last card relative to the start of the track is:
  const centerOfLastCardPos = totalWidthToLastCard + (itemWidth / 2);

  // To put that point in the center of the viewport, the track must shift left by:
  // Shift = centerOfLastCardPos - (windowWidth / 2)
  const totalScrollDistance = centerOfLastCardPos - (windowWidth / 2);

  const scrollableDistance = Math.max(0, totalScrollDistance);

  const xTranslation = useTransform(scrollYProgress, [0, 1], [0, Number.isNaN(scrollableDistance) ? 0 : -scrollableDistance]);
  
  const x = useSpring(xTranslation, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  return (
    <div id="projects" className="relative group/projects">
      {/* Intro section that scrolls normally */}
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

      {/* The scrolling container */}
      <div 
        ref={containerRef} 
        // Increased from 300vh to 500vh to slow down the horizontal scrolling speed
        className="h-[500vh] relative horizontal-scroll-container"
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          {/* We add a left padding equal to the container margin to align the first item nicely */}
          <motion.div 
            className="flex will-change-transform"
            style={{ 
              x,
              translateZ: 0,
              backfaceVisibility: "hidden",
            }}
          >
            {/* Initial spacing spacer */}
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
            
            {/* End spacing spacer - increased to allow scrolling past the last item slightly if needed, though the math controls the actual stop point */}
            <div className="shrink-0 w-[50vw] transition-all" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
