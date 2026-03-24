"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectMetricsDashboardProps {
  project: Project;
}

// Interactive 3D Card Hover Component
function TiltCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse position to rotation (smaller tilt for the entire large container)
  const rotateX = useTransform(mouseYSpring, [0, 1], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-2deg", "2deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function ProjectMetricsDashboard({ project }: ProjectMetricsDashboardProps) {
  // If no metrics, don't render this component
  if (!project.metrics || project.metrics.length === 0) return null;

  return (
    <section className="pt-0 pb-20 md:pt-0 md:pb-28">
      <div className="max-w-5xl mx-auto px-6 md:px-12 perspective-[2000px]">
        
        {/* Dashboard Container - Glassmorphic Dark Theme */}
        <TiltCard className="relative rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-accent/20 blur-[100px] rounded-[100%] pointer-events-none opacity-50" />

          {/* Top Section - Title & Separator */}
          <div className="relative z-10 mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
            <div className="flex items-center gap-6">
              {project.logo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="relative w-16 h-16 md:w-20 md:h-20"
                >
                  <Image 
                    src={project.logo} 
                    alt={`${project.title} Logo`} 
                    fill
                    className="rounded-full object-cover bg-white p-1 shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
                  />
                </motion.div>
              )}
              
              <div>
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2 block"
                >
                  Key Results
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl md:text-3xl font-medium text-white tracking-tight"
                >
                  {project.title}
                </motion.h2>
              </div>
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="flex items-center gap-6 text-sm text-foreground/60 font-medium"
            >
              <div className="flex flex-col">
                <span className="text-white/40 uppercase tracking-widest text-[10px] mb-1">Category</span>
                <span className="text-white">{project.category}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white/40 uppercase tracking-widest text-[10px] mb-1">Year</span>
                <span className="text-white">{project.year}</span>
              </div>
            </motion.div>
          </div>

          {/* Statistics Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {project.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/5"
              >
                <h3 className="relative z-10 text-xl font-bold text-white mb-2 tracking-tight">
                  {metric.value}
                </h3>
                <p className="relative z-10 text-sm focus:outline-none text-foreground/70 font-medium tracking-wide">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Optional Action Area (Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative z-10 mt-10 pt-8 border-t border-white/10 flex justify-end"
          >
            <a 
              href="#project-media"
              onClick={(e) => {
                e.preventDefault();
                const mediaSection = document.getElementById('project-media');
                if (mediaSection) {
                  mediaSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-all border border-white/10"
            >
              View Project Media
              <ArrowUpRight size={16} className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

        </TiltCard>
      </div>
    </section>
  );
}
