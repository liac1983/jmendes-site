import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import Reveal from "@/components/ui/reveal";

type Props = {
  locale: string;
};

export default function HomeHero({ locale }: Props) {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative min-h-[860px] overflow-hidden border-b border-[var(--border)]">
      <Image
        src="/images/home/hero-workshop.jpg"
        alt="Oficina J. Mendes Mobiliário"
        fill
        priority
        className="hero-slow-zoom object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />

      <Container className="relative z-10 flex min-h-[860px] items-center">
        <div className="max-w-[720px] pt-16">
          <Reveal delay={0.1} viewportAmount={0.05}>
            <h1 className="max-w-[680px] text-6xl leading-[0.92] text-[var(--foreground)] md:text-7xl lg:text-[92px]">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
              <br />
              {t("titleLine3")}
              <br />
              <span className="text-gold">{t("titleHighlight")}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.32} viewportAmount={0.05}>
            <p className="mt-8 max-w-[760px] text-xl leading-9 text-white/90 md:text-[20px]">
              {t("description")}
            </p>
          </Reveal>

          <Reveal delay={0.54} viewportAmount={0.05}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={`/${locale}/portfolio`} className="min-w-[190px]">
                {t("ctaPrimary")}
              </Button>

              <Button
                href={`/${locale}/contacto`}
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
