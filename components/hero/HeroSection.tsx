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
            {/* Top Pune Street Food Badge - Pure Editorial Typography (No Box / No Border) */}
            <motion.div variants={badgeVariants} className="inline-block max-w-full">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-orange">
                <Flame className="w-3.5 h-3.5 text-brand-orange fill-current shrink-0" />
                <span className="text-neutral-300 hover:text-white transition-colors">Shawarma</span>
                <span className="text-brand-orange/60">•</span>
                <span className="text-neutral-300 hover:text-white transition-colors">Burgers</span>
                <span className="text-brand-orange/60">•</span>
                <span className="text-neutral-300 hover:text-white transition-colors">Lassi</span>
                <span className="text-brand-orange/60">•</span>
                <span className="text-neutral-300 hover:text-white transition-colors">Shakes</span>
                <span className="text-brand-orange/60">•</span>
                <span className="text-brand-orange font-extrabold">Pune</span>
              </div>
            </motion.div>

            {/* Cinematic Main Headline with clamp() & Proper Line Height */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display font-black tracking-tight uppercase text-cream leading-[1.06] sm:leading-[1.02]">
                TASTE THAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-orange to-brand-pink">
                  PULLS YOU IN
                </span>
              </h1>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mt-4 sm:mt-5"
            >
              Freshly made shawarmas, loaded burgers, creamy lassi and more. Street-food energy crafted with restaurant-grade freshness in Pune.
            </motion.p>

            {/* CTAs Row - Pure Minimal Text Links (Zero Boxes / Zero Pill Shapes) */}
            <motion.div
              variants={itemVariants}
              className="pt-3 sm:pt-4 flex flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8"
            >
              <button
                onClick={handleOrderNow}
                className="group inline-flex items-center gap-2.5 py-2 px-1 text-xs sm:text-sm font-black uppercase tracking-widest text-brand-orange hover:text-white transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={handleExploreMenu}
                className="group inline-flex items-center gap-2 py-2 px-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-300 hover:text-brand-orange transition-colors"
              >
                <span>EXPLORE MENU</span>
                <span className="text-brand-orange group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>

            {/* Outlet Quick Highlights Bar - Clean Inline Typography */}
            <motion.div
              variants={itemVariants}
              className="pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-neutral-400"
            >
              <div className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                <span>4 Pune Hubs: <span className="text-white font-medium">Kothrud • Sinhgad Rd • Katraj • Bavdhan</span></span>
              </div>
              <div className="inline-flex items-center gap-1.5">
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
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-brand-surface/60 group">
                <Image
                  src="/images/site/hero-shawarma.webp"
                  alt="Lassi Wassi Authentic Shawarma and Street Food Pune"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 480px"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Clean Editorial Caption (No Box Badges) */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange block">
                      Signature Arabian Recipe
                    </span>
                    <h3 className="text-sm sm:text-lg font-bold text-white tracking-wide mt-0.5">
                      Special Cheese Shawarma
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                      Slow-roasted chicken • Garlic toum • Pita
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-2xl font-display font-black text-brand-orange">
                      ₹160
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
