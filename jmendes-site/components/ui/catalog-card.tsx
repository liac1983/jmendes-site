"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/reveal";

type CatalogCardProps = {
  nome: string;
  pdfUrl: string;
  capaUrl: string;
  dataFormatada?: string;
};

export default function CatalogCard({
  nome,
  pdfUrl,
  capaUrl,
  dataFormatada,
}: CatalogCardProps) {
  const t = useTranslations("Catalogos.card");

  return (
    <Reveal className="h-full" duration={0.95} y={28}>
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
        aria-label={t("ariaLabel", { nome })}
      >
        <article className="h-full">
          <div className="relative overflow-hidden bg-neutral-900 ring-1 ring-white/[0.06] transition-all duration-700 ease-out group-hover:ring-[var(--gold)]/40 group-hover:shadow-[0_28px_80px_-24px_rgba(200,168,90,0.45)]">
            <div className="relative h-[400px] w-full">
              <Image
                src={capaUrl}
                alt={nome}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </div>

            <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-[900ms] ease-out group-hover:bg-black/30" />

            <div className="absolute right-5 top-5 z-20 flex h-11 w-11 translate-y-3 items-center justify-center border border-white/45 bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-[900ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <Download className="h-5 w-5" />
            </div>
          </div>

          <div className="pt-5 transition-transform duration-[900ms] ease-out group-hover:-translate-y-1">
            {dataFormatada && (
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
                {dataFormatada}
              </p>
            )}
            <h3 className="mt-3 text-[26px] leading-tight text-white transition-colors duration-500 ease-out group-hover:text-[var(--gold)] md:text-[32px]">
              {nome}
            </h3>
          </div>
        </article>
      </a>
    </Reveal>
  );
}
