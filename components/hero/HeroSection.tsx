"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, HeartHandshake, UtensilsCrossed } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const BRAND_HIGHLIGHTS = [
    {
      icon: Flame,
      title: "Freshly Prepared",
      desc: "Flame-carved hot off the vertical spit daily.",
    },
    {
      icon: Sparkles,
      title: "Premium Ingredients",
      desc: "Whole muscle meat, scratch toum & pure curd.",
    },
    {
      icon: HeartHandshake,
      title: "Loved by Pune",
      desc: "The authentic street taste Pune craves.",
    },
  ];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#180606] pt-24 pb-16 lg:pt-28 lg:pb-20">
      {/* ========================================================================= */}
      {/* 1. IMMERSIVE SHAWARMA BACKGROUND LAYER (30–40% Opacity, Right-Positioned)  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Shawarma Photo Layer - Blended at 35% Opacity, right-aligned */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/site/hero-shawarma-royale.jpg"
            alt="Lassi Wassi Authentic Shawarma Pune"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] sm:object-[82%_center] lg:object-right opacity-30 lg:opacity-40 transition-transform duration-1000 ease-out scale-100 hover:scale-105"
          />
        </div>

        {/* Deep Burgundy / Maroon Horizontal Blend: Keeps LEFT side pitch dark & clean for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#180606] via-[#180606]/90 to-[#180606]/30 sm:via-[#180606]/85 sm:to-transparent" />

        {/* Mobile Vertical Gradient: Ensures top & text area stay perfectly readable */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#180606] via-[#180606]/85 to-[#180606]/95" />

        {/* Top & Bottom Vignette / Screen Edge Feathers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180606]/90 via-transparent to-[#180606]" />

        {/* Cinematic Radial Accent Lighting: Subtle warm glow radiating from the shawarma on the right */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[46rem] h-[46rem] bg-gradient-radial from-brand-red/20 via-amber-500/10 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-brand-burgundy/30 blur-[160px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT LAYER (Pure 100% Opacity Typography & Highlights)         */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-3xl text-left space-y-6 sm:space-y-8">
          {/* Subtle Brand Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-300/95">
              The Original Shawarma & Lassi
            </span>
          </motion.div>

          {/* Main Cinematic Headline */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight uppercase text-white leading-[0.96]">
              TASTE THAT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-orange to-amber-400">
                PULLS YOU IN
              </span>
            </h1>
          </motion.div>

          {/* Short, Engaging Story Copy */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-neutral-200 max-w-xl font-normal leading-relaxed text-left drop-shadow-sm"
          >
            Big flavour. Fresh off the grill. From our first shawarma in Pune to your next favourite bite — come hungry.
          </motion.p>

          {/* Primary Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-neutral-950 text-sm sm:text-base font-black uppercase tracking-wider shadow-[0_6px_30px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_36px_rgba(245,158,11,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all group"
            >
              <UtensilsCrossed className="w-4 h-4 text-neutral-950" />
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-amber-400/40 text-neutral-200 hover:text-white text-sm sm:text-base font-bold uppercase tracking-wider backdrop-blur-md transition-all group"
            >
              <span>Our Story</span>
              <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Small Brand Highlights: Freshly Prepared | Premium Ingredients | Loved by Pune */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-white/10"
          >
            {BRAND_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm"
                >
                  <div className="p-2 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
