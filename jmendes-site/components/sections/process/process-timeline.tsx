import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";

const timelineItems = [
  "briefing",
  "project3d",
  "production",
  "finishes",
  "delivery",
];

export default function ProcessTimeline() {
  const t = useTranslations("Process.timeline");

  return (
    <section className="border-t border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[1100px] text-center">
          <Reveal>
            <h2 className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-[72px]">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-5 text-xl text-[var(--muted)]">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1180px]">
          <Reveal delay={0.22} y={0}>
            <div className="absolute left-0 right-0 top-9 hidden border-t border-[rgba(200,168,90,0.55)] md:block" />
          </Reveal>

          <div className="grid gap-10 md:grid-cols-5">
            {timelineItems.map((item, index) => (
              <Reveal key={item} delay={0.12 + index * 0.08}>
                <div className="group text-center">
                  <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[var(--gold)] text-3xl font-semibold text-black transition duration-700 ease-out group-hover:scale-105 group-hover:shadow-[0_0_38px_rgba(200,168,90,0.18)]">
                    {index + 1}
                  </div>

                  <p className="mx-auto mt-5 max-w-[150px] text-xl leading-8 text-[var(--muted)] transition-colors duration-500 ease-out group-hover:text-white">
                    {t(`items.${item}`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
