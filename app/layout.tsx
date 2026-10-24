import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { OrderProvider } from "@/context/OrderContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileOrder from "@/components/layout/StickyMobileOrder";
import OrderModal from "@/components/order/OrderModal";
import WhatsAppTray from "@/components/menu/WhatsAppTray";
import JsonLd from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lassiwassi.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LASSI WASSI | Authentic Shawarma, Burgers, Lassi & Shakes in Pune",
    template: "%s | LASSI WASSI Pune",
  },
  description:
    "Pune's premier street food kitchen specializing in freshly spit-roasted Arabian chicken shawarmas, loaded burgers, creamy hand-churned lassis, cold coffee and thick shakes across Kothrud, Sinhgad Road, Katraj and Bavdhan.",
  keywords: [
    "Lassi Wassi",
    "Lassi Wassi Pune",
    "Shawarma Pune",
    "Chicken Shawarma Kothrud",
    "Paneer Shawarma Pune",
    "Sweet Lassi Pune",
    "Mango Lassi",
    "Burgers Pune",
    "Sinhgad Road Shawarma",
    "Katraj Food",
    "Bavdhan Fast Food",
    "Thick Shakes Pune",
    "Pune Street Food",
    "Best Shawarma near MIT Pune",
  ],
  authors: [{ name: "Lassi Wassi" }],
  creator: "Lassi Wassi",
  publisher: "Lassi Wassi",
  formatDetection: {
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "LASSI WASSI | Authentic Shawarma, Burgers, Lassi & Shakes in Pune",
    description:
      "Street-food energy meets restaurant-grade quality. Discover slow-roasted chicken shawarmas, creamy churned lassi, and loaded burgers in Pune.",
    siteName: "Lassi Wassi",
    images: [
      {
        url: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Lassi Wassi Pune Signature Shawarmas & Lassis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LASSI WASSI | Authentic Shawarma, Burgers, Lassi & Shakes in Pune",
    description:
      "Taste that pulls you in. Freshly carved shawarmas, thick shakes, and pure curd lassi across Kothrud, Sinhgad Rd, Katraj, and Bavdhan.",
    images: [
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=1200&h=630&fit=crop&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#100D0D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${bebas.variable} scroll-smooth`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-brand-dark-burgundy text-neutral-100 font-sans selection:bg-brand-red selection:text-white">
        <GoogleAnalytics />
        <OrderProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyMobileOrder />
            <WhatsAppTray />
            <OrderModal />
          </div>
        </OrderProvider>
      </body>
    </html>
  );
}
