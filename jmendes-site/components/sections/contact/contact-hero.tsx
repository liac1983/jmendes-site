import Container from "@/components/ui/container";

export default function ContactHero() {
  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl text-white md:text-7xl lg:text-[82px]">
            Contacto
          </h1>

          <p className="mx-auto mt-6 max-w-[900px] text-xl leading-9 text-[var(--muted)]">
            Estamos prontos para dar vida ao seu projeto. Entre em contacto connosco.
          </p>
        </div>
      </Container>
    </section>
  );
}

