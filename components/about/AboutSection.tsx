"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, HeartHandshake, Flame, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const PILLARS = [
    {
      icon: Flame,
      title: "Vertical Spit Roasting",
      desc: "Chicken is freshly marinated in aromatic Mediterranean herbs and slow-carved hot throughout the day. Never frozen patties, never reheated meat.",
    },
    {
      icon: ShieldCheck,
      title: "Scratch-Made Garlic Toum",
      desc: "Our garlic sauce is whipped in-house fresh daily using whole garlic, clean oil, and lemon juice. Thick, airy, and free from commercial fillers.",
    },
    {
      icon: Sparkles,
      title: "Pure Cultured Curd",
      desc: "Our lassis are hand-churned from pure whole-milk curd, topped with dense malai, natural fruit pulps, and rich dry fruits for real comfort.",
    },
    {
      icon: HeartHandshake,
      title: "Pune Food Culture",
      desc: "Crafted for students, late-night foodies, and families looking for high-energy street flavours made in clean, hygienic open kitchens.",
    },
  ];

  return (
    <section id="about" className="relative py-14 sm:py-20 lg:py-24 bg-brand-cream scroll-mt-20 overflow-hidden">
      {/* Ambient burgundy background glow */}
      <div className="absolute top-1/2 -left-20 w-[28rem] h-[28rem] bg-brand-burgundy/30 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[24rem] h-[24rem] bg-brand-burgundy-dark/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Visual Left Showcase with Viewport Reveal */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-brand-surface">
              <Image
                src="/images/site/about-kitchen.webp"
                alt="Lassi Wassi Kitchen and Fresh Preparation"
                fill
                sizes="(max-width: 1024px) 95vw, 480px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

              {/* Floating Pune Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-orange">
                  Pune Heritage & Street Flavour
                </span>
                <h4 className="text-xl font-display uppercase tracking-wide text-white mt-0.5">
                  The Lassi Wassi Standard
                </h4>
                <p className="text-xs text-neutral-300 mt-1">
                  Born from a love for juicy flame-carved shawarma and thick cold drinks, created right here in Maharashtra.
                </p>
              </div>
            </div>

            {/* Accent Corner Glow */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-red/25 blur-3xl pointer-events-none" />
          </motion.div>

          {/* Narrative Right Content with Viewport Reveal */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-2xl text-brand-orange border border-white/15 text-xs font-bold uppercase tracking-widest shadow-[0_2px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-brand-red" /> Our Story & Passion
            </div>

            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-cream leading-tight">
              STREET-FOOD ENERGY, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">
                RESTAURANT-GRADE QUALITY
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              At <b>Lassi Wassi</b>, we believe great street food shouldn’t be a compromise between taste and hygiene. What started with a passion for authentic Arabian slow-roasted chicken shawarmas and rich, hand-churned lassis has grown into Pune&apos;s go-to destination for honest comfort food.
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Every single roll is prepared to order — chicken marinated in Mediterranean spices, roasted on high heat to lock in moisture, wrapped in warm rumali or khubz with scratch-made garlic toum. Paired with chilled sweet lassis, fruit smoothies, or fiery mojitos, every bite is crafted to keep you coming back.
            </p>

            {/* 4 Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="p-4 rounded-xl bg-brand-card/90 border border-white/10 hover:border-brand-red/30 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-red/20 text-brand-red border border-brand-red/35 flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
