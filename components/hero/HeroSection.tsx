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
    <section className="relative min-h-[85vh] sm:min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#180606] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
      {/* ========================================================================= */}
      {/* 1. FULL-SECTION SHAWARMA BACKGROUND (45–55% VISIBILITY ON DESKTOP & MOBILE) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Full-width food photo, positioned to show the appetizing chicken wraps */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/site/hero-shawarma-royale.jpg"
            alt="Lassi Wassi Authentic Shawarma"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-[75%_center] lg:object-[80%_center] opacity-50 sm:opacity-55 transition-transform duration-1000 ease-out scale-100"
          />
        </div>

        {/* Smooth burgundy gradient - NOT heavy, leaves food clearly recognizable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#180606]/85 via-[#180606]/60 to-[#180606]/40" />

        {/* Top & bottom subtle feathering */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180606]/80 via-transparent to-[#180606]" />

        {/* Subtle radial ambient warmth centered behind the content */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] bg-brand-burgundy/25 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTER-ALIGNED BALANCED HERO CONTENT LAYER                             */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md mb-4 sm:mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
            The Original Shawarma & Lassi
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 max-w-3xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-black tracking-tight uppercase text-white leading-[0.98] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            TASTE THAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-orange to-amber-400">
              PULLS YOU IN
            </span>
          </h1>
        </motion.div>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 text-sm sm:text-lg md:text-xl text-neutral-100 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          Big flavour. Fresh off the grill. From our first shawarma in Pune to your next favourite bite — come hungry.
        </motion.p>

        {/* Action Buttons Group */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_6px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all group"
          >
            <UtensilsCrossed className="w-4 h-4 text-neutral-950" />
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-black/60 hover:bg-white/[0.1] border border-white/20 hover:border-amber-400/50 text-neutral-100 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all group"
          >
            <span>Our Story</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </motion.div>

        {/* Small Brand Highlights */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl pt-6 border-t border-white/10"
        >
          {BRAND_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-left"
              >
                <div className="p-1.5 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-400 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-neutral-300 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
