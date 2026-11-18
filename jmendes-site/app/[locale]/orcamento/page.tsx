import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import Container from "@/components/ui/container";
import PageHero from "@/components/ui/page-hero";
import QuoteForm from "@/components/sections/quote/quote-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "orcamento");
}

export default async function OrcamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ material?: string | string[] }>;
}) {
  const t = await getTranslations("Quote");
  const { material } = await searchParams;
  const materials = (Array.isArray(material) ? material : material ? [material] : [])
    .map((m) => m.slice(0, 200))
    .join("\n");

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="border-b border-[var(--border)] py-20 lg:py-24">
        <Container>
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.8fr_1.4fr]">
            <div className="space-y-6 text-[var(--muted)]">
              <h2 className="text-3xl text-white">{t("intro.title")}</h2>
              <p className="leading-7">{t("intro.paragraph1")}</p>
              <p className="leading-7">{t("intro.paragraph2")}</p>
              <ol className="space-y-3 border-l border-[var(--gold)] pl-6">
                <li>{t("intro.step1")}</li>
                <li>{t("intro.step2")}</li>
                <li>{t("intro.step3")}</li>
              </ol>
            </div>
            <QuoteForm initialMaterials={materials} />
          </div>
        </Container>
      </section>
    </>
  );
}
