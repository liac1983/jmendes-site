import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import Link from "next/link";

export default function ServicesCTA({ locale }: { locale: string }) {
  const t = useTranslations("Services.cta");

  return (
    <section className="border-t border-[var(--border)] py-24 text-center">
      <Container>
        <h2 className="text-5xl text-white">
          {t("title")}
        </h2>

        <p className="mt-4 text-[var(--muted)]">
          {t("description")}
        </p>

        <Link
          href={`/${locale}/contacto`}
          className="mt-8 inline-block bg-[var(--gold)] px-8 py-4 text-black font-medium"
        >
          {t("button")} →
        </Link>
      </Container>
    </section>
  );
}
