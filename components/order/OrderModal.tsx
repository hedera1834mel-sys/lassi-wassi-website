"use client";

import React, { useState } from "react";
import { X, MessageCircle, ExternalLink, Phone, MapPin, Sparkles } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { OUTLETS } from "@/data/outletsData";
import { buildGeneralWhatsAppLink, DISPLAY_WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { analyticsEvents } from "@/lib/analytics";

export default function OrderModal() {
  const { isOrderModalOpen, setIsOrderModalOpen } = useOrder();
  const [selectedOutletId, setSelectedOutletId] = useState("kothrud");

  if (!isOrderModalOpen) return null;

  const activeOutlet = OUTLETS.find((o) => o.id === selectedOutletId) || OUTLETS[0];

  const handleWhatsApp = () => {
    analyticsEvents.whatsappClick("modal_direct");
    window.open(buildGeneralWhatsAppLink(`Hi Lassi Wassi! 👋 I want to order from the ${activeOutlet.name}. Please share available items!`), "_blank");
  };

  const handleSwiggy = () => {
    analyticsEvents.swiggyClick(activeOutlet.name);
    window.open(activeOutlet.swiggyUrl, "_blank");
  };

  const handleZomato = () => {
    analyticsEvents.zomatoClick(activeOutlet.name);
    window.open(activeOutlet.zomatoUrl, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOrderModalOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-brand-surface/95 backdrop-blur-xl border border-white/10 rounded-xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-red/30 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsOrderModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold tracking-wider uppercase bg-black/40 backdrop-blur-md text-brand-orange border border-white/10 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-red" /> Order Direct & Save
          </span>
          <h2 id="order-modal-title" className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-white">
            Choose How You Want to Order
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Fast preparation • Fresh ingredients • Direct WhatsApp or Delivery Apps
          </p>
        </div>

        {/* Outlet Selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            Select Your Nearest Pune Outlet:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {OUTLETS.map((outlet) => (
              <button
                key={outlet.id}
                onClick={() => {
                  setSelectedOutletId(outlet.id);
                  analyticsEvents.outletClick(outlet.name, "select");
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                  selectedOutletId === outlet.id
                    ? "bg-brand-red/20 border-brand-red/60 text-white shadow-sm"
                    : "bg-brand-card/80 border-white/10 text-neutral-300 hover:border-white/20"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 shrink-0 ${selectedOutletId === outlet.id ? "text-brand-red" : "text-neutral-400"}`} />
                <span className="truncate">{outlet.area}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Options */}
        <div className="space-y-3">
          {/* WhatsApp Direct */}
          <button
            onClick={handleWhatsApp}
            className="w-full group relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 text-white font-bold shadow-[0_4px_16px_rgba(5,150,105,0.4)] border border-emerald-400/40 transition-all transform active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-black/20 rounded-xl border border-white/10">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-sm font-black uppercase tracking-wide flex items-center gap-2">
                  Order via WhatsApp
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded-md bg-white text-emerald-800 font-bold">Fastest</span>
                </div>
                <div className="text-xs text-emerald-100 font-normal">
                  {DISPLAY_WHATSAPP_NUMBER} • Takeaway & Delivery
                </div>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Swiggy */}
          <button
            onClick={handleSwiggy}
            className="w-full group flex items-center justify-between p-4 rounded-xl bg-[#FC8019]/10 hover:bg-[#FC8019]/20 border border-[#FC8019]/30 text-white font-medium transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#FC8019] flex items-center justify-center font-black text-white text-lg shadow-sm">
                S
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Order on Swiggy</div>
                <div className="text-xs text-neutral-400">Delivered hot to your doorstep ({activeOutlet.area})</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </button>

          {/* Zomato */}
          <button
            onClick={handleZomato}
            className="w-full group flex items-center justify-between p-4 rounded-xl bg-[#E23744]/10 hover:bg-[#E23744]/20 border border-[#E23744]/30 text-white font-medium transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#E23744] flex items-center justify-center font-black text-white text-lg italic shadow-sm">
                Z
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Order on Zomato</div>
                <div className="text-xs text-neutral-400">Live tracking & delivery offers ({activeOutlet.area})</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Counter Dine-in Call */}
        <div className="mt-5 pt-4 border-t border-brand-border flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-brand-red" /> Counter Inquiries:
          </span>
          <a
            href={`tel:${DISPLAY_WHATSAPP_NUMBER}`}
            className="font-semibold text-white hover:text-brand-red transition-colors"
          >
            {DISPLAY_WHATSAPP_NUMBER}
          </a>
        </div>
      </div>
    </div>
  );
}
