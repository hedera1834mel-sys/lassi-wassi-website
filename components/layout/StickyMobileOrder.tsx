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
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-black/90 backdrop-blur-2xl border-t border-white/10 shadow-[0_-4px_25px_rgba(0,0,0,0.7)] flex items-center gap-2">
      <button
        onClick={handleScrollToMenu}
        className="flex-1 py-3 px-3 rounded-full bg-white/[0.07] border border-white/15 text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]"
      >
        <Utensils className="w-3.5 h-3.5 text-brand-orange" />
        <span>Menu</span>
      </button>

      {totalItems > 0 ? (
        <button
          onClick={() => setIsTrayOpen(true)}
          className="flex-[2] py-3 px-4 rounded-full bg-emerald-950/80 hover:bg-emerald-900/85 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between border border-emerald-500/50 backdrop-blur-2xl shadow-[0_4px_16px_rgba(5,150,105,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Tray ({totalItems})</span>
          </div>
          <span className="font-display font-black text-emerald-300">₹{totalPrice}</span>
        </button>
      ) : (
        <button
          onClick={handleOrderNow}
          className="flex-[2] py-3 px-4 rounded-full bg-brand-red/35 hover:bg-brand-red/45 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-brand-red/55 backdrop-blur-2xl shadow-[0_4px_20px_rgba(229,9,20,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] active:scale-95 transition-transform"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(229,9,20,1)]" />
          <MessageCircle className="w-4 h-4 text-brand-orange fill-current" />
          <span>ORDER NOW</span>
        </button>
      )}
    </div>
  );
}
