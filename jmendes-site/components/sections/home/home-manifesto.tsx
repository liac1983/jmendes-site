import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Button from "@/components/ui/button";

type Props = {
  locale: string;
};

export default function HomeManifesto({ locale }: Props) {
  const t = useTranslations("Home.manifesto");

  return (
    <section className="section-glow border-b border-[var(--border)] py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="mb-6 text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
              {t("eyebrow")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-4xl leading-tight text-[var(--foreground)] md:text-5xl lg:text-[54px]">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-8 text-lg leading-8 text-[var(--muted)] md:text-xl">
              {t("paragraph1")}
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)] md:text-xl">
              {t("paragraph2")}
            </p>
          </Reveal>

          <Reveal delay={0.46}>
            <div className="mt-10 flex justify-center">
              <Button href={`/${locale}/sobre`} variant="secondary">
                {t("cta")}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
