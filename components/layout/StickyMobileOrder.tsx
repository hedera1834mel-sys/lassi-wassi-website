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
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-brand-surface/95 backdrop-blur-xl border-t border-brand-border shadow-2xl flex items-center gap-2">
      <button
        onClick={handleScrollToMenu}
        className="flex-1 py-3 px-3 rounded-2xl bg-brand-card border border-brand-border text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <Utensils className="w-3.5 h-3.5 text-brand-orange" />
        <span>Menu</span>
      </button>

      {totalItems > 0 ? (
        <button
          onClick={() => setIsTrayOpen(true)}
          className="flex-[2] py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-lg shadow-green-950/60 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4" />
            <span>Tray ({totalItems})</span>
          </div>
          <span>₹{totalPrice}</span>
        </button>
      ) : (
        <button
          onClick={handleOrderNow}
          className="flex-[2] py-3 px-4 rounded-2xl bg-gradient-to-r from-brand-red to-brand-orange text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-red active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>ORDER NOW</span>
        </button>
      )}
    </div>
  );
}
