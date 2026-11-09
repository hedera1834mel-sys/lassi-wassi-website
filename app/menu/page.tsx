import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import MenuSection from "@/components/menu/MenuSection";

export const metadata: Metadata = {
  title: "Official Menu | Authentic Shawarma, Burgers, Lassi & Shakes",
  description:
    "Explore the complete Lassi Wassi menu featuring 17 categories: authentic Arabian flame-carved chicken shawarmas, gourmet burgers, hand-churned lassis, cold coffee, and thick shakes in Pune.",
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#180606] pt-20 pb-16">
      {/* Top Breadcrumb & Page Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-amber-400 transition-colors group mb-6"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Complete Menu Section with Category Filters, Search & Dishes */}
      <MenuSection />
    </main>
  );
}
