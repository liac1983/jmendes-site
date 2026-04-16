import PortfolioHero from "@/components/sections/portfolio/portfolio-hero";
import PortfolioGrid from "@/components/sections/portfolio/portfolio-grid";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid locale={locale} />
    </main>
  );
}
