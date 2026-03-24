"use client";

import { motion } from "framer-motion";
import { Check, X, Rocket, Zap, Star } from "lucide-react";
import Image from "next/image";

const tiers = [
  {
    name: "Starter",
    description: "Entry-level Othmane. Still dangerous.",
    price: "9,500",
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    features: [
      { text: "Will pretend to understand the CEO's vision during all-hands meetings", included: true },
      { text: "Only cries in the bathroom, never at the desk", included: true },
      { text: "Knows which printer actually works on the first try", included: true },
      { text: "Will not leave for a competitor offering 200dh more.", included: true },
      { text: "Absent only 3 days per month", included: true, highlight: true },
    ],
    buttonText: "Hire Starter Othmane",
    buttonStyle: "bg-surface/50 border border-white/10 hover:bg-white/10 text-white",
    avatar: "/assets/othmane_grad_nobg.png",
  },
  {
    name: "Professional",
    description: "The balanced investment.",
    price: "12,000",
    popular: true,
    icon: <Star className="w-5 h-5 text-purple-400" />,
    features: [
      { text: "Full digital marketing strategy", included: true },
      { text: "Content calendar domination", included: true },
      { text: "SEO + Analytics optimization", included: true },
      { text: "Can turn a small campaign into “buzz dial Instagram”", included: true },
      { text: "Unlimited coffee productivity", included: true },
      { text: "Absent only 1 day per month", included: true, highlight: true },
    ],
    buttonText: "Hire Professional Othmane",
    buttonStyle: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold border-none",
    avatar: "/assets/othmane_suit_nobg.png",
  },
  {
    name: "Enterprise",
    description: "Maximum marketing power.",
    price: "15,000",
    icon: <Rocket className="w-5 h-5 text-emerald-400" />,
    features: [
      { text: "Full marketing ecosystem strategy", included: true },
      { text: "Campaign scaling", included: true },
      { text: "Growth experimentation", included: true },
      { text: "Understands Moroccan trends before they trend", included: true },
      { text: "Professionally disagrees with the client without insulting him", included: true },
      { text: "Launches campaigns faster than people rushing to catch the tramway doors", included: true },
      { text: "Never absent (unless world ends)", included: true, highlight: true },
    ],
    buttonText: "Hire Enterprise Othmane",
    buttonStyle: "bg-surface/50 border border-white/10 hover:bg-white/10 text-white",
    avatar: "/assets/othmane_suit_nobg.png",
  },
];

export default function SalaryComparison() {
  const emailBody = "Salam othmane portfolio dyalk naaaadi, w atbda meana b 15 000 MAD nchaalah o atkhdmm a men dar w btw lkhedma ktbda m3a 12 w tsali m3a 3. Ach ban lik ?";
  const emailBase = `https://mail.google.com/mail/?view=cm&fs=1&to=othmaneelrhareg@gmail.com&body=${encodeURIComponent(emailBody)}`;



  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-4">
            Salary Offers
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Choose your character: Which Othmane is about to make your competitors jealous?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15, 
              }}
              className={`group relative rounded-[2rem] h-full flex flex-col ${
                tier.popular 
                  ? "bg-[#111] border-2 border-purple-500/50 md:-translate-y-4" 
                  : "bg-surface/30 border border-white/5 backdrop-blur-sm"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 transform -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg z-30">
                  Most Popular
                </div>
              )}

              {/* Avatar rendering behind text, clipped by this inner div to save the top badge */}
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none z-0">
                {tier.avatar && (
                  <div className="absolute bottom-16 right-0 w-32 h-32 md:w-40 md:h-40">
                    <Image 
                      src={tier.avatar} 
                      alt="Othmane" 
                      fill
                      className="object-contain object-bottom drop-shadow-2xl opacity-10 md:opacity-20 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col h-full relative z-10 w-full">
                <div className="mb-8 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    {tier.icon}
                    <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                  </div>
                  <p className="text-sm text-muted mb-6 h-10">{tier.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-muted mb-1">MAD / mo</span>
                  </div>
                </div>

                <div className="flex-grow relative z-10">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-4 pb-2 border-b border-white/5">
                    Core Features
                  </div>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className={`text-sm ${feature.highlight ? "font-semibold text-white" : "text-muted"}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`${emailBase}&su=${encodeURIComponent(`Hiring Inquiry: ${tier.name} Tier`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] relative z-20 text-center block ${tier.buttonStyle}`}
                >
                  {tier.buttonText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
