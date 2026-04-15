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
          key={line.title}
          locale={locale}
          title={line.title}
          description={line.description}
          deliveryTime={line.deliveryTime}
          features={line.features}
          image={line.image}
          reverse={index % 2 === 1}
        />
      ))}

      <LinesAdvantages />
    </main>
  );
}