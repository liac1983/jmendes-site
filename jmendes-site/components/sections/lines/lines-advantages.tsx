import Container from "@/components/ui/container";

const advantages = [
  {
    title: "Entrega Rápida",
    description:
      "Stock disponível para entrega imediata ou produção em 2-4 semanas",
  },
  {
    title: "Preços Competitivos",
    description:
      "Produção em escala permite oferecer melhor relação qualidade-preço",
  },
  {
    title: "Qualidade Garantida",
    description:
      "Mesma qualidade e atenção ao detalhe dos projetos personalizados",
  },
  {
    title: "Personalizável",
    description:
      "Opções de cores, acabamentos e dimensões para adaptar ao seu espaço",
  },
];

export default function LinesAdvantages() {
  return (
    <section className="border-t border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="text-5xl leading-tight text-white md:text-6xl lg:text-[72px]">
            Vantagens das Nossas <span className="text-[var(--gold)]">Linhas de Mobiliário</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[900px] text-xl leading-9 text-[var(--muted)]">
            Porque escolher produção em série não significa abdicar de qualidade
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="text-3xl text-[var(--gold)]">{item.title}</h3>
              <p className="mx-auto mt-4 max-w-[260px] text-lg leading-8 text-[var(--muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

