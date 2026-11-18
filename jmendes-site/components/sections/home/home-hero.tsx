import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import Reveal from "@/components/ui/reveal";
import { LineReveal } from "@/components/ui/text-reveal";
import HeroMedia from "./hero-media";

type Props = {
  locale: string;
};

export default function HomeHero({ locale }: Props) {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative min-h-[860px] overflow-hidden border-b border-[var(--border)]">
      <HeroMedia />

      <Container className="relative z-10 flex min-h-[860px] items-center">
        <div className="max-w-[720px] pt-16">
          <LineReveal
            as="h1"
            trigger="mount"
            delay={0.1}
            className="max-w-[680px] text-6xl leading-[0.92] text-[var(--foreground)] md:text-7xl lg:text-[92px]"
            lines={[
              t("titleLine1"),
              t("titleLine2"),
              t("titleLine3"),
              <span key="highlight" className="text-gold-gradient">
                {t("titleHighlight")}
              </span>,
            ]}
          />

          <Reveal delay={0.32} viewportAmount={0.05}>
            <p className="mt-8 max-w-[760px] text-xl leading-9 text-white/90 md:text-[20px]">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={0.54} viewportAmount={0.05}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={`/${locale}/projetos-destaque`} className="min-w-[190px]">
                {t("ctaPrimary")}
              </Button>

              <Button
                href={`/${locale}/orcamento`}
                variant="secondary"
                className="min-w-[210px]"
              >
                {t("ctaSecondary")}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
