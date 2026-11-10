"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, UtensilsCrossed } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface SignatureCard {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  accent: string;
}

const SIGNATURE_ITEMS: SignatureCard[] = [
  {
    title: "SIGNATURE SHAWARMA",
    subtitle: "Flame-Carved Rotisserie",
    image: "/images/site/sig-shawarma.webp",
    href: "/menu?category=SHAWARMA",
    accent: "from-brand-red to-brand-orange",
  },
  {
    title: "BURGERS",
    subtitle: "Loaded & Crispy",
    image: "/images/site/sig-burgers.webp",
    href: "/menu?category=BURGERS",
    accent: "from-brand-orange to-amber-500",
  },
  {
    title: "LASSI",
    subtitle: "Hand-Churned Whole Curd",
    image: "/images/site/sig-lassi.webp",
    href: "/menu?category=LASSI",
    accent: "from-amber-400 to-yellow-500",
  },
  {
    title: "SHAKES",
    subtitle: "Thick & Ice-Cold",
    image: "/images/site/sig-shakes.webp",
    href: "/menu?category=THICK+SHAKE",
    accent: "from-brand-red to-brand-pink",
  },
];

export default function SignatureHighlights() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-[#140505] border-t border-b border-white/[0.08] overflow-hidden">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[34rem] h-[34rem] bg-brand-burgundy/20 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30rem] h-[30rem] bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Our Signature Crafts</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-wider text-white">
            FOUR PILLARS OF TASTE
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Tap any category to explore the verified Pune menu.
          </p>
        </div>

        {/* Four Cards Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SIGNATURE_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={item.href}
                className="group relative block aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 hover:border-amber-400/50 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(245,158,11,0.2)]"
              >
                {/* Food Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Gradient Vignette Overlays: Keeps text prominent and food appetizing */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Card Content (NO prices, NO lengthy descriptions) */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-amber-400/90 drop-shadow-sm">
                    {item.subtitle}
                  </span>

                  <h3 className="text-base sm:text-xl lg:text-2xl font-display font-black uppercase tracking-wider text-white mt-0.5 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                    <span>View Menu</span>
                    <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Small Explore Full Menu CTA Button */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400/15 via-amber-500/10 to-amber-400/5 hover:from-amber-400/25 hover:via-amber-500/20 border border-amber-400/40 hover:border-amber-400/80 text-amber-300 hover:text-white text-xs sm:text-sm font-black uppercase tracking-wider backdrop-blur-xl shadow-[0_8px_30px_rgba(245,158,11,0.18),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-[0.98] transition-all group"
          >
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span>Explore Full Menu (17 Categories)</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
