import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import { client } from "@/sanity/lib/client";
import { grupoRenderBySlugQuery, grupoRenderSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { getLocalizedGrupoRender } from "@/lib/render-localization";
import type { SanityGrupoRenderDetail } from "@/sanity/lib/types";
import { getTranslations } from "next-intl/server";

type RenderDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const locales = ["pt", "en", "fr", "es"];

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(grupoRenderSlugsQuery);
    return locales.flatMap((locale) =>
      slugs.map((item) => ({ locale, slug: item.slug }))
    );
  } catch {
    return [];
  }
}

export default async function RenderDetailPage({ params }: RenderDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations("Renders.detail");

  let grupo: SanityGrupoRenderDetail | null = null;
  try {
    grupo = await client.fetch<SanityGrupoRenderDetail | null>(
      grupoRenderBySlugQuery,
      { slug }
    );
  } catch {
    // Network error
  }

  if (!grupo) notFound();

  const localizado = getLocalizedGrupoRender(grupo, locale);
  const capaUrl = urlFor(localizado.capa).width(1800).height(1000).url();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={capaUrl}
          alt={localizado.titulo}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <Container>
            <div className="pb-12">
              <Link
                href={`/${locale}/renders`}
                className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
              >
                ← {t("back")}
              </Link>
              <h1 className="text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                {localizado.titulo}
              </h1>
            </div>
          </Container>
        </div>
      </section>

      {/* Descrição */}
      {localizado.descricao && (
        <section className="border-b border-[var(--border)] py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                {localizado.descricao}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Galeria */}
      {localizado.galeria && localizado.galeria.length > 0 && (
        <section className="border-b border-[var(--border)] py-20 lg:py-28">
          <Container>
            <h2 className="mb-12 text-3xl text-[var(--foreground)] md:text-4xl">
              {t("gallery")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {localizado.galeria.map((imagem, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <Image
                    src={urlFor(imagem).width(1200).height(900).url()}
                    alt={imagem.alt || `${localizado.titulo} ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-[var(--foreground)] md:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-[var(--muted)]">{t("ctaDescription")}</p>
            <Link
              href={`/${locale}/contacto`}
              className="mt-8 inline-flex items-center gap-2 bg-[var(--gold)] px-8 py-4 text-sm font-medium uppercase tracking-widest text-black transition hover:opacity-90"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
