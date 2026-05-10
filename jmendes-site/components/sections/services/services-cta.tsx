import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Link from "next/link";
import Reveal from "@/components/ui/reveal";

export default function ServicesCTA({ locale }: { locale: string }) {
  const t = useTranslations("Services.cta");

  return (
    <section className="border-t border-[var(--border)] py-24 text-center">
      <Container>
        <Reveal>
          <h2 className="text-5xl text-white">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-4 text-[var(--muted)]">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={0.36}>
          <Link
            href={`/${locale}/contacto`}
            className="premium-button mt-8 inline-block overflow-hidden bg-[var(--gold)] px-8 py-4 text-black font-medium transition duration-500 ease-out hover:opacity-90"
          >
            {t("button")} →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
