import LightBulbLink from "./LightBulbLink";
import { Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-purple-500/30 bg-background shadow-[0_-10px_40px_-15px_rgba(168,85,247,0.3)]">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="w-full px-6 md:px-12 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-6">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              Othmane&apos;s <span className="text-purple-500 font-bold drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">Portfolio</span>
            </span>
            <p className="text-sm md:text-base text-muted/90 font-medium italic">
              Digital strategist. Data‑driven marketer.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-sm text-muted hover:text-foreground transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-sm text-muted hover:text-foreground transition-colors duration-300"
            >
              Projects
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=othmaneelrhareg@gmail.com&su=Portfolio%20Contact&body=${encodeURIComponent("Salam othmane portfolio dyalk naaaadi, w atbda meana b 15 000 MAD nchaalah o atkhdmm a men dar w btw lkhedma ktbda m3a 12 w tsali m3a 3. Ach ban lik ?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/60">
            &copy; 2026 Othmane El Rhareg. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <LightBulbLink
              href="https://mail.google.com/mail/?view=cm&fs=1&to=othmaneelrhareg@gmail.com"
              isExternal
              icon={<Mail className="w-5 h-5" strokeWidth={1.5} />}
              activeColor="#a855f7" // Purple (purple-500)
              className="w-full md:w-auto text-purple-400"
            >
              othmaneelrhareg@gmail.com
            </LightBulbLink>
            
            <LightBulbLink
              href="https://www.linkedin.com/in/el-rhareg-othmane"
              isExternal
              icon={<Linkedin className="w-5 h-5" strokeWidth={1.5} />}
              activeColor="#db2777" // Pink glow (pink-600)
              className="w-full md:w-auto"
            >
              LinkedIn Profile
            </LightBulbLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
