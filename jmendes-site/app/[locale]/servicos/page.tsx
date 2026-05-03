import ServicesHero from "@/components/sections/services/services-hero";
import ServicesGrid from "@/components/sections/services/services-grid";
import FullService from "@/components/sections/services/full-service";
import ServicesCTA from "@/components/sections/services/services-cta";

export default async function ServicosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <FullService />
      <ServicesCTA locale={locale} />
    </main>
  );
}
