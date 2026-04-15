import Container from "@/components/ui/container";

export default function ProcessHero() {
  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[980px] text-center">
          <h1 className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-[82px]">
            O Nosso Processo
          </h1>

          <p className="mx-auto mt-6 max-w-[900px] text-xl leading-9 text-[var(--muted)]">
            Do primeiro contacto à instalação final, cada etapa é cuidadosamente
            planeada para garantir excelência e satisfação total
          </p>
        </div>
      </Container>
    </section>
  );
}