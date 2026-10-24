import { FAQS } from "@/data/faqsData";
import { OUTLETS } from "@/data/outletsData";

export default function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lassiwassi.in";

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: "Lassi Wassi",
    alternateName: "Lassi Wassi Pune",
    description:
      "Pune-based street-food and restaurant brand specializing in slow-roasted Arabian chicken shawarmas, shawarma burgers, handcrafted creamy lassi, thick shakes, mojitos, and quick appetizers.",
    url: siteUrl,
    telephone: "+91-98602-52911",
    servesCuisine: ["Arabian", "Fast Food", "Beverages", "Desserts", "Indian Street Food"],
    priceRange: "₹₹",
    image: [
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=1200&auto=format&fit=crop&q=80",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.5204",
      longitude: "73.8567",
    },
    hasMenu: `${siteUrl}/#menu`,
    sameAs: [
      "https://www.instagram.com/lassiwassiofficial/",
    ],
    department: OUTLETS.map((outlet) => ({
      "@type": "Restaurant",
      name: outlet.name,
      telephone: outlet.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: outlet.area,
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Lassi Wassi | Pune's Favorite Shawarma, Burgers & Lassi",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/#menu?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
