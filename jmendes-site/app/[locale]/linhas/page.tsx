import LinesHero from "@/components/sections/lines/lines-hero";
import ProductLineSection from "@/components/sections/lines/product-line-section";
import LinesAdvantages from "@/components/sections/lines/lines-advantages";
import { productLines } from "@/data/product-lines";

export default async function LinhasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <LinesHero />

      {productLines.map((line, index) => (
        <ProductLineSection
          key={line.slug}
          locale={locale}
          product={line}
          reverse={index % 2 === 1}
        />
      ))}

      <LinesAdvantages />
    </main>
  );
}