import Link from "next/link";
import {urlFor} from "@/sanity/lib/image";
import type {ProductLine} from "@/types/product-line";

type ProductLineSectionProps = {
  locale: string;
  product: ProductLine;
  reverse?: boolean;
};

export default function ProductLineSection({
  locale,
  product,
  reverse = false,
}: ProductLineSectionProps) {
  const availabilityLabel =
    product.availability === "available" ? "Disponível" : "Indisponível";

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <article
          className={`grid items-center gap-12 border-b border-[#2A2116] pb-16 lg:grid-cols-2 ${
            reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
          }`}
        >
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8A45D]">
              {product.category}
            </p>

            <h2 className="font-serif text-4xl md:text-5xl">
              {product.title}
            </h2>

            <p className="max-w-xl text-lg text-white/70">
              {product.subtitle}
            </p>

            <div className="space-y-4">
              <p className="text-[#C8A45D]">{availabilityLabel}</p>

              <ul className="space-y-3 text-white/80">
                {(product.highlights ?? []).map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>

            <Link
              href={`/${locale}/linhas/${product.slug}`}
              className="inline-flex items-center gap-3 bg-[#C8A45D] px-8 py-4 text-base font-medium text-black transition hover:opacity-90"
            >
              Ver detalhes
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute bottom-[-16px] right-[-16px] h-full w-full border border-[#5B4726]" />
            {product.heroImage?.asset && (
              <img
                src={urlFor(product.heroImage).width(1200).height(900).fit("crop").url()}
                alt={product.heroImage.alt || product.title}
                className="relative z-10 h-[520px] w-full object-cover"
              />
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
