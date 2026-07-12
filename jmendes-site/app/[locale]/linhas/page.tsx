import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LinesHero from "@/components/sections/lines/lines-hero";
import ProductLineSection from "@/components/sections/lines/product-line-section";
import LinesAdvantages from "@/components/sections/lines/lines-advantages";
import {client} from "@/sanity/lib/client";
import {productLinesQuery} from "@/sanity/lib/queries";
import {getLocalizedProductLine} from "@/lib/product-line-localization";
import type {ProductLine} from "@/types/product-line";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "linhas");
}

export default async function LinhasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let productLines: ProductLine[] = [];
  try {
    productLines = await client.fetch<ProductLine[]>(productLinesQuery);
  } catch {
    // Network error — render empty lines page
  }
  const localizedProductLines = productLines.map((line) =>
    getLocalizedProductLine(line, locale)
  );

  return (
    <main>
      <LinesHero />

      {localizedProductLines.map((line, index) => (
        <ProductLineSection
          key={line._id}
          locale={locale}
          product={line}
          reverse={index % 2 === 1}
        />
      ))}

      <LinesAdvantages />
    </main>
  );
}
