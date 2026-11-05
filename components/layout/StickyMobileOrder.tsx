"use client";

import React from "react";
import { MessageCircle, ShoppingBag, Utensils } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { DISPLAY_WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { analyticsEvents } from "@/lib/analytics";

export default function StickyMobileOrder() {
  const { setIsOrderModalOpen, setIsTrayOpen, totalItems, totalPrice } = useOrder();

  const handleOrderNow = () => {
    analyticsEvents.orderNowClick("mobile_sticky");
    setIsOrderModalOpen(true);
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 py-3 px-4 bg-black/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between">
      <button
        onClick={handleScrollToMenu}
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors py-1"
      >
        <Utensils className="w-3.5 h-3.5 text-brand-orange" />
        <span>Menu</span>
      </button>

      <div className="h-4 w-px bg-white/20" />

      {totalItems > 0 ? (
        <button
          onClick={() => setIsTrayOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors py-1"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Tray ({totalItems}) • ₹{totalPrice} →</span>
        </button>
      ) : (
        <button
          onClick={handleOrderNow}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-orange hover:text-white transition-colors py-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>ORDER NOW →</span>
        </button>
      )}
    </div>
  );
}
