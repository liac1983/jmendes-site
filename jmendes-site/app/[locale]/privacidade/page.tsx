import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/container";
import PageHero from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "privacidade");
}

type Section = { heading: string; body: string };

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const sections = t.raw("sections") as Section[];

  return (
    <main>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--gold)]">
              {t("lastUpdated")}
            </p>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {t("intro")}
            </p>

            <div className="mt-14 space-y-10">
              {sections.map((s, i) => (
                <div key={i}>
                  <h2 className="text-2xl leading-snug text-[var(--foreground)] md:text-3xl">
                    {s.heading}
                  </h2>
                  <p className="mt-3 leading-8 text-[var(--muted)]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
