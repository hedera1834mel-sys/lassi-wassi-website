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
          ? "bg-black/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
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
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* WhatsApp Quick Order Tray Trigger */}
          {totalItems > 0 && (
            <button
              onClick={() => setIsTrayOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white hover:border-brand-orange/40 backdrop-blur-md transition-colors shadow-sm"
              aria-label="Open tray"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-md bg-brand-red text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            </button>
          )}

          {/* Primary Order Now Button */}
          <button
            onClick={handleOrderClick}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red/25 hover:bg-brand-red/35 active:bg-brand-red/40 text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(229,9,20,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] border border-brand-red/45 hover:border-brand-red/70 backdrop-blur-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red shadow-[0_0_6px_rgba(229,9,20,0.9)] group-hover:scale-125 transition-transform" />
            <span>ORDER NOW</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-black/92 backdrop-blur-2xl border-b border-white/10 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-fade-in">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
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
                className="text-left text-sm sm:text-base font-bold uppercase tracking-wider text-neutral-200 hover:text-brand-red py-2 border-b border-white/[0.06] transition-colors"
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Actions */}
            <div className="pt-3 space-y-3">
              <button
                onClick={handleOrderClick}
                className="w-full py-3.5 rounded-xl bg-brand-red/25 hover:bg-brand-red/35 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(229,9,20,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] border border-brand-red/45 backdrop-blur-xl flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_rgba(229,9,20,0.9)]" />
                <span>ORDER NOW (WHATSAPP / APPS)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 pt-1">
                <Phone className="w-3.5 h-3.5 text-brand-red" />
                <span>Quick WhatsApp: <b className="text-white">{DISPLAY_WHATSAPP_NUMBER}</b></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
