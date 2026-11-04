"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check, Sparkles, HelpCircle } from "lucide-react";
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
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col justify-between bg-brand-card hover:bg-brand-card-hover border border-white/10 hover:border-brand-red/40 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300"
    >
      {/* Top Image Container with Fixed Dimensions */}
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

        {/* Gradient shadow overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-black/20 to-transparent opacity-85 pointer-events-none" />

        {/* Veg / Non-Veg Indicator Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 z-10 shadow-md">
          <span
            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
              item.isVeg ? "border-brand-veg" : "border-brand-non-veg"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.isVeg ? "bg-brand-veg" : "bg-brand-non-veg"
              }`}
            />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
            {item.isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>

        {/* Highlight Badge if any */}
        {item.badge && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-brand-red to-brand-orange text-white text-[10px] font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(229,9,20,0.4)] border border-white/20 group-hover:scale-105 transition-transform z-10">
            <Sparkles className="w-2.5 h-2.5" />
            {item.badge}
          </div>
        )}

        {/* Price Tag floating bottom left of image */}
        <div className="absolute bottom-3 left-3.5 z-10">
          {item.price !== null ? (
            <span className="text-xl sm:text-2xl font-display font-black text-white drop-shadow-md tracking-wider">
              {item.priceDisplay}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-black/80 px-2 py-0.5 rounded-md border border-amber-500/30">
              <HelpCircle className="w-3 h-3" /> Price at Counter
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-red-light transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">
            {item.category}
          </span>

          <button
            onClick={() => addToTray(item)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all transform active:scale-95 ${
              existingInTray
                ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white border border-emerald-400/30 shadow-md"
                : "bg-gradient-to-r from-brand-red to-brand-orange text-white border border-white/20 shadow-[0_4px_14px_rgba(229,9,20,0.35)] hover:shadow-[0_4px_20px_rgba(229,9,20,0.5)] hover:-translate-y-0.5"
            }`}
            aria-label={`Add ${item.name} to order`}
          >
            {existingInTray ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Tray ({existingInTray.quantity})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default React.memo(MenuCardComponent);
