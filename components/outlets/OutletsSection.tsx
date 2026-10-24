"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Clock, Phone, ExternalLink, Sparkles, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { OUTLETS } from "@/data/outletsData";
import { useOrder } from "@/context/OrderContext";
import { analyticsEvents } from "@/lib/analytics";

export default function OutletsSection() {
  const { setSelectedOutlet, setIsOrderModalOpen } = useOrder();
  const [activeOutletId, setActiveOutletId] = useState(OUTLETS[0].id);
  const shouldReduceMotion = useReducedMotion();

  const handleDirections = (outletName: string, url: string) => {
    analyticsEvents.outletClick(outletName, "directions");
    window.open(url, "_blank");
  };

  const handleOrderOutlet = (outletName: string) => {
    setSelectedOutlet(outletName);
    analyticsEvents.outletClick(outletName, "order");
    setIsOrderModalOpen(true);
  };

  return (
    <section id="outlets" className="relative py-24 bg-brand-dark-burgundy border-b border-brand-border scroll-mt-20">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-brand-burgundy/25 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/15 text-brand-red border border-brand-red/30 text-xs font-bold uppercase tracking-widest mb-3">
            <motion.span
              animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
            </motion.span>
            Pune Outlets Network
          </div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white">
            FIND A LASSI WASSI NEAR YOU
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Dine-in, pick up piping-hot takeaway rolls, or order straight to your doorstep across our 4 verified Pune destinations.
          </p>
        </motion.div>

        {/* 4 Location Cards Grid with Staggered Viewport Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {OUTLETS.map((outlet, idx) => {
            const isHighlight = activeOutletId === outlet.id;
            return (
              <motion.div
                key={outlet.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
                onMouseEnter={() => setActiveOutletId(outlet.id)}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-brand-card border transition-all duration-300 ${
                  isHighlight
                    ? "border-brand-red shadow-glow-red"
                    : "border-brand-border hover:border-neutral-600"
                }`}
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-orange flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {outlet.area}
                    </span>
                    {outlet.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-red/20 text-brand-red border border-brand-red/30 text-[10px] font-black uppercase tracking-wider">
                        {outlet.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Landmark */}
                  <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white">
                    {outlet.name}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-300 mt-1">
                    Landmark: <span className="text-white">{outlet.landmark}</span>
                  </p>

                  {/* Address Note */}
                  <div className="mt-4 p-3 rounded-2xl bg-brand-surface/70 border border-brand-border text-xs text-neutral-400 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                      <span>{outlet.addressNote}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1.5 border-t border-brand-border/60 text-neutral-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{outlet.timingNote}</span>
                    </div>
                  </div>

                  {/* Popular Dishes at this Outlet */}
                  <div className="mt-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                      Outlet Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {outlet.popularFor.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] text-neutral-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Row */}
                <div className="mt-6 pt-5 border-t border-brand-border flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleDirections(outlet.name, outlet.googleMapsQuery)}
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-brand-surface hover:bg-neutral-800 border border-brand-border text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors group"
                  >
                    <Navigation className="w-3.5 h-3.5 text-brand-orange group-hover:scale-110 transition-transform" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </button>

                  <button
                    onClick={() => handleOrderOutlet(outlet.name)}
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-brand-red hover:bg-brand-red-light text-white text-xs font-black uppercase tracking-wider shadow-glow-red flex items-center justify-center gap-2 transition-all transform active:scale-95 hover:shadow-glow-red-lg"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Here</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
