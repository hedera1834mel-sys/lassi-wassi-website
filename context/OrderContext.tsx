"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/data/menuData";
import { analyticsEvents } from "@/lib/analytics";

export interface TrayItem {
  item: MenuItem;
  quantity: number;
}

interface OrderContextType {
  tray: TrayItem[];
  addToTray: (item: MenuItem) => void;
  removeFromTray: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearTray: () => void;
  isTrayOpen: boolean;
  setIsTrayOpen: (open: boolean) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  selectedOutlet: string;
  setSelectedOutlet: (outlet: string) => void;
  totalItems: number;
  totalPrice: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [tray, setTray] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<string>("Kothrud");

  // Load saved tray from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lw_tray");
      if (saved) {
        setTray(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save tray to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lw_tray", JSON.stringify(tray));
    } catch {
      // ignore
    }
  }, [tray]);

  const addToTray = async (item: MenuItem) => {
    setTray((prev) => {
      const existing = prev.find((t) => t.item.id === item.id);
      if (existing) {
        return prev.map((t) =>
          t.item.id === item.id ? { ...t, quantity: t.quantity + 1 } : t
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    analyticsEvents.addToTray(item.name, item.category, item.price);

    // Micro-interaction: Trigger confetti burst
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.85, x: 0.85 },
        colors: ["#E50914", "#FF5E36", "#FFFFFF", "#F59E0B"],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
  };

  const removeFromTray = (itemId: string) => {
    setTray((prev) => prev.filter((t) => t.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setTray((prev) =>
      prev
        .map((t) => {
          if (t.item.id === itemId) {
            const newQty = t.quantity + delta;
            return newQty > 0 ? { ...t, quantity: newQty } : null;
          }
          return t;
        })
        .filter(Boolean) as TrayItem[]
    );
  };

  const clearTray = () => {
    setTray([]);
  };

  const totalItems = tray.reduce((sum, t) => sum + t.quantity, 0);
  const totalPrice = tray.reduce(
    (sum, t) => sum + (t.item.price || 0) * t.quantity,
    0
  );

  return (
    <OrderContext.Provider
      value={{
        tray,
        addToTray,
        removeFromTray,
        updateQuantity,
        clearTray,
        isTrayOpen,
        setIsTrayOpen,
        isOrderModalOpen,
        setIsOrderModalOpen,
        selectedOutlet,
        setSelectedOutlet,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
