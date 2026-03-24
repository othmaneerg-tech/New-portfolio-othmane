"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: 1000 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/projects/${project.slug}`} className="group block interactive">
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-surface border border-border/50 hover:border-accent/30 transition-all duration-500 aspect-[4/3]"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {/* Image */}
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-[1.12] group-hover:scale-[1.2]"
            loading="lazy"
          />

          {/* Gradient overlay — stronger for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-1">
              <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-2 px-2 py-0.5 bg-accent/10 rounded-full backdrop-blur-sm">
                {project.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                {project.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-emerald-400">
                  {project.results}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted/40" />
                <span className="text-xs text-muted">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Arrow CTA */}
            <div className="mt-4 flex items-center gap-2 text-sm text-white/0 group-hover:text-white transition-all duration-500 overflow-hidden">
              <motion.span 
                className="inline-block"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transform: "translateZ(30px)" }} // Pop out in 3D
              >
                View Project
              </motion.span>
              <svg
                className="w-4 h-4 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
