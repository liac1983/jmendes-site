import Link from "next/link";
import {notFound} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {
  productLineBySlugQuery,
  productLineSlugsQuery,
} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";
import type {ProductLine} from "@/types/product-line";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const locales = ["pt", "en", "fr", "es"];

export async function generateStaticParams() {
  const slugs = await client.fetch<{slug: string}[]>(productLineSlugsQuery);

  return locales.flatMap((locale) =>
    slugs.map((item) => ({
      locale,
      slug: item.slug,
    }))
  );
}

export default async function ProductLineDetailPage({params}: PageProps) {
  const {locale, slug} = await params;

  const product = await client.fetch<ProductLine | null>(
    productLineBySlugQuery,
    {slug}
  );

  if (!product) notFound();

  const availabilityLabel =
    product.availability === "available" ? "Disponível" : "Indisponível";

  return (
    <main className="bg-black text-white">
      <section className="border-b border-[#2A2116]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            href={`/${locale}/linhas`}
            className="inline-flex items-center gap-2 text-white/70 transition hover:text-white"
          >
            <span>←</span>
            Voltar às Linhas
          </Link>
        </div>
      </section>

      <section className="relative min-h-[78vh] overflow-hidden">
        <div className="absolute inset-0">
          {product.heroImage?.asset && (
            <img
              src={urlFor(product.heroImage).width(1800).height(1100).fit("crop").url()}
              alt={product.heroImage.alt || product.title}
              className="h-full w-full object-cover opacity-45"
            />
          )}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        </div>

        <div className="relative mx-auto flex max-w-7xl items-center px-6 py-24 md:py-32">
          <div className="max-w-4xl space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C8A45D]">
              {product.category}
            </p>

            <h1 className="font-serif text-5xl md:text-7xl">
              {product.title}
            </h1>

            <p className="max-w-2xl text-xl text-white/80">
              {product.subtitle}
            </p>

            <div className="inline-flex items-center gap-3 border border-[#C8A45D] px-6 py-3 text-[#C8A45D]">
              {availabilityLabel}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#2A2116]">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl">Sobre o Modelo</h2>
            <p className="text-xl leading-relaxed text-white/75">
              {product.aboutText}
            </p>
          </div>

          <div className="relative">
            <div className="absolute bottom-[-16px] right-[-16px] h-full w-full border border-[#5B4726]" />
            {product.aboutImage?.asset && (
              <img
                src={urlFor(product.aboutImage).width(1200).height(900).fit("crop").url()}
                alt={product.aboutImage.alt || product.title}
                className="relative z-10 h-[420px] w-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-[#2A2116]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl">
              Materiais & Acabamentos
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Especificações fixas de produção
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="border border-[#2A2116] p-10">
              <h3 className="mb-8 font-serif text-3xl text-[#C8A45D]">
                Materiais
              </h3>

              <ul className="space-y-5 text-xl text-white/75">
                {(product.materials ?? []).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 bg-[#C8A45D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#2A2116] p-10">
              <h3 className="mb-8 font-serif text-3xl text-[#C8A45D]">
                Acabamentos
              </h3>

              <ul className="space-y-5 text-xl text-white/75">
                {(product.finishes ?? []).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 bg-[#C8A45D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#2A2116]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl">
              Dimensões & Ficha Técnica
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Especificações detalhadas do produto
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="border border-[#2A2116] p-10">
              <h3 className="mb-10 font-serif text-3xl">Dimensões</h3>

              <div className="space-y-6 text-lg">
                <div className="flex items-center justify-between border-b border-[#2A2116] pb-5">
                  <span className="text-white/70">Largura</span>
                  <span>{product.dimensions?.width}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#2A2116] pb-5">
                  <span className="text-white/70">Altura</span>
                  <span>{product.dimensions?.height}</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-white/70">Profundidade</span>
                  <span>{product.dimensions?.depth}</span>
                </div>
              </div>
            </div>

            <div className="border border-[#2A2116] p-10">
              <h3 className="mb-8 font-serif text-3xl">Ficha Técnica</h3>

              <ul className="space-y-5 text-xl text-white/75">
                {(product.technicalFeatures ?? []).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#C8A45D]">◌</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#2A2116]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl">Galeria</h2>
            <p className="mt-4 text-lg text-white/60">
              Veja os detalhes do produto
            </p>
          </div>

          <div className="grid gap-8">
            {(product.gallery ?? []).map((image, index) =>
              image?.asset ? (
                <img
                  key={`${product._id}-${index}`}
                  src={urlFor(image).width(1600).height(1000).fit("crop").url()}
                  alt={image.alt || `${product.title} ${index + 1}`}
                  className="h-[520px] w-full object-cover"
                />
              ) : null
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-[#2A2116]">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
          <div>
            <h2 className="mb-10 font-serif text-4xl md:text-5xl">
              Vantagens
            </h2>

            <ul className="space-y-6 text-xl text-white/75">
              {(product.advantages ?? []).map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="text-[#C8A45D]">◌</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-10 font-serif text-4xl md:text-5xl">
              Ideal Para
            </h2>

            <ul className="space-y-6 text-xl text-white/75">
              {(product.idealFor ?? []).map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-2 h-2 w-2 bg-[#C8A45D]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="font-serif text-5xl md:text-6xl">
            Interessado neste produto?
          </h2>

          <p className="mt-6 text-xl text-white/70">
            Entre em contacto connosco para mais informações sobre este produto
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center justify-center gap-3 bg-[#C8A45D] px-8 py-4 text-lg font-medium text-black transition hover:opacity-90"
            >
              Pedir Informações
              <span>→</span>
            </Link>

            <Link
              href={`/${locale}/linhas`}
              className="inline-flex items-center justify-center border border-[#C8A45D] px-8 py-4 text-lg font-medium text-[#C8A45D] transition hover:bg-[#C8A45D] hover:text-black"
            >
              Ver Mais Produtos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

