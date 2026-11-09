import HeroSection from "@/components/hero/HeroSection";
import SignatureHighlights from "@/components/home/SignatureHighlights";

export default function Home() {
  return (
    <div id="top" className="flex flex-col min-h-screen bg-[#180606]">
      {/* 1. Main Hero Section with Shawarma Background */}
      <HeroSection />

      {/* 2. Four Signature Food Highlights & Explore Full Menu CTA */}
      <SignatureHighlights />
    </div>
  );
}
