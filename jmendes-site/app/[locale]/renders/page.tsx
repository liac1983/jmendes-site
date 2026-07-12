import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Container from "@/components/ui/container";
import PageHero from "@/components/ui/page-hero";
import RenderCard from "@/components/ui/render-card";
import { client } from "@/sanity/lib/client";
import { gruposRenderQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { getLocalizedGrupoRender } from "@/lib/render-localization";
import type { SanityGrupoRender } from "@/sanity/lib/types";
import { getTranslations } from "next-intl/server";

type RendersPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "renders");
}

export default async function RendersPage({ params }: RendersPageProps) {
  const { locale } = await params;
  const t = await getTranslations("Renders.index");

  let grupos: SanityGrupoRender[] = [];
  try {
    grupos = await client.fetch<SanityGrupoRender[]>(gruposRenderQuery);
  } catch {
    // Sem grupos disponíveis
  }

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="border-b border-[var(--border)] py-20 lg:py-28">
        <Container>
          {grupos.length === 0 ? (
            <p className="text-center text-[var(--muted)]">{t("empty")}</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {grupos.map((grupo) => {
                const localizado = getLocalizedGrupoRender(grupo, locale);
                const capaUrl = urlFor(localizado.capa).width(800).height(600).url();

                return (
                  <RenderCard
                    key={localizado._id}
                    locale={locale}
                    slug={localizado.slug}
                    titulo={localizado.titulo}
                    capaUrl={capaUrl}
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
