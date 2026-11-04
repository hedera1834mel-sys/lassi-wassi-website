"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { OUTLETS } from "@/data/outletsData";
import { buildWhatsAppOrderLink, DISPLAY_WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { analyticsEvents } from "@/lib/analytics";

export default function WhatsAppTray() {
  const {
    tray,
    isTrayOpen,
    setIsTrayOpen,
    updateQuantity,
    removeFromTray,
    clearTray,
    totalItems,
    totalPrice,
    selectedOutlet,
    setSelectedOutlet,
  } = useOrder();

  const [specialNotes, setSpecialNotes] = useState("");

  const handleSendWhatsAppOrder = () => {
    if (tray.length === 0) return;

    analyticsEvents.whatsappClick("tray_order", totalItems, totalPrice);

    const orderPayload = tray.map((t) => ({
      id: t.item.id,
      name: t.item.name,
      price: t.item.price,
      quantity: t.quantity,
      category: t.item.category,
    }));

    const url = buildWhatsAppOrderLink(
      orderPayload,
      selectedOutlet,
      specialNotes
    );
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Floating Glassmorphic Order Tray Trigger */}
      {totalItems > 0 && !isTrayOpen && (
        <button
          onClick={() => setIsTrayOpen(true)}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/85 text-white font-bold shadow-[0_8px_30px_rgba(5,150,105,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] border border-emerald-500/45 hover:border-emerald-400/60 backdrop-blur-xl transform hover:scale-105 active:scale-95 transition-all"
          aria-label="View WhatsApp Order Tray"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-2 -right-2.5 min-w-[20px] h-5 px-1 rounded-md bg-brand-red text-white text-[10px] font-black flex items-center justify-center border border-white/20 shadow-sm">
              {totalItems}
            </span>
          </div>
          <span className="text-xs sm:text-sm uppercase tracking-wide">
            View Order ({totalPrice > 0 ? `₹${totalPrice}` : "Tray"})
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Drawer Overlay */}
      {isTrayOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setIsTrayOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-md bg-brand-surface border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-brand-card">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display uppercase tracking-wide text-white">
                    Your WhatsApp Order Tray
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {totalItems} item{totalItems !== 1 ? "s" : ""} selected
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTrayOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Close tray"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {tray.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400 space-y-3">
                  <div className="w-16 h-16 rounded-xl bg-brand-card border border-white/10 flex items-center justify-center text-3xl shadow-inner">
                    🌯
                  </div>
                  <h4 className="text-base font-semibold text-white">Your tray is empty</h4>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    Browse our 17 menu categories and tap <b>+ Order</b> on your favorite shawarmas, burgers, and lassis!
                  </p>
                  <button
                    onClick={() => {
                      setIsTrayOpen(false);
                      const menuEl = document.getElementById("menu");
                      if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-brand-red/25 hover:bg-brand-red/35 border border-brand-red/45 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Outlet Selection */}
                  <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-red" /> Ordering Outlet (Pune):
                    </label>
                    <select
                      value={selectedOutlet}
                      onChange={(e) => setSelectedOutlet(e.target.value)}
                      className="w-full bg-brand-surface border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                    >
                      {OUTLETS.map((outlet) => (
                        <option key={outlet.id} value={outlet.name}>
                          {outlet.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tray Items */}
                  <div className="space-y-2.5">
                    {tray.map(({ item, quantity }) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-brand-card border border-brand-border group hover:border-neutral-700 transition-colors"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${
                                item.isVeg ? "bg-brand-veg" : "bg-brand-non-veg"
                              }`}
                            />
                            <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                              {item.name}
                            </h5>
                          </div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            {item.price ? `₹${item.price}` : "Price at counter"}
                            {item.price && quantity > 1 && (
                              <span className="text-brand-red font-semibold ml-2">
                                = ₹{item.price * quantity}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-brand-surface border border-neutral-700 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-white/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-white">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-white/10"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromTray(item.id)}
                            className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Special Requests / Customization:
                    </label>
                    <textarea
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g., Extra garlic toum, less spicy, no onions, extra chilled lassi..."
                      rows={2}
                      className="w-full bg-brand-card border border-brand-border rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary & WhatsApp Order Button */}
            {tray.length > 0 && (
              <div className="p-5 border-t border-brand-border bg-brand-card space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Items Count:</span>
                    <span className="font-semibold text-white">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-neutral-800">
                    <span>Estimated Subtotal:</span>
                    <span className="text-brand-red font-display text-xl tracking-wide">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-950/85 hover:bg-emerald-900/90 text-white font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(5,150,105,0.25),inset_0_1px_0_rgba(255,255,255,0.12)] border border-emerald-500/40 backdrop-blur-xl transform active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4 fill-current" />
                  Send Order to WhatsApp ({DISPLAY_WHATSAPP_NUMBER})
                </button>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1">
                  <span>Pre-fills your message on WhatsApp</span>
                  <button
                    onClick={clearTray}
                    className="text-neutral-400 hover:text-red-400 underline"
                  >
                    Clear Tray
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
