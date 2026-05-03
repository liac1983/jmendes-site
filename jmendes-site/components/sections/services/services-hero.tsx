import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";

export default function ServicesHero() {
  const t = useTranslations("Services.hero");

  return (
    <section className="border-b border-[var(--border)] py-20">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl lg:text-[80px] text-white">
            {t("title")}
          </h1>

          <p className="mt-6 text-xl text-[var(--muted)]">
            {t("subtitle")}
          </p>
        </div>
      </Container>
    </section>
  );
}
