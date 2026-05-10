import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";

const heroBadgeKeys = ["production", "delivery", "warranty"] as const;

export default function LinesHero() {
  const t = useTranslations("Lines.hero");

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[980px] text-center">
          <Reveal>
            <h1 className="text-6xl leading-tight text-white md:text-7xl lg:text-[82px]">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mx-auto mt-6 max-w-[950px] text-xl leading-9 text-[var(--muted)]">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-lg text-[var(--muted)]">
              {heroBadgeKeys.map((key) => (
                <div key={key} className="inline-flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--gold)]" />
                  <span>{t(`badges.${key}`)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
