"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Flame, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useOrder } from "@/context/OrderContext";

interface SignatureCard {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  priceNote: string;
  image: string;
  badge: string;
  categoryFilterId: string;
  ingredients: string[];
}

const SIGNATURES: SignatureCard[] = [
  {
    id: "sig-shawarma",
    category: "Street-Food Core",
    title: "Arabian Shawarma",
    tagline: "Slow-roasted chicken, house garlic toum, warm rumali & khubz.",
    description:
      "Marinated chicken thigh layered with Mediterranean spices, carved tender right off the vertical spit, rolled with authentic garlic cream and crunchy pickles.",
    priceNote: "Starting from ₹100",
    image: "/images/site/sig-shawarma.webp",
    badge: "Pune's #1 Craving",
    categoryFilterId: "SHAWARMA",
    ingredients: ["Spit-Roast Chicken", "Garlic Toum", "Pickles", "Warm Rumali"],
  },
  {
    id: "sig-burgers",
    category: "Loaded Crunch",
    title: "Gourmet Burgers",
    tagline: "Ultra-crispy zinger fillets, double melted cheese & brioche buns.",
    description:
      "Bold street burgers stacked high with crunch chicken fillets, Mexican salsa, creamy chipotle, and signature Shawarma Burger fusion recipes.",
    priceNote: "Starting from ₹110",
    image: "/images/site/sig-burgers.webp",
    badge: "Stacked & Loaded",
    categoryFilterId: "BURGERS",
    ingredients: ["Crispy Fillet", "Cheddar Melt", "House Chipotle", "Toasted Bun"],
  },
  {
    id: "sig-lassi",
    category: "The Heritage",
    title: "Creamy Churned Lassi",
    tagline: "Pure curd, malai layer, dry fruits & secret aromatic saffron essence.",
    description:
      "Hand-churned thick yogurt drinks honoring Maharashtra's sweet tooth — from classic Sweet Lassi and Ratnagiri Alphonso Mango to the legendary Lassi Wassi Secret.",
    priceNote: "Starting from ₹70",
    image: "/images/site/sig-lassi.webp",
    badge: "Zero Dilution",
    categoryFilterId: "LASSI",
    ingredients: ["Pure Churned Curd", "Thick Malai", "Alphonso Pulp", "Roasted Nuts"],
  },
  {
    id: "sig-shakes",
    category: "Decadent Chill",
    title: "Rich Thick Shakes",
    tagline: "Belgium dark chocolate, mud coffee, Ferrero Rocher & brownies.",
    description:
      "Thick enough to eat with a spoon! Blended with rich ice cream, fudge ganache, nutty pralines, and whole brownies for the ultimate late-night treat.",
    priceNote: "Starting from ₹120",
    image: "/images/site/sig-shakes.webp",
    badge: "Extra Heavy",
    categoryFilterId: "THICK SHAKE",
    ingredients: ["Dark Cocoa Ganache", "Ferrero Praline", "Fudgy Brownie", "Dense Cream"],
  },
];

export default function SignatureSection() {
  const { setIsOrderModalOpen } = useOrder();
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToMenu = (categoryId: string) => {
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-brand-surface border-y border-brand-border overflow-hidden">
      {/* Background ambient accents with subtle burgundy glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-burgundy/25 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-burgundy-dark/25 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-red/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Viewport Stagger */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-brand-orange border border-white/10 text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Flame className="w-3.5 h-3.5 text-brand-red" /> Iconic Pillars of Taste
          </div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white">
            THE FLAVOUR YOU KEEP COMING BACK FOR
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Four pillars that define the Lassi Wassi experience across our Pune kitchens. Crafted with passion, authentic spices, and zero shortcuts.
          </p>
        </motion.div>

        {/* 4 Pillars Grid with Staggered Viewport Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SIGNATURES.map((sig, idx) => (
            <motion.div
              key={sig.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              onClick={() => handleScrollToMenu(sig.categoryFilterId)}
              className="group cursor-pointer relative bg-brand-card hover:bg-brand-card-hover border border-white/10 hover:border-brand-red/40 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300"
            >
              {/* Media Container with Parallax Zoom */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-neutral-900">
                <Image
                  src={sig.image}
                  alt={sig.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-black/40 to-transparent pointer-events-none" />

                {/* Floating Badge Top Left */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-brand-orange shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                >
                  <Sparkles className="w-3 h-3" />
                  {sig.badge}
                </motion.div>

                {/* Price Note Top Right */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-red to-brand-orange border border-white/20 text-white text-xs font-extrabold tracking-wide uppercase shadow-[0_4px_12px_rgba(229,9,20,0.4)]">
                  {sig.priceNote}
                </div>
              </div>

              {/* Content Block */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    {sig.category}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-red group-hover:border-brand-red/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white group-hover:text-brand-red-light transition-colors">
                  {sig.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-neutral-300">
                  {sig.tagline}
                </p>

                <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed">
                  {sig.description}
                </p>

                {/* Ingredient Micro-motion Chips */}
                <div className="mt-4 pt-3 border-t border-brand-border/60 flex flex-wrap gap-1.5">
                  {sig.ingredients.map((ing, iIdx) => (
                    <span
                      key={iIdx}
                      className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 group-hover:border-brand-red/30 transition-colors"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
