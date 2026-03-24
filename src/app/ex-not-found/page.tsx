"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, HeartOff, ShieldAlert } from "lucide-react";

export default function ExNotFoundPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold uppercase tracking-widest mb-8">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          Security Breach
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
          ERROR <span className="text-red-500 underline decoration-red-500/30">404</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white/90">
          Low-ROI Asset Deprecated
        </h2>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
             <HeartOff size={80} className="text-red-500" />
          </div>
          
          <p className="text-lg md:text-xl leading-relaxed text-muted font-medium pr-4">
            Actually, this specific project build was reverted due to catastrophic user experience failure. Current portfolio standards are much higher.
          </p>
        </div>

        <Link href="/othmane-unlocked">
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:scale-105 transition-all shadow-xl shadow-white/10 hover:shadow-red-500/20 group cursor-pointer"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Reality
          </motion.div>
        </Link>
      </motion.div>

      <div className="mt-20 text-xs text-muted font-mono tracking-widest uppercase opacity-40">
        System message: Redirecting mental energy to career growth... 100% complete
      </div>
    </main>
  );
}
