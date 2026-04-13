import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import SectionTitle from "@/components/ui/section-title";
import PageHero from "@/components/ui/page-hero";
import StatItem from "@/components/ui/stat-item";

export default function HomePage() {
  return (
    <>
      <PageHero
        title="Fabricamos mobiliário com excelência"
        subtitle="Desde 1995 a criar soluções únicas em mobiliário."
      />

      <section className="py-20">
        <Container>
          <SectionTitle
            title="Projetos em Destaque"
            subtitle="Exemplos do nosso trabalho em mobiliário personalizado."
          />

          <div className="flex gap-4">
            <Button href="/pt/portfolio">Ver Projetos</Button>
            <Button href="/pt/contacto" variant="secondary">
              Pedir Orçamento
            </Button>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <StatItem value="30+" label="Anos de Experiência" />
            <StatItem value="5000+" label="Projetos Realizados" />
            <StatItem value="15" label="Países Servidos" />
          </div>
        </Container>
      </section>
    </>
  );
}
