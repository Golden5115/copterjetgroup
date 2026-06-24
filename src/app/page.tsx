import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import WhoWeAre from "@/components/sections/WhoWeAre";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ESGOverview from "@/components/sections/ESGOverview"; // Import here
import IndustryInsights from "@/components/sections/IndustryInsights";
import HomeCTA from "@/components/sections/HomeCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhoWeAre />
      <StatsBar />
      <ServicesOverview />
      <ESGOverview /> {/* Added here! */}
      <IndustryInsights />
      <HomeCTA />
    </>
  );
}