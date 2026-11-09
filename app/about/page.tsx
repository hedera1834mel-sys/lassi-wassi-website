import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Flame, ShieldCheck, Sparkles, HeartHandshake, ArrowRight, UtensilsCrossed, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story & Heritage | Lassi Wassi Pune",
  description:
    "Discover the story of Lassi Wassi. Born from a passion for authentic vertical spit-roasted shawarma, hand-whipped garlic toum, and pure hand-churned lassi in Pune, Maharashtra.",
};

const PILLARS = [
  {
    icon: Flame,
    title: "Vertical Spit Roasting",
    desc: "100% whole muscle chicken freshly marinated in Mediterranean herbs and slow-carved hot throughout the day. Never frozen patties, never reheated meat.",
  },
  {
    icon: ShieldCheck,
    title: "Scratch-Made Garlic Toum",
    desc: "Our iconic toum is whipped fresh daily in-house using whole garlic cloves, fresh lemon juice, and clean oil. Rich, airy, and free from commercial fillers.",
  },
  {
    icon: Sparkles,
    title: "Pure Hand-Churned Curd",
    desc: "Our thick lassis are churned from pure whole-milk curd, topped with dense malai, natural Ratnagiri mango pulp, and rich dry fruits for unmatched satisfaction.",
  },
  {
    icon: HeartHandshake,
    title: "Pune Street Food Pride",
    desc: "Crafted for students, late-night cravings, and families who demand restaurant-grade freshness with authentic street-food soul across 4 Pune hubs.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#180606] text-neutral-100 pt-20 pb-20">
      {/* Ambient Burgundy Glows */}
      <div className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] bg-brand-burgundy/30 blur-[180px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[32rem] h-[32rem] bg-brand-red/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        {/* Breadcrumb Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-amber-400 transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Heritage & Craftsmanship</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase text-white leading-none">
            THE STORY OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-orange to-amber-400">
              LASSI WASSI
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-neutral-300 font-normal leading-relaxed">
            Born in Pune out of a genuine obsession with authentic Middle Eastern flame-roasting and traditional Indian curd churning. We set out to prove that fast street food can be crafted with uncompromising restaurant standards.
          </p>
        </div>

        {/* Story Section: Visual + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
          {/* Left: Authentic Kitchen Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 group">
              <Image
                src="/images/site/about-kitchen.webp"
                alt="Lassi Wassi Kitchen & Authentic Preparation"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  Open Kitchen Standards
                </span>
                <h3 className="text-xl font-display uppercase tracking-wide text-white mt-1">
                  100% Fresh Every Single Day
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  Every chicken cone is hand-stacked, slow-carved hot on demand, and paired with scratch-made sauces.
                </p>
              </div>
            </div>
          </div>

          {/* Right: The Brand Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wide text-white">
                No Freezers. No Shortcuts. Just Flame & Fresh Curd.
              </h2>
              <p>
                When Lassi Wassi opened its first counter in Pune, the mission was simple: eliminate rubbery, pre-cooked shawarma meat and watery drinks. Instead, we brought in authentic vertical rotisseries that continuously spit-roast whole chicken muscle marinated in aromatic Mediterranean spices.
              </p>
              <p>
                To accompany the fiery rolls, we took the timeless Punjabi lassi tradition and perfected it with dense, hand-churned whole-curd, thick malai layers, and fresh Ratnagiri fruit infusions.
              </p>
              <p>
                Today, across our hubs in <b>Kothrud</b>, <b>Sinhgad Road</b>, <b>Katraj</b>, and <b>Bavdhan</b>, that commitment hasn&apos;t wavered by a millimeter.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-amber-400 block">100%</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-semibold">Whole Muscle Meat</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-brand-red block">17</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-semibold">Menu Categories</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <span className="text-2xl sm:text-3xl font-display font-black text-amber-400 block">4</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-semibold">Pune Outlets</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Iconic Pillars of Taste */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Our Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white">
              The 4 Pillars of Taste
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-maroon via-[#220707] to-[#180606] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wider text-white">
              Hungry for Pune&apos;s Best Shawarma?
            </h2>
            <p className="mt-1 text-sm text-neutral-300">
              Browse our complete 17-category menu or visit your nearest Lassi Wassi counter.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-neutral-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-105 transition-all"
            >
              <UtensilsCrossed className="w-4 h-4 text-neutral-950" />
              <span>Explore Menu</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Find Nearest Outlet</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
