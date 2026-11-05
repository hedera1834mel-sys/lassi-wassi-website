"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MenuItem } from "@/data/menuData";
import { useOrder } from "@/context/OrderContext";

interface MenuCardProps {
  item: MenuItem;
}

function MenuCardComponent({ item }: MenuCardProps) {
  const { addToTray, tray } = useOrder();
  const existingInTray = tray.find((t) => t.item.id === item.id);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      layout={!shouldReduceMotion}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col justify-between bg-brand-card hover:bg-brand-card-hover border border-white/10 hover:border-brand-red/40 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
    >
      {/* Top Image Container - Clean Uncluttered Showcase */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-950">
        {item.image && (
          <Image
            src={item.image}
            alt={item.alt || item.name}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px"
            className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-300 ease-out"
            loading="lazy"
          />
        )}

        {/* Subtle bottom shadow vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Minimal Badge if present */}
        {item.badge && (
          <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
            {item.badge}
          </div>
        )}
      </div>

      {/* Card Body - Clear Typography Hierarchy */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Category & Diet indicator */}
          <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                item.isVeg ? "bg-brand-veg" : "bg-brand-non-veg"
              }`}
            />
            <span>{item.isVeg ? "Pure Veg" : "Non-Veg"}</span>
            <span className="text-neutral-600">•</span>
            <span>{item.category}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-orange transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Row: Price & Pure Text Action */}
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <div>
            {item.price !== null ? (
              <span className="text-lg sm:text-xl font-display font-black text-white tracking-wide">
                {item.priceDisplay}
              </span>
            ) : (
              <span className="text-xs font-semibold text-neutral-400">
                At Counter
              </span>
            )}
          </div>

          <button
            onClick={() => addToTray(item)}
            className={`inline-flex items-center gap-1.5 py-1 px-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              existingInTray
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-brand-orange hover:text-white"
            }`}
            aria-label={`Add ${item.name} to order`}
          >
            {existingInTray ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added ({existingInTray.quantity})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default React.memo(MenuCardComponent);
