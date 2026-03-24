"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ 
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <motion.span
                className="text-base md:text-lg font-semibold tracking-tight text-foreground"
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                Othmane&apos;s{" "}
                <span className="text-accent font-bold">Portfolio</span>
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <div 
              className="hidden md:flex items-center gap-2"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-muted hover:text-foreground transition-colors duration-300 interactive z-10"
                  onMouseEnter={() => setHoveredLink(link.href)}
                >
                  <span className="relative z-10">{link.label}</span>
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full z-0 pointer-events-none"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <div className="pl-4">
                <motion.a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=othmaneelrhareg@gmail.com&su=Portfolio%20Contact&body=${encodeURIComponent("Salam othmane portfolio dyalk naaaadi, w atbda meana b 15 000 MAD nchaalah o atkhdmm a men dar w btw lkhedma ktbda m3a 12 w tsali m3a 3. Ach ban lik ?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-5 py-2.5 bg-accent text-white rounded-full font-medium hover:bg-accent-hover transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.a>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 bg-foreground"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-foreground"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 bg-foreground"
              />
            </button>
          </div>
        </div>

      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-semibold text-foreground hover:text-accent transition-colors"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
              <motion.a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=othmaneelrhareg@gmail.com&su=Portfolio%20Contact&body=${encodeURIComponent("Salam othmane portfolio dyalk naaaadi, w atbda meana b 15 000 MAD nchaalah o atkhdmm a men dar w btw lkhedma ktbda m3a 12 w tsali m3a 3. Ach ban lik ?")}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-lg px-8 py-3 bg-accent text-white rounded-full font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
