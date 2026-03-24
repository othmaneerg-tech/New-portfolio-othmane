"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import ParallaxSection from "@/components/ParallaxSection";
import HorizontalProjects from "@/components/HorizontalProjects";
import ToolsMarquee from "@/components/ToolsMarquee";
import { projects } from "@/data/projects";
import GlowPillLink from "@/components/GlowPillLink";
import LightBulbLink from "@/components/LightBulbLink";
import { Mail, Linkedin } from "lucide-react";
import EducationBentoGrid from "@/components/EducationBentoGrid";
import BentoCard from "@/components/BentoCard";
import LayeredGallery from "@/components/LayeredGallery";
import RollingText from "@/components/RollingText";
import HoverTextGlow from "@/components/HoverTextGlow";
import SalaryComparison from "@/components/SalaryComparison";
import SalarySpinWheel from "@/components/SalarySpinWheel";
import AnimatedEdgeGlow from "@/components/AnimatedEdgeGlow";
import BonusEasterEgg from "@/components/BonusEasterEgg";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [hoveredOrg, setHoveredOrg] = useState<string | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Mouse Parallax for Hero Background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], ["-2%", "2%"]);

  // Custom Cursor Hover Classes
  const interactiveProps = {
    onMouseEnter: () => document.body.classList.add("hovering"),
    onMouseLeave: () => document.body.classList.remove("hovering"),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], ["0%", "20%"]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(10px)"]);

  return (
    <>
      {/* ════════════════════ HERO ════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated gradient background with mouse parallax and scroll blur */}
        <motion.div
          className="absolute inset-[-5%] z-0"
          style={{ x: bgX, y: bgY, filter: heroBlur }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(41,151,255,0.12)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(41,151,255,0.06)_0%,_transparent_40%)]" />

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.025]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-20"
        >
          {/* Left Side: Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="text-center md:text-left">
              <span className="inline-block text-xs md:text-sm uppercase tracking-[0.3em] text-accent mb-6 md:mb-8 font-medium">
                Digital Marketing &middot; Strategy &middot; Content
              </span>
            </div>

            <div className="mb-6 md:mb-8 flex flex-col items-center md:items-start">
              <RollingText 
                text="Othmane" 
                fontSize="clamp(3rem, 10vw, 8rem)"
                className="hero-name py-2"
                rollDuration={1.5}
                staggerDelay={0.08}
              />
              <RollingText 
                text="El Rhareg" 
                fontSize="clamp(3rem, 10vw, 8rem)"
                className="hero-name py-2"
                rollDuration={1.5}
                staggerDelay={0.08}
              />
            </div>

            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Digital marketing graduate specialized in product marketing, digital strategy, and performance analysis — combining market insight, creativity, and data to drive measurable business impact.
            </p>
          </div>

          {/* Right Side: Layered Gallery */}
          <div className="flex-1 hidden md:flex relative justify-center items-center h-[700px]">
            {/* The Background Glow */}
            <div className="absolute w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[130px] animate-pulse" />

            <div className="relative w-full h-full z-10">
              <LayeredGallery 
                cardWidth={280} 
                cardHeight={560} 
                spacingX={30} 
                spacingY={15} 
                borderRadius={40}
                images={[
                  { src: "/assets/hero/Phone1.png", alt: "Phone Showcase 1" },
                  { src: "/assets/hero/Phone2.png", alt: "Phone Showcase 2" },
                  { src: "/assets/hero/Phone3.png", alt: "Phone Showcase 3" },
                ]}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════ ABOUT ════════════════════ */}
      <section id="about" ref={aboutRef} className="pt-24 pb-12 px-6 relative overflow-hidden flex flex-col items-center justify-center bg-[#050505]">
        {/* Animated background parallax maintained from previous version */}
        <motion.div
          className="absolute inset-[-5%] z-0"
          style={{ x: bgX, y: bgY }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(41,151,255,0.06)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(41,151,255,0.03)_0%,_transparent_40%)]" />

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.015]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto space-y-12 relative z-10 text-center"
        >
          {/* Massive Header with Synced Architectural Shine */}
          <div className="flex flex-col items-center gap-0">
            <HoverTextGlow 
              text="Where creativity" 
              fontSize="clamp(2rem, 7vw, 4.5rem)"
              className="mb-[-0.3em]"
            />
            <HoverTextGlow 
              text="meets strategy." 
              fontSize="clamp(2rem, 7vw, 4.5rem)"
            />
          </div>

          {/* Breathable Body Text */}
          <div className="space-y-8 text-gray-400 text-xl md:text-3xl font-light leading-relaxed max-w-6xl mx-auto text-balance relative">
            <p>
              Master&apos;s graduate from{" "}
              <motion.span 
                className="text-white font-medium cursor-help border-b border-white/20 hover:border-accent transition-colors"
                onMouseEnter={() => setHoveredOrg('encg')}
                onMouseLeave={() => setHoveredOrg(null)}
              >
                ENCG Beni Mellal
              </motion.span>{" "}
              specializing in Digital Marketing. 
              I bridge the gap between strategic thinking and data-driven execution.
            </p>
            
            <p>
              Forged through experience at{" "}
              <motion.span 
                className="text-white font-medium cursor-help border-b border-white/20 hover:border-accent transition-colors"
                onMouseEnter={() => setHoveredOrg('bp')}
                onMouseLeave={() => setHoveredOrg(null)}
              >
                Banque Populaire HQ
              </motion.span>{" "}
              and{" "}
              <motion.span 
                className="text-white font-medium cursor-help border-b border-white/20 hover:border-accent transition-colors"
                onMouseEnter={() => setHoveredOrg('forase')}
                onMouseLeave={() => setHoveredOrg(null)}
              >
                FORASE Agency
              </motion.span>. 
              I transform complex data into measurable business growth.
            </p>

            {/* Floating Image Component */}
            <AnimatePresence>
              {hoveredOrg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  style={{ 
                    position: 'fixed',
                    left: cursorX,
                    top: cursorY,
                    x: 20,
                    y: -120,
                    pointerEvents: 'none',
                    zIndex: 50
                  }}
                  className="w-64 h-44 md:w-96 md:h-64 rounded-2xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm"
                >
                  {hoveredOrg === 'encg' && (
                    <Image src="/assets/about/encg-beni-mellal.webp" alt="ENCG" fill className="object-cover" />
                  )}
                  {hoveredOrg === 'bp' && (
                    <Image src="/assets/about/Bcp.jpg" alt="Banque Populaire" fill className="object-cover" />
                  )}
                  {hoveredOrg === 'forase' && (
                    <Image src="/assets/about/forase1.webp" alt="Forase" fill className="object-cover" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skills Row - Scrolling marquee */}
            <div className="relative pt-6 overflow-hidden w-full" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
              <div
                className="flex gap-3 w-max"
                style={{ animation: "marquee-rtl 12s linear infinite" }}
              >
                {["STRATEGY & INSIGHT", "CUSTOMER ENGAGEMENT", "OFFER DEVELOPMENT", "PERFORMANCE GROWTH",
                  "STRATEGY & INSIGHT", "CUSTOMER ENGAGEMENT", "OFFER DEVELOPMENT", "PERFORMANCE GROWTH"].map((skill, i) => (
                  <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-sm uppercase tracking-widest text-white/60 bg-white/5 whitespace-nowrap flex-shrink-0">
                    {skill}
                  </span>
                ))}
              </div>
              <style>{`
                @keyframes marquee-rtl {
                  0%   { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>
            </div>
          </div>
        </motion.div>

        {/* Tools & Tech Marquee maintained for visual flow */}
        <div className="w-full mt-24 md:mt-32 relative z-10">
          <AnimatedSection viewport={{ once: true }}>
            <div className="text-center mb-4">
              <span className="text-2xl md:text-3xl uppercase tracking-[0.4em] text-accent font-bold drop-shadow-[0_0_15px_rgba(41,151,255,0.6)] opacity-40">
                Tools & Technology I use
              </span>
            </div>
            <ToolsMarquee />
          </AnimatedSection>
        </div>
      </section>


      {/* ════════════════════ PROJECTS (HORIZONTAL SCROLL) ════════════════════ */}
      <HorizontalProjects projects={projects} />


      {/* ════════════════════ EXPERIENCE & EDUCATION ════════════════════ */}
      <section id="experience" className="py-32 md:py-44 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(41,151,255,0.06)_0%,_transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <AnimatedSection className="text-center mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">
              Background
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4">
              Experience &amp;<br />
              Education.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-24">
            {/* Left — Work Experience */}
            <AnimatedSection>
              <h3 className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-10">
                Professional Experience
              </h3>
              <div className="space-y-10">
                {[
                  {
                    year: "2026",
                    type: "Personal Project",
                    company: "Portfolio Website",
                    role: "Frontend Developer",
                    desc: "Designed and developed an interactive, high-performance personal portfolio from scratch using Next.js, Framer Motion, and Tailwind CSS. Implemented advanced modern web animations, a custom macOS dock, bento grid layout, and spring-physics hover interactions.",
                  },
                  {
                    year: "2025",
                    type: "Graduation Project",
                    company: "Banque Populaire HQ",
                    role: "Marketing Assistant",
                    desc: "Assisted in the development and evolution of the Business Card product line for SMEs. Designed and analyzed customer satisfaction surveys to evaluate service quality, tracked commercial performance via electronic payment dashboards, and created sales support materials for the BPR network.",
                  },
                  {
                    year: "2024",
                    type: "Internship",
                    company: "FORASE Agency",
                    role: "Content Strategist",
                    desc: "Crafted content strategies rooted in audience data, produced targeted ad copies, fostered community engagement, and ensured brand consistency across all digital touch‑points.",
                  },
                  {
                    year: "2024",
                    type: "Freelance",
                    company: "Organicum",
                    role: "Social Media Manager",
                    desc: "Created captivating social media content for an organic cosmetics brand, aligned posts with brand guidelines, styled product photography, and managed Instagram content strategy.",
                  },
                ].map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="relative pl-8 border-l-2 border-border hover:border-accent/50 transition-colors duration-500"
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent/20 border-2 border-accent" />
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-accent font-bold text-lg">{exp.year}</span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider font-semibold">
                        {exp.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {exp.company}{" "}
                      <span className="text-muted font-normal">· {exp.role}</span>
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">{exp.desc}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right — Education & Certifications (Bento Grid) */}
            <div className="w-full">
              <h3 className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-10 pl-2 lg:pl-0">
                Education &amp; Certifications
              </h3>
              <EducationBentoGrid />
            </div>
          </div>

          {/* Expertise Header */}
          <div className="text-center mb-16">
            <span className="text-accent uppercase text-xs md:text-sm tracking-[0.25em] font-mono block mb-4">What I Do</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Core <span className="text-accent italic font-light drop-shadow-[0_0_10px_rgba(41,151,255,0.4)]">Expertise</span>
            </h2>
          </div>

          {/* Expertise Cards */}
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  step: "01",
                  title: "Social Media Management",
                  desc: "Full account management — content creation, community engagement, growth strategy, and performance analytics across Instagram, Facebook, and more.",
                },
                {
                  step: "02",
                  title: "Product Development & Analysis",
                  desc: "Development and evolution of SME financial products, client satisfaction research, and performance tracking via professional electronic payment dashboards.",
                },
                {
                  step: "03",
                  title: "Automation & Analytics",
                  desc: "Automated workflows with n8n, multi-platform campaign tracking, and data‑driven optimizations that turn metrics into actionable insights.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="p-8 rounded-2xl border border-border bg-surface/40 hover:bg-surface/70 hover:border-accent/20 transition-all duration-300 group hide-cursor-trail"
                >
                  <span className="text-5xl font-bold text-accent/15 group-hover:text-accent/30 transition-colors duration-300 block mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════════ SALARY COMPARISON ════════════════════ */}
      <SalaryComparison />

      {/* ════════════════════ SALARY SPIN WHEEL ════════════════════ */}
      <SalarySpinWheel />

      {/* ════════════════════ BONUS EASTER EGG ════════════════════ */}
      <BonusEasterEgg />
    </>
  );
}
