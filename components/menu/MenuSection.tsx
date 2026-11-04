"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory } from "@/data/menuData";
import MenuCard from "./MenuCard";
import { analyticsEvents } from "@/lib/analytics";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState<"ALL" | "VEG" | "NON-VEG">("ALL");
  const shouldReduceMotion = useReducedMotion();

  const handleCategorySelect = (category: MenuCategory | "ALL") => {
    setSelectedCategory(category);
    analyticsEvents.categoryChange(category);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
  };

  const handleDietFilterChange = (filter: "ALL" | "VEG" | "NON-VEG") => {
    setDietFilter(filter);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === "VEG" && !item.isVeg) return false;
      if (dietFilter === "NON-VEG" && item.isVeg) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCategory;
      }
      return true;
    });
  }, [selectedCategory, dietFilter, searchQuery]);


  return (
    <section id="menu" className="relative py-14 sm:py-20 lg:py-24 bg-brand-dark-burgundy bg-gradient-to-b from-brand-burgundy/20 via-transparent to-transparent scroll-mt-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-brand-burgundy/25 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-brand-burgundy-dark/30 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with Viewport Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-brand-orange border border-white/10 text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Sparkles className="w-3.5 h-3.5 text-brand-red" /> 17 Flavour Categories
          </div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white">
            The Complete Lassi Wassi Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            From flame-carved Arabian shawarmas and loaded burgers to thick, slow-churned lassis and cooling mojitos.
          </p>
        </motion.div>

        {/* Filter Controls Row: Search + Diet Toggle */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-brand-card/80 border border-white/10 p-3.5 sm:p-4 rounded-xl backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        >
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search shawarma, burger, mango lassi, coffee..."
              className="w-full bg-brand-surface/90 border border-white/15 rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-red transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Diet Filter Chips */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => handleDietFilterChange("ALL")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                dietFilter === "ALL"
                  ? "bg-brand-red/35 text-white border border-brand-red/55 shadow-[0_2px_10px_rgba(229,9,20,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.05] text-neutral-400 hover:text-white border border-white/15"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleDietFilterChange("NON-VEG")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                dietFilter === "NON-VEG"
                  ? "bg-brand-non-veg/40 text-white border border-red-500/50 shadow-md shadow-red-950/40 backdrop-blur-md"
                  : "bg-white/[0.05] text-neutral-400 hover:text-white border border-white/15"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-brand-non-veg" /> Non-Veg
            </button>
            <button
              onClick={() => handleDietFilterChange("VEG")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                dietFilter === "VEG"
                  ? "bg-brand-veg/40 text-white border border-emerald-500/50 shadow-md shadow-emerald-950/40 backdrop-blur-md"
                  : "bg-white/[0.05] text-neutral-400 hover:text-white border border-white/15"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-brand-veg" /> Pure Veg
            </button>
          </div>
        </motion.div>

        {/* Categories Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 max-w-[100vw] sm:max-w-full"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar w-full max-w-full">
            <button
              onClick={() => handleCategorySelect("ALL")}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all transform active:scale-95 ${
                selectedCategory === "ALL"
                  ? "bg-brand-red/35 text-white border border-brand-red/55 backdrop-blur-2xl shadow-[0_4px_16px_rgba(229,9,20,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                  : "bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/15 backdrop-blur-xl"
              }`}
            >
              <span>🔥</span>
              <span>All Items</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/40 text-[10px]">
                {MENU_ITEMS.length}
              </span>
            </button>

            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all transform active:scale-95 ${
                    isSelected
                      ? "bg-brand-red/35 text-white border border-brand-red/55 backdrop-blur-2xl shadow-[0_4px_16px_rgba(229,9,20,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                      : "bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/15 backdrop-blur-xl"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-black/40 text-[10px]">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Menu Items Grid with Progressive Loading & Smooth Category Transitions */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-brand-card border border-white/10 rounded-xl p-8 max-w-lg mx-auto shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-white">No dishes found</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Try searching for a different item or switch the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setDietFilter("ALL");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-brand-red/30 hover:bg-brand-red/45 border border-brand-red/50 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-[0_2px_12px_rgba(229,9,20,0.25)] transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout={!shouldReduceMotion}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Source of Truth & Hygiene Guarantee Banner */}
        <div className="mt-14 p-6 rounded-xl bg-gradient-to-r from-brand-card via-[#1e0e0e] to-brand-card border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Official Menu & Price Transparency
              </h4>
              <p className="text-xs text-neutral-400">
                Menu board prices are verified directly from Lassi Wassi Pune. No hidden surcharges. Customise your roll live at the counter!
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold text-neutral-300 bg-white/5 border border-white/10 px-4 py-2 rounded-xl shrink-0">
            Pita & Extra Mayo available at ₹20 each
          </div>
        </div>
      </div>
    </section>
  );
}
