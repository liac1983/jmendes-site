import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";

export default function ProcessHero() {
  const t = useTranslations("Process.hero");

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[980px] text-center">
          <Reveal>
            <h1 className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-[82px]">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mx-auto mt-6 max-w-[900px] text-xl leading-9 text-[var(--muted)]">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
