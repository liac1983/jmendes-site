import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/container";

export default function LinesHero() {
  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[980px] text-center">
          <h1 className="text-6xl leading-tight text-white md:text-7xl lg:text-[82px]">
            Linhas de Mobiliário
          </h1>

          <p className="mx-auto mt-6 max-w-[950px] text-xl leading-9 text-[var(--muted)]">
            Produção própria com entrega rápida. Qualidade premium em série.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-lg text-[var(--muted)]">
            <div className="inline-flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[var(--gold)]" />
              <span>Produção Própria</span>
            </div>

            <div className="inline-flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[var(--gold)]" />
              <span>Entrega Rápida</span>
            </div>

            <div className="inline-flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[var(--gold)]" />
              <span>Garantia Incluída</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

