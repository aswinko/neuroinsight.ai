import { BenefitsSection } from "@/src/components/layout/sections/benefits";
import { CommunitySection } from "@/src/components/layout/sections/community";
// import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/src/components/layout/sections/faq";
// import { FeaturesSection } from "@/components/layout/sections/features";
import { HeroSection } from "@/src/components/layout/sections/hero";
import { PricingSection } from "@/src/components/layout/sections/pricing";
// import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/src/components/layout/sections/sponsors";



export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <CommunitySection />
      <PricingSection />
      {/* <ContactSection /> */}
      <FAQSection />
    </>
  );
}
