import Link from "next/link";
import Container from "@/components/ui/container";

type Props = {
  locale: string;
};

export default function ProjectCta({ locale }: Props) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="text-center">
          <h2 className="text-6xl text-white md:text-7xl">
            Gostou deste projeto?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-2xl text-[var(--muted)]">
            Entre em contacto connosco para criar algo único para o seu espaço
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex h-[62px] items-center gap-3 bg-[var(--gold)] px-8 text-lg font-medium text-black transition-opacity hover:opacity-90"
            >
              Pedir Orçamento →
            </Link>

            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex h-[62px] items-center gap-3 border border-[var(--gold)] px-8 text-lg font-medium text-gold transition hover:bg-[var(--gold)] hover:text-black"
            >
              Ver Mais Projetos
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

