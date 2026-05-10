import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";

export default function ServicesHero() {
  const t = useTranslations("Services.hero");

  return (
    <section className="border-b border-[var(--border)] py-20">
      <Container>
        <div className="text-center">
          <Reveal>
            <h1 className="text-6xl text-white lg:text-[80px]">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 text-xl text-[var(--muted)]">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
