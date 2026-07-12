import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import HomeHero from "@/components/sections/home/home-hero";
import HomeFeatures from "@/components/sections/home/home-features";
import HomeManifesto from "@/components/sections/home/home-manifesto";
import HomeStats from "@/components/sections/home/home-stats";
import FeaturedProjects from "@/components/sections/home/featured-projects";
import CallToAction from "@/components/sections/shared/call-to-action";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "home");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Home.cta");

  return (
    <>
      <HomeHero locale={locale} />
      <HomeFeatures />
      <HomeManifesto locale={locale} />
      <HomeStats />
      <FeaturedProjects locale={locale} />
      <CallToAction
        locale={locale}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("description")}
        buttonLabel={t("button")}
        buttonHref="/contacto"
      />
    </>
  );
}
