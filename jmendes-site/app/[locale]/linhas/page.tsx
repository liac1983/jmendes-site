import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock3, Globe } from "lucide-react";
import { productLineAdvantages, productLines } from "@/data/product-lines";

export default function LinhasPage() {
  return (
    <main className="bg-black text-white">
      <LinhasHero />
      <ProductLinesSection />
      <AdvantagesSection />
      <Footer />
    </main>
  );
}

function LinhasHero() {
  return (
    <section className="border-b border-[#2a2114] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="font-serif text-5xl leading-tight text-white md:text-7xl">
          Linhas de Mobiliário
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70 md:text-2xl">
          Produção própria com entrega rápida. Qualidade premium em série.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#c9a14a] md:text-base">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Produção Própria</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Entrega Rápida</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Garantia Incluída</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductLinesSection() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl space-y-24">
        {productLines.map((line, index) => {
          const reversed = index % 2 !== 0;

          return (
            <article
              key={line.title}
              className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
            >
              <div className={reversed ? "md:order-2" : ""}>
                <div className="relative inline-block">
                  <div className="absolute left-6 top-6 -z-10 h-full w-full bg-[#5e4a22]" />
                  <div className="relative overflow-hidden border border-white/10 bg-[#111]">
                    <Image
                      src={line.image}
                      alt={line.title}
                      width={800}
                      height={900}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className={reversed ? "md:order-1" : ""}>
                <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">
                  {line.title}
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-2xl">
                  {line.description}
                </p>

                <div className="mt-8 flex items-center gap-3 text-[#c9a14a]">
                  <Clock3 className="h-5 w-5" />
                  <span className="text-base font-medium md:text-lg">
                    Prazo de entrega: {line.deliveryTime}
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {line.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-white/75"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a14a]" />
                      <span className="text-lg md:text-2xl">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contacto"
                  className="mt-10 inline-flex items-center gap-3 bg-[#d4af58] px-8 py-4 text-base font-medium text-black transition hover:opacity-90 md:text-xl"
                >
                  Pedir Informação
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AdvantagesSection() {
  return (
    <section className="border-y border-[#2a2114] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            Vantagens das Nossas{" "}
            <span className="text-[#c9a14a]">Linhas de Mobiliário</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/65 md:text-2xl">
            Porque escolher produção em série não significa abdicar de qualidade
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {productLineAdvantages.map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="font-serif text-3xl text-[#c9a14a] md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-white/70 md:text-xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 border-b border-[#2a2114] pb-12 md:grid-cols-4">
        <div>
          <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[#111] text-sm font-semibold text-[#c9a14a]">
            JM
          </div>
          <p className="max-w-xs text-lg leading-relaxed text-white/70">
            Fabricamos mobiliário com precisão, design e excelência desde 1995.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-3xl text-[#c9a14a]">Links Rápidos</h4>
          <ul className="mt-6 space-y-3 text-white/70">
            <li>
              <Link href="/sobre" className="hover:text-white">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="/processo" className="hover:text-white">
                Processo
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white">
                Portfólio
              </Link>
            </li>
            <li>
              <Link href="/servicos" className="hover:text-white">
                Serviços
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-3xl text-[#c9a14a]">Serviços</h4>
          <ul className="mt-6 space-y-3 text-white/70">
            <li>Mobiliário por Medida</li>
            <li>Projetos 3D</li>
            <li>Produção em Série</li>
            <li>Entrega e Montagem</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-3xl text-[#c9a14a]">Contacto</h4>
          <ul className="mt-6 space-y-4 text-white/70">
            <li>+351 XXX XXX XXX</li>
            <li>info@jmendes.pt</li>
            <li className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#c9a14a]" />
              Portugal
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl pt-8 text-center text-sm text-white/50">
        © 2026 J. Mendes Mobiliário. Todos os direitos reservados.
      </div>
    </footer>
  );
}
