"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Phone, MapPin, Heart, ArrowUp } from "lucide-react";
import { DISPLAY_WHATSAPP_NUMBER, buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { OUTLETS } from "@/data/outletsData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#140505] text-neutral-400 border-t border-white/[0.08] pt-14 pb-24 sm:pb-14 overflow-hidden">
      {/* Ambient burgundy background glow */}
      <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-brand-burgundy/25 blur-[180px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/[0.08]">
          {/* Brand Info (Span 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex-shrink-0 drop-shadow-[0_0_12px_rgba(229,9,20,0.35)]">
                <Image
                  src="/images/logo.png"
                  alt="Lassi Wassi Official Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl sm:text-3xl font-display font-black tracking-wider text-white uppercase">
                LASSI <span className="text-brand-red">WASSI</span>
              </span>
            </Link>

            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Shawarma • Burgers • Lassi • Beverages
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Pune&apos;s high-energy street food brand. Freshly spit-roasted Arabian chicken, zinger patties, hand-churned whole-curd lassis, and signature cold brews crafted daily across Pune.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://www.instagram.com/lassiwassiofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-white hover:text-amber-400 hover:border-amber-400 backdrop-blur-md transition-colors shadow-sm"
                aria-label="Instagram @lassiwassiofficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={buildGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-white hover:text-emerald-400 hover:border-emerald-400 backdrop-blur-md transition-colors shadow-sm"
                aria-label="WhatsApp Order"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  Menu (17 Categories)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Our Brand
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Outlets & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Order Online */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Order Online
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={buildGeneralWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  WhatsApp ({DISPLAY_WHATSAPP_NUMBER})
                </a>
              </li>
              <li>
                <a
                  href="https://www.swiggy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  Swiggy Delivery
                </a>
              </li>
              <li>
                <a
                  href="https://www.zomato.com/pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  Zomato Delivery
                </a>
              </li>
              <li>
                <span className="text-neutral-500 text-[11px] block pt-1">
                  Takeaway & Counter pickup available across Pune.
                </span>
              </li>
            </ul>
          </div>

          {/* Pune Outlets */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Pune Locations
            </h4>
            <ul className="space-y-2 text-xs">
              {OUTLETS.map((outlet) => (
                <li key={outlet.id}>
                  <Link
                    href="/contact"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span>{outlet.area}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} <b className="text-neutral-400">LASSI WASSI</b>. All rights reserved. Pune, Maharashtra, India.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300 hover:text-white hover:border-amber-400 backdrop-blur-md transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
