"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/reveal";

type RenderCardProps = {
  locale: string;
  slug: string;
  titulo: string;
  capaUrl: string;
};

export default function RenderCard({ locale, slug, titulo, capaUrl }: RenderCardProps) {
  const t = useTranslations("Renders.card");

  return (
    <Reveal className="h-full" duration={0.95} y={28}>
      <Link
        href={`/${locale}/renders/${slug}`}
        className="group block h-full"
        aria-label={t("ariaLabel", { titulo })}
      >
        <article className="h-full">
          <div className="relative overflow-hidden bg-neutral-900">
            <div className="relative h-[320px] w-full md:h-[360px]">
              <Image
                src={capaUrl}
                alt={titulo}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </div>

            <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-[900ms] ease-out group-hover:bg-black/25" />

            <div className="absolute right-5 top-5 z-20 flex h-11 w-11 translate-y-3 items-center justify-center border border-white/45 bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-[900ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>

          <div className="pt-5 transition-transform duration-[900ms] ease-out group-hover:-translate-y-1">
            <h3 className="text-[26px] leading-tight text-white transition-colors duration-500 ease-out group-hover:text-[var(--gold)] md:text-[32px]">
              {titulo}
            </h3>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
