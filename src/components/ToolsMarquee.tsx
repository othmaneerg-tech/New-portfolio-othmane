"use client";

import { motion } from "framer-motion";

const tools = [
  { name: "Figma", image: "https://www.google.com/s2/favicons?domain=figma.com&sz=256" },
  { name: "WordPress", image: "https://www.google.com/s2/favicons?domain=wordpress.org&sz=256" },
  { name: "SemRush", image: "https://www.google.com/s2/favicons?domain=semrush.com&sz=256" },
  { name: "Analytics", image: "https://www.google.com/s2/favicons?domain=analytics.google.com&sz=256" },
  { name: "Canva", image: "https://www.google.com/s2/favicons?domain=canva.com&sz=256" },
  { name: "CapCut", image: "https://www.google.com/s2/favicons?domain=capcut.com&sz=256" },
  { name: "VN Editor", image: "/assets/tools/vn_editor.png" },
  { name: "n8n", image: "https://www.google.com/s2/favicons?domain=n8n.io&sz=256" },
  { name: "Antigravity", image: "https://avatars.githubusercontent.com/u/1342004?s=200&v=4" },
  { name: "Office", image: "https://www.google.com/s2/favicons?domain=office.com&sz=256" },
  { name: "Meta", image: "https://www.google.com/s2/favicons?domain=meta.com&sz=256" },
  { name: "HubSpot", image: "https://www.google.com/s2/favicons?domain=hubspot.com&sz=256" },
  { name: "Ads", image: "https://www.google.com/s2/favicons?domain=ads.google.com&sz=256" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.3, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    }
  },
};

function DockItem({ tool }: { tool: { name: string; image: string } }) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative flex flex-col items-center justify-center cursor-pointer min-w-[5rem] md:min-w-[6rem] gap-3 group"
    >
      <motion.div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
        <motion.img 
          src={tool.image} 
          alt={tool.name}
          whileHover={{ scale: 1.25, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative z-10 w-full h-full object-contain drop-shadow-md rounded-[18%]"
        />
      </motion.div>
      <span className="text-[10px] md:text-xs font-semibold tracking-wider uppercase text-muted transition-colors duration-300 group-hover:text-foreground text-center">
        {tool.name}
      </span>
    </motion.div>
  );
}

export default function ToolsMarquee() {
  return (
    <div className="w-full flex justify-center pt-12 pb-2 overflow-visible">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto flex flex-wrap justify-center items-end gap-x-4 gap-y-8 md:gap-x-6 px-4 py-8"
      >
        {tools.map((tool, i) => (
          <DockItem key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </motion.div>
    </div>
  );
}
