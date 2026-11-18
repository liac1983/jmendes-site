import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Image } from "sanity";
import { pageMetadata } from "@/lib/seo";
import Container from "@/components/ui/container";
import PageHero from "@/components/ui/page-hero";
import MaterialsGallery, {
  type MaterialItem,
} from "@/components/sections/materials/materials-gallery";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { materialsQuery } from "@/sanity/lib/queries";
import { materialCategories } from "@/lib/material-categories";

type SanityMaterial = {
  _id: string;
  nome: string;
  categoria: string;
  marca?: string;
  referencia?: string;
  descricao?: string;
  imagem: Image;
  cores?: { _key: string; nome: string; hex?: string; imagem?: Image }[];
  traducoes?: Partial<Record<"en" | "fr" | "es", { nome?: string; descricao?: string }>>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "materiais");
}

export default async function MateriaisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Materials");

  let raw: SanityMaterial[] = [];
  try {
    raw = await client.fetch<SanityMaterial[]>(materialsQuery);
  } catch {
    // Sem materiais disponíveis
  }

  const materials: MaterialItem[] = raw
    .filter((m) => m.imagem?.asset)
    .map((m) => {
      const tr = locale === "pt" ? undefined : m.traducoes?.[locale as "en" | "fr" | "es"];
      return {
        id: m._id,
        name: tr?.nome || m.nome,
        category: m.categoria,
        brand: m.marca,
        reference: m.referencia,
        description: tr?.descricao || m.descricao,
        imageUrl: urlFor(m.imagem).width(1200).height(1200).auto("format").url(),
        colors: (m.cores ?? []).map((c) => ({
          key: c._key,
          name: c.nome,
          hex: c.hex,
          imageUrl: c.imagem?.asset
            ? urlFor(c.imagem).width(1200).height(1200).auto("format").url()
            : undefined,
        })),
      };
    });

  return (
    <>
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="border-b border-[var(--border)] py-20 lg:py-28">
        <Container>
          {materials.length === 0 ? (
            <p className="text-center text-[var(--muted)]">{t("empty")}</p>
          ) : (
            <MaterialsGallery
              locale={locale}
              categories={materialCategories.map((c) => c.value)}
              materials={materials}
            />
          )}

          <div className="mx-auto mt-20 max-w-2xl text-center">
            <p className="text-lg text-[var(--muted)]">{t("cta.text")}</p>
            <Link
              href={`/${locale}/orcamento`}
              className="mt-6 inline-flex h-[56px] items-center bg-[var(--gold)] px-8 font-medium text-black transition-opacity hover:opacity-90"
            >
              {t("cta.button")}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
