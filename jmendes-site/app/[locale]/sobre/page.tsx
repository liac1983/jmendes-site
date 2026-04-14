import AboutHero from "@/components/sections/about/about-hero";
import StorySection from "@/components/sections/about/story-section";
import MissionVisionValues from "@/components/sections/about/mission-vision-values";
import CoreValuesGrid from "@/components/sections/about/core-values-grid";
import StatsSection from "@/components/sections/about/stats-section";

export default function SobrePage() {
  return (
    <main>
      <AboutHero />
      <StorySection />
      <MissionVisionValues />
      <CoreValuesGrid />
      <StatsSection />
    </main>
  );
}
