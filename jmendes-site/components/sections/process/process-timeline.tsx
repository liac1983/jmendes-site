import Container from "@/components/ui/container";

const timelineItems = [
  "Briefing com Cliente",
  "Projeto 3D",
  "Produção na Fábrica",
  "Acabamentos",
  "Entrega e Montagem",
];

export default function ProcessTimeline() {
  return (
    <section className="border-t border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-[72px]">
            Do Conceito à Realidade
          </h2>

          <p className="mt-5 text-xl text-[var(--muted)]">
            Prazo médio de execução: 4-8 semanas, dependendo da complexidade do projeto
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1180px]">
          <div className="absolute left-0 right-0 top-9 hidden border-t border-[rgba(200,168,90,0.55)] md:block" />

          <div className="grid gap-10 md:grid-cols-5">
            {timelineItems.map((item, index) => (
              <div key={item} className="text-center">
                <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[var(--gold)] text-3xl font-semibold text-black">
                  {index + 1}
                </div>

                <p className="mx-auto mt-5 max-w-[150px] text-xl leading-8 text-[var(--muted)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
