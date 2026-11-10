"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, HeartHandshake, UtensilsCrossed } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure robust autoplay on all mobile & desktop browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in power-saver modes; muted allows autoplay
      });
    }
  }, []);

  const BRAND_HIGHLIGHTS = [
    {
      icon: Flame,
      title: "Freshly Prepared",
      desc: "Flame-carved hot off the spit.",
    },
    {
      icon: Sparkles,
      title: "Premium Ingredients",
      desc: "Whole muscle meat & pure curd.",
    },
    {
      icon: HeartHandshake,
      title: "Loved by Pune",
      desc: "Authentic street taste Pune craves.",
    },
  ];

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#180606] pt-24 pb-14 sm:pt-28 sm:pb-16 lg:py-24">
      {/* Ambient Burgundy Cinematic Lighting Glows */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-brand-burgundy/40 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 -right-40 w-[36rem] h-[36rem] bg-brand-red/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180606]/80 via-transparent to-[#180606]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Balanced Two-Column Split-Screen Grid (50% Left / 50% Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* ========================================================================= */}
          {/* 1. LEFT SIDE – TEXT CONTENT (Strictly Left-Aligned & Vertically Centered)  */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left space-y-5 sm:space-y-6"
          >
            {/* Tagline / Eyebrow Badge (Left-Aligned) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                The Original Shawarma & Lassi
              </span>
            </div>

            {/* Main Heading (Left-Aligned) */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-black tracking-tight uppercase text-white leading-[0.98] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                TASTE THAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-orange to-amber-400">
                  PULLS YOU IN
                </span>
              </h1>
            </div>

            {/* Description (Left-Aligned) */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-200 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Big flavour. Fresh off the grill. From our first shawarma in Pune to your next favourite bite — come hungry.
            </p>

            {/* Action Buttons Group (Left-Aligned) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_6px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all group"
              >
                <UtensilsCrossed className="w-4 h-4 text-neutral-950" />
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-black/60 hover:bg-white/[0.1] border border-white/20 hover:border-amber-400/50 text-neutral-100 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all group"
              >
                <span>Our Story</span>
                <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>

            {/* Small Brand Highlights (Left-Aligned) */}
            <div className="pt-5 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full border-t border-white/10">
              {BRAND_HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-black/45 border border-white/10 backdrop-blur-md text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-400 shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white truncate">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-neutral-400 truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* 2. RIGHT SIDE – VIDEO (Continuous Looping Prominent Food Showcase Video)   */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center w-full"
          >
            {/* Ambient Radial Glow behind the video */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-red/25 via-amber-500/15 to-transparent blur-3xl scale-95 pointer-events-none" />

            {/* Video Wrapper with rounded corners, subtle border and premium shadow */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.2] xl:aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/15 ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-neutral-950 group">
              <video
                ref={videoRef}
                src="/videos/lassi-wassi.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              >
                Your browser does not support the video tag.
              </video>

              {/* Subtle glass reflection & bottom dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl lg:rounded-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
