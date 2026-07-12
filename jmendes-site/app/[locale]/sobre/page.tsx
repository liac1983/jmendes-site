import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutHero from "@/components/sections/about/about-hero";
import StorySection from "@/components/sections/about/story-section";
import MissionVisionValues from "@/components/sections/about/mission-vision-values";
import CoreValuesGrid from "@/components/sections/about/core-values-grid";
import StatsSection from "@/components/sections/about/stats-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "sobre");
}

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
