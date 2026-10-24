"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { DISPLAY_WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { analyticsEvents } from "@/lib/analytics";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Outlets", href: "#outlets" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsOrderModalOpen, totalItems, setIsTrayOpen } = useOrder();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOrderClick = () => {
    analyticsEvents.orderNowClick("navbar");
    setIsOrderModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-black/95 backdrop-blur-xl border-b border-brand-border py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick("#top")}
          className="flex items-center gap-2.5 sm:gap-3 group text-left"
          aria-label="Lassi Wassi Home"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(229,9,20,0.35)]">
            <Image
              src="/images/logo.png"
              alt="Lassi Wassi Official Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-display font-black tracking-wider text-white uppercase block leading-none">
              LASSI <span className="text-brand-red">WASSI</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 block -mt-0.5">
              The Original Shawarma
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-brand-red transition-colors relative py-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Quick Order Tray Trigger */}
          {totalItems > 0 && (
            <button
              onClick={() => setIsTrayOpen(true)}
              className="relative p-2.5 rounded-xl bg-brand-surface border border-brand-border text-white hover:border-brand-red transition-colors"
              aria-label="Open tray"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-red text-white text-[10px] font-black flex items-center justify-center">
                {totalItems}
              </span>
            </button>
          )}

          {/* Primary Order Now Button */}
          <button
            onClick={handleOrderClick}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-light text-white font-black text-xs uppercase tracking-wider shadow-glow-red hover:shadow-glow-red-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>ORDER NOW</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-brand-surface/98 backdrop-blur-2xl border-b border-brand-border p-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-brand-border">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Lassi Wassi Official Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-display font-black tracking-wider text-white uppercase block leading-none">
                  LASSI <span className="text-brand-red">WASSI</span>
                </span>
                <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-neutral-400 block mt-0.5">
                  The Original Shawarma
                </span>
              </div>
            </div>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-base font-bold uppercase tracking-wider text-neutral-200 hover:text-brand-red py-2 border-b border-brand-border/40 transition-colors"
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Actions */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleOrderClick}
                className="w-full py-3.5 rounded-xl bg-brand-red text-white font-black text-sm uppercase tracking-wider shadow-glow-red flex items-center justify-center gap-2"
              >
                <span>ORDER NOW (WHATSAPP / APPS)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 pt-2">
                <Phone className="w-3.5 h-3.5 text-brand-red" />
                <span>Quick WhatsApp: <b>{DISPLAY_WHATSAPP_NUMBER}</b></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
