"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, ArrowRight, UtensilsCrossed } from "lucide-react";
import { useOrder } from "@/context/OrderContext";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "MENU", href: "/menu" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsTrayOpen } = useOrder();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#180606]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
          : "bg-[#180606]/75 backdrop-blur-md border-b border-white/[0.06] py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
        {/* Brand Logo (Left) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group text-left"
          aria-label="Lassi Wassi Home"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
            <Image
              src="/images/logo.png"
              alt="Lassi Wassi Official Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-display font-black tracking-wider text-white uppercase block leading-none">
              LASSI <span className="text-brand-red">WASSI</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-amber-400/90 block -mt-0.5">
              The Original Shawarma
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Strict order: HOME | MENU | ABOUT | CONTACT) */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-[0.16em] transition-all relative py-1 ${
                  isActive
                    ? "text-amber-400 font-black"
                    : "text-neutral-200 hover:text-amber-400"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-red via-amber-400 to-amber-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions: Tray Trigger + Golden Explore Menu Button */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* WhatsApp Order Tray Trigger */}
          {totalItems > 0 && (
            <button
              onClick={() => setIsTrayOpen(true)}
              className="relative p-2 rounded-xl bg-white/[0.08] border border-white/15 text-white hover:border-amber-400 transition-colors"
              aria-label="Open tray"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-red text-white text-[10px] font-black flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            </button>
          )}

          {/* Glass Explore Menu Button */}
          <Link
            href="/menu"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400/15 via-amber-500/10 to-amber-400/5 hover:from-amber-400/25 hover:via-amber-500/20 border border-amber-400/40 hover:border-amber-400/80 text-amber-300 hover:text-white text-xs font-black uppercase tracking-wider backdrop-blur-xl shadow-[0_4px_20px_rgba(245,158,11,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all group"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/[0.06] border border-white/10 text-neutral-200 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#180606]/98 backdrop-blur-2xl border-b border-white/15 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] animate-fade-in">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-left text-sm font-bold uppercase tracking-wider py-2.5 px-3 rounded-lg border transition-all ${
                    isActive
                      ? "text-amber-400 bg-white/[0.06] border-amber-400/30"
                      : "text-neutral-200 hover:text-amber-400 border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Explore Menu CTA Button */}
            <div className="pt-2">
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-neutral-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all"
              >
                <UtensilsCrossed className="w-4 h-4 text-neutral-950" />
                <span>Explore Menu →</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
