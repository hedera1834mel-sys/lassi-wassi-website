"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Phone, MapPin, Heart, ArrowUp } from "lucide-react";
import { DISPLAY_WHATSAPP_NUMBER, buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { OUTLETS } from "@/data/outletsData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-brand-black text-neutral-400 border-t border-brand-border pt-16 pb-28 sm:pb-16 overflow-hidden">
      {/* Ambient burgundy background glow */}
      <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-brand-burgundy/20 blur-[180px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-border">
          {/* Brand Info (Span 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 drop-shadow-[0_0_12px_rgba(229,9,20,0.35)]">
                <Image
                  src="/images/logo.png"
                  alt="Lassi Wassi Official Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-3xl font-display font-black tracking-wider text-white uppercase">
                LASSI <span className="text-brand-red">WASSI</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-white/90 uppercase tracking-widest">
              Shawarma • Burgers • Lassi • Beverages
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Pune&apos;s high-energy street food brand. Freshly spit-roasted Arabian chicken, zinger patties, hand-churned whole-curd lassis, and signature cold brews crafted daily across Pune.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/lassiwassiofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-white hover:text-brand-red hover:border-brand-red backdrop-blur-md transition-colors"
                aria-label="Instagram @lassiwassiofficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={buildGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-white hover:text-emerald-400 hover:border-emerald-400 backdrop-blur-md transition-colors"
                aria-label="WhatsApp Order"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#top" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Menu (17 Categories)
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Our Brand
                </a>
              </li>
              <li>
                <a href="#outlets" className="hover:text-white transition-colors">
                  Pune Outlets
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
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
                  Takeaway & Counter pickup available at all branches.
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
                  <a
                    href={outlet.googleMapsQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span>{outlet.area}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} <b>LASSI WASSI</b>. All rights reserved. Pune, Maharashtra, India.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-brand-red fill-current" /> for Pune food lovers
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/[0.05] border border-white/15 text-neutral-300 hover:text-white backdrop-blur-md transition-colors"
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
