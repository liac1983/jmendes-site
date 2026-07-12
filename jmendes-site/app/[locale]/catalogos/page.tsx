import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Container from "@/components/ui/container";
import PageHero from "@/components/ui/page-hero";
import CatalogCard from "@/components/ui/catalog-card";
import { client } from "@/sanity/lib/client";
import { catalogosQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityCatalogo } from "@/sanity/lib/types";
import { getTranslations } from "next-intl/server";

type CatalogosPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "catalogos");
}

export default async function CatalogosPage({ params }: CatalogosPageProps) {
  const { locale } = await params;
  const t = await getTranslations("Catalogos.index");

  let catalogos: SanityCatalogo[] = [];
  try {
    catalogos = await client.fetch<SanityCatalogo[]>(catalogosQuery);
  } catch {
    // Sem catálogos disponíveis
  }

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="border-b border-[var(--border)] py-20 lg:py-28">
        <Container>
          {catalogos.length === 0 ? (
            <p className="text-center text-[var(--muted)]">{t("empty")}</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {catalogos.map((catalogo) => {
                const capaUrl = urlFor(catalogo.capa).width(600).height(800).url();

                const dataFormatada = catalogo.dataPublicacao
                  ? new Intl.DateTimeFormat(locale, {
                      year: "numeric",
                      month: "long",
                    }).format(new Date(catalogo.dataPublicacao))
                  : undefined;

                return (
                  <CatalogCard
                    key={catalogo._id}
                    nome={catalogo.nome}
                    pdfUrl={catalogo.pdfUrl}
                    capaUrl={capaUrl}
                    dataFormatada={dataFormatada}
                  />
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
