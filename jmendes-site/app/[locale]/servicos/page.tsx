import ServicesHero from "@/components/sections/services/services-hero";
import ServicesGrid from "@/components/sections/services/services-grid";
import FullService from "@/components/sections/services/full-service";
import ServicesCTA from "@/components/sections/services/services-cta";

export default function ServicosPage({ params }: { params: { locale: string } }) {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <FullService />
      <ServicesCTA locale={params.locale} />
    </main>
  );
}
