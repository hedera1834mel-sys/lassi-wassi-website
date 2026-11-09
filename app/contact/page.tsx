import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin, Navigation, Sparkles, UtensilsCrossed, ExternalLink } from "lucide-react";
import { OUTLETS } from "@/data/outletsData";
import { DISPLAY_WHATSAPP_NUMBER, buildGeneralWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Outlets & Contact | 4 Pune Locations & WhatsApp Orders",
  description:
    "Find Lassi Wassi Pune outlets in Kothrud, Sinhgad Road, Katraj, and Bavdhan. Direct WhatsApp ordering, takeaway, directions, phone numbers, and counter inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#180606] text-neutral-100 pt-20 pb-20">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[36rem] h-[36rem] bg-brand-burgundy/25 blur-[180px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-[32rem] h-[32rem] bg-brand-red/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        {/* Breadcrumb Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-amber-400 transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Pune Outlets & Customer Support</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase text-white leading-none">
            OUR OUTLETS & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-orange to-amber-400">
              CONTACT US
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Craving fresh Arabian shawarmas, loaded burgers, or hand-churned lassis? Visit any of our 4 Pune locations or reach out directly for instant takeaway orders and catering inquiries.
          </p>
        </div>

        {/* Contact Quick Action Cards Grid (Phone, WhatsApp, Hours) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Card 1: WhatsApp Ordering */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                WhatsApp Orders & Chat
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Fastest way to order takeaway, check today&apos;s specials, or send bulk party roll inquiries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={buildGeneralWhatsAppLink("Hi Lassi Wassi! I would like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
              </a>
            </div>
          </div>

          {/* Card 2: Direct Call Inquiries */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Call Us Directly
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Connect directly with our central line for counter inquiries, college catering, or event orders.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={`tel:${DISPLAY_WHATSAPP_NUMBER}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-neutral-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now ({DISPLAY_WHATSAPP_NUMBER})</span>
              </a>
            </div>
          </div>

          {/* Card 3: Operating Hours */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-brand-red/40 transition-all duration-300 shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-red/15 border border-brand-red/30 text-brand-red flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Store Operating Hours
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Serving lunch, evening snack crowds, and late-night street food lovers 7 days a week.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center justify-between text-neutral-200">
                <span>Daily Store Hours:</span>
                <span className="font-bold text-amber-400">11:00 AM – 11:30 PM</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Open on all public holidays & weekends</p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OUR OUTLETS SECTION                                                       */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              4 Convenient Pune Destinations
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wider text-white">
              FIND YOUR NEAREST OUTLET
            </h2>
            <p className="mt-2 text-sm text-neutral-300">
              Pick up piping-hot takeaway rolls or get directions directly on Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {OUTLETS.map((outlet) => (
              <div
                key={outlet.id}
                className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Top Badge & Area */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-red" />
                      <span>{outlet.area}</span>
                    </span>

                    {outlet.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
                        {outlet.badge}
                      </span>
                    )}
                  </div>

                  {/* Outlet Name */}
                  <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white">
                    {outlet.name}
                  </h3>

                  {/* Landmark & Address */}
                  <p className="text-sm font-semibold text-neutral-200 mt-2">
                    {outlet.landmark}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {outlet.addressNote}
                  </p>

                  {/* Popular Dishes */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                      Popular At This Branch:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {outlet.popularFor.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] text-neutral-300 text-xs border border-white/[0.06]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions: Google Maps Directions + Delivery Links */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={outlet.googleMapsQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-black uppercase tracking-wider shadow-sm transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-3 text-xs">
                    <a
                      href={outlet.swiggyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-orange-400 transition-colors"
                    >
                      Swiggy ↗
                    </a>
                    <span className="text-neutral-600">•</span>
                    <a
                      href={outlet.zomatoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-red-400 transition-colors"
                    >
                      Zomato ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Catering & Bulk Orders Note */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/10 text-center max-w-2xl mx-auto shadow-xl">
          <UtensilsCrossed className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wider text-white">
            Hosting an Event or College Party in Pune?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
            We prepare bulk fresh chicken shawarma platters, burger boxes, and chilled mango lassis delivered right to your venue. Contact us on WhatsApp for custom event pricing.
          </p>
          <div className="mt-5">
            <a
              href={buildGeneralWhatsAppLink("Hi! I would like to inquire about bulk/catering orders for an event in Pune.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Inquire for Event Catering ↗</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
