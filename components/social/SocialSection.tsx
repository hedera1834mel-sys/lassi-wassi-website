"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Instagram, Heart, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface SocialPost {
  id: string;
  image: string;
  tag: string;
  caption: string;
  likes: string;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "sp-1",
    image: "/images/site/social-1.webp",
    tag: "#ShawarmaPune",
    caption: "The cheese pull on our Special Shawarma is undefeated! Who are you sharing this with? 🔥",
    likes: "2.4K",
  },
  {
    id: "sp-2",
    image: "/images/site/social-2.webp",
    tag: "#SweetLassi",
    caption: "Slow-churned curd topped with dry fruits and creamy malai. Pune heat antidote! 🥛",
    likes: "1.8K",
  },
  {
    id: "sp-3",
    image: "/images/site/social-3.webp",
    tag: "#ZingerBurger",
    caption: "Extra crispy double chicken patty stacked high for evening munchies. 🍔",
    likes: "3.1K",
  },
  {
    id: "sp-4",
    image: "/images/site/social-4.webp",
    tag: "#BrainFreshMojito",
    caption: "Fizzy, minty and iced cold! The ultimate companion to hot spicy shawarmas. 🍹",
    likes: "1.5K",
  },
  {
    id: "sp-5",
    image: "/images/site/social-5.webp",
    tag: "#MudCoffee",
    caption: "Thick enough to eat with a straw! Our iconic Pune cold coffee & mud chocolate. ☕",
    likes: "2.9K",
  },
  {
    id: "sp-6",
    image: "/images/site/social-6.webp",
    tag: "#PeriPeriChicken",
    caption: "Crispy chicken popcorn tossed fresh with fiery peri-peri seasoning and garlic dip. 🍿",
    likes: "1.7K",
  },
];

export default function SocialSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 bg-brand-cream overflow-hidden">
      {/* Ambient burgundy background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-brand-burgundy/25 blur-[160px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-pink/15 text-brand-pink border border-brand-pink/30 text-xs font-bold uppercase tracking-widest mb-3">
            <Instagram className="w-3.5 h-3.5" /> Instagram Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white">
            FOLLOW @lassiwassiofficial
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Behind the spit, late-night cravings, food reels, and student challenge drops. Tag us in your food stories!
          </p>
        </motion.div>

        {/* 6 Post Grid with Staggered Viewport Entrance & Deferred Mount */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOCIAL_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              href="https://www.instagram.com/lassiwassiofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-brand-border block shadow-card-depth"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Hover overlay with likes and Instagram icon animation */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <span className="text-[11px] font-bold text-brand-orange">
                  {post.tag}
                </span>

                <p className="text-[10px] text-white line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-xs text-white pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1 font-semibold">
                    <Heart className="w-3 h-3 text-brand-red fill-current" />
                    {post.likes}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Big Follow Button */}
        <div className="text-center mt-12 px-2">
          <a
            href="https://www.instagram.com/lassiwassiofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-8 py-3.5 sm:py-4 max-w-full rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <Instagram className="w-4 h-4 shrink-0" />
            <span className="truncate">FOLLOW @lassiwassiofficial ON INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
