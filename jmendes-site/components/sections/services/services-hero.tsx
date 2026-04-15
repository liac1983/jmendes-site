import Container from "@/components/ui/container";

export default function ServicesHero() {
  return (
    <section className="border-b border-[var(--border)] py-20">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl lg:text-[80px] text-white">
            Serviços
          </h1>

          <p className="mt-6 text-xl text-[var(--muted)]">
            Soluções completas em mobiliário, do conceito à instalação final
          </p>
        </div>
      </Container>
    </section>
  );
}
