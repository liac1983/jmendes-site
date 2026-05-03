import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";

const advantageKeys = [
  "fastDelivery",
  "competitivePrices",
  "guaranteedQuality",
  "customizable",
] as const;

export default function LinesAdvantages() {
  const t = useTranslations("Lines.advantages");

  return (
    <section className="border-t border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="text-5xl leading-tight text-white md:text-6xl lg:text-[72px]">
            {t("title")}{" "}
            <span className="text-[var(--gold)]">{t("titleHighlight")}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[900px] text-xl leading-9 text-[var(--muted)]">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {advantageKeys.map((key) => (
            <div key={key} className="text-center">
              <h3 className="text-3xl text-[var(--gold)]">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mx-auto mt-4 max-w-[260px] text-lg leading-8 text-[var(--muted)]">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
