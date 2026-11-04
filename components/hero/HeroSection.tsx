"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Flame, Sparkles, MapPin, PhoneCall } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useOrder } from "@/context/OrderContext";
import { analyticsEvents } from "@/lib/analytics";
import { DISPLAY_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function HeroSection() {
  const { setIsOrderModalOpen } = useOrder();
  const shouldReduceMotion = useReducedMotion();

  const handleOrderNow = () => {
    analyticsEvents.orderNowClick("hero_primary");
    setIsOrderModalOpen(true);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cinematic staggered container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -16, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const foodVisualVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark-burgundy pt-20 pb-16">
      {/* Cinematic Dark Background with Ambient Gradients */}
      <div className="absolute inset-0 bg-gradient-hero z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(16,13,13,0.75)_100%)] z-10 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-burgundy/40 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-brand-burgundy/25 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-brand-burgundy-light/20 rounded-full blur-[180px] pointer-events-none" />

      {/* Floating Ambient Spice / Flame Dots */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-brand-orange opacity-40 animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-brand-red opacity-30 animate-float-reverse" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-brand-pink opacity-40 animate-float-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bold Typography & CTAs with Staggered Entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Top Pune Street Food Badge */}
            <motion.div variants={badgeVariants} className="inline-block max-w-full">
              <div className="group relative inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-brand-card/95 via-[#230d0d]/90 to-brand-card/95 border border-white/10 hover:border-brand-orange/30 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300">
                {/* Subtle ambient warm ember pip */}
                <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-gradient-to-br from-brand-red/25 via-brand-orange/20 to-transparent border border-brand-red/40 text-brand-orange shrink-0 shadow-sm">
                  <Flame className="w-3 h-3 text-brand-orange fill-current" />
                </span>

                {/* Typographic categories */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-[10px] sm:text-xs font-bold tracking-wide sm:tracking-wider uppercase text-cream/90">
                  <span className="hover:text-white transition-colors">Shawarma</span>
                  <span className="text-brand-orange/60 font-black">•</span>
                  <span className="hover:text-white transition-colors">Burgers</span>
                  <span className="text-brand-orange/60 font-black">•</span>
                  <span className="hover:text-white transition-colors">Lassi</span>
                  <span className="text-brand-orange/60 font-black">•</span>
                  <span className="hover:text-white transition-colors">Shakes</span>
                  <span className="text-brand-orange/60 font-black">•</span>
                  <span className="text-brand-orange hover:text-brand-orange-light font-extrabold transition-colors">Pune</span>
                </div>
              </div>
            </motion.div>

            {/* Cinematic Main Headline with Staggered Line Reveal */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-black tracking-tight uppercase text-cream leading-[0.92]">
                TASTE THAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-orange to-brand-pink">
                  PULLS YOU IN
                </span>
              </h1>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-xl text-neutral-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Freshly made shawarmas, loaded burgers, creamy lassi and more. Street-food energy crafted with restaurant-grade freshness in Pune.
            </motion.p>

            {/* CTAs Row */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4"
            >
              <button
                onClick={handleOrderNow}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-brand-red/25 hover:bg-brand-red/35 active:bg-brand-red/40 text-white font-black text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase shadow-[0_4px_24px_rgba(229,9,20,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] border border-brand-red/45 hover:border-brand-red/70 backdrop-blur-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 group"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_rgba(229,9,20,0.9)] group-hover:scale-125 transition-transform" />
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExploreMenu}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-cream font-bold text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase transition-all transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                EXPLORE MENU
              </button>
            </motion.div>

            {/* Outlet Quick Highlights Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs text-neutral-300"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                <span>4 Pune Hubs: <b>Kothrud</b> • <b>Sinhgad Rd</b> • <b>Katraj</b> • <b>Bavdhan</b></span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: <b className="text-white">{DISPLAY_WHATSAPP_NUMBER}</b></span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase with Cinematic Parallax / Floating */}
          <motion.div
            variants={foodVisualVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Glowing Backdrop Circle */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-brand-red/25 via-brand-orange/15 to-transparent blur-3xl scale-95 pointer-events-none" />

            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-md sm:max-w-lg aspect-square"
            >
              {/* Main Food Imagery Ring */}
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-card-depth bg-brand-surface/60 group">
                <Image
                  src="/images/site/hero-shawarma.webp"
                  alt="Lassi Wassi Authentic Shawarma and Street Food Pune"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 480px"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Minimal Sleek Floating Tag over Image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-6 sm:left-6 sm:right-6 p-2.5 sm:p-4 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="min-w-0 pr-2">
                    <span className="hidden sm:block text-[10px] uppercase font-bold tracking-wider text-brand-orange">
                      Signature Arabian Recipe
                    </span>
                    <h3 className="text-xs sm:text-lg font-bold text-white tracking-wide truncate">
                      Special Cheese Shawarma
                    </h3>
                    <p className="hidden sm:block text-xs text-neutral-400 mt-0.5">
                      Slow-roasted chicken • Garlic toum • Pita
                    </p>
                  </div>
                  <div className="text-right shrink-0 flex items-center sm:flex-col sm:items-end gap-1.5 sm:gap-0">
                    <span className="text-base sm:text-2xl font-display font-black text-white">
                      ₹160
                    </span>
                    <span className="inline-block px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                      Bestseller
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Chip Top Left - Desktop Only */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="hidden sm:flex absolute -top-6 -left-6 px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] items-center gap-2.5"
              >
                <span className="p-2 rounded-lg bg-brand-red/20 text-brand-red shrink-0 border border-brand-red/30">
                  <Flame className="w-4 h-4 fill-current" />
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase text-white">Carved Fresh Daily</div>
                  <div className="text-[10px] text-neutral-400">100% Whole Muscle Meat</div>
                </div>
              </motion.div>

              {/* Floating Chip Bottom Right - Desktop Only */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="hidden sm:flex absolute -bottom-6 -right-6 px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] items-center gap-2.5"
              >
                <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 border border-amber-500/30">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase text-white">Thick Hand-Churned</div>
                  <div className="text-[10px] text-neutral-400">Sweet & Mango Lassis</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
