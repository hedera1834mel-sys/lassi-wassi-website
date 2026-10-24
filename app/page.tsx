import HeroSection from "@/components/hero/HeroSection";
import SignatureSection from "@/components/signature/SignatureSection";
import MenuSection from "@/components/menu/MenuSection";
import OutletsSection from "@/components/outlets/OutletsSection";
import AboutSection from "@/components/about/AboutSection";
import SocialSection from "@/components/social/SocialSection";
import FAQSection from "@/components/faq/FAQSection";

export default function Home() {
  return (
    <div id="top" className="flex flex-col min-h-screen">
      <HeroSection />
      <SignatureSection />
      <MenuSection />
      <OutletsSection />
      <AboutSection />
      <SocialSection />
      <FAQSection />
    </div>
  );
}
