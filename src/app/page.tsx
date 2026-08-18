import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import WhoWeAre from "@/components/sections/WhoWeAre";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ESGOverview from "@/components/sections/ESGOverview";
import IndustryInsights from "@/components/sections/IndustryInsights";
import HomeCTA from "@/components/sections/HomeCTA";
import { generateLocalBusinessSchema } from "@/lib/seo";

export default function Home() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSection />
      <WhoWeAre />
      <StatsBar />
      <ServicesOverview />
      <ESGOverview />
      <IndustryInsights />
      <HomeCTA />
    </>
  );
}