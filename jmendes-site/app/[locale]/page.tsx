import HomeHero from "@/components/sections/home/home-hero";
import HomeFeatures from "@/components/sections/home/home-features";
import FeaturedProjects from "@/components/sections/home/featured-projects";
import CallToAction from "@/components/sections/shared/call-to-action";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HomeHero locale={locale} />
      <HomeFeatures />
      <FeaturedProjects locale={locale} />
      <CallToAction
        locale={locale}
        title="Pronto para criar o seu projeto ideal?"
        subtitle="Fale connosco e descubra como podemos transformar o seu espaço com mobiliário de excelência"
        buttonLabel="Iniciar Projeto"
        buttonHref="/contacto"
      />
    </>
  );
}

