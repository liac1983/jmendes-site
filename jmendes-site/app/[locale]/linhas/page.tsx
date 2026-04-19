import LinesHero from "@/components/sections/lines/lines-hero";
import ProductLineSection from "@/components/sections/lines/product-line-section";
import LinesAdvantages from "@/components/sections/lines/lines-advantages";
import {client} from "@/sanity/lib/client";
import {productLinesQuery} from "@/sanity/lib/queries";
import type {ProductLine} from "@/types/product-line";

export default async function LinhasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const productLines = await client.fetch<ProductLine[]>(productLinesQuery);

  return (
    <main>
      <LinesHero />

      {productLines.map((line, index) => (
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
