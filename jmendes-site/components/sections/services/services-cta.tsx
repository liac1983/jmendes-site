import Container from "@/components/ui/container";
import Link from "next/link";

export default function ServicesCTA({ locale }: { locale: string }) {
  return (
    <section className="border-t border-[var(--border)] py-24 text-center">
      <Container>
        <h2 className="text-5xl text-white">
          Pronto para começar o seu projeto?
        </h2>

        <p className="mt-4 text-[var(--muted)]">
          Entre em contacto connosco e descubra como podemos transformar o seu espaço
        </p>

        <Link
          href={`/${locale}/contacto`}
          className="mt-8 inline-block bg-[var(--gold)] px-8 py-4 text-black font-medium"
        >
          Pedir Orçamento →
        </Link>
      </Container>
    </section>
  );
}
