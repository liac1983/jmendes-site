import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/reveal";

type ProjectCardProps = {
  locale: string;
  slug: string;
  image: string;
  title: string;
  categoryLabel: string;
  href?: string;
  testimonial?: {
    text: string;
    author: string;
  };
};

export default function ProjectCard({
  locale,
  slug,
  image,
  title,
  categoryLabel,
  href,
  testimonial,
}: ProjectCardProps) {
  const t = useTranslations("Portfolio.card");
  const projectHref = href || `/${locale}/portfolio/${slug}`;

  return (
    <Reveal className="h-full" duration={0.95} y={28}>
      <Link
        href={projectHref}
        className="group block h-full"
        aria-label={t("ariaLabel", { title })}
      >
        <article className="h-full">
          <div className="relative overflow-hidden bg-neutral-900">
            <div className="relative h-[320px] w-full md:h-[360px]">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </div>

            <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-[900ms] ease-out group-hover:bg-black/25" />
            <div className="absolute right-5 top-5 z-20 flex h-11 w-11 translate-y-3 items-center justify-center border border-white/45 bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-[900ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5" />
            </div>

            {testimonial && (
              <div className="absolute inset-x-0 bottom-0 z-20 bg-black/65 p-5 backdrop-blur-sm transition-transform duration-[900ms] ease-out group-hover:-translate-y-1">
                <div className="mb-3 flex gap-1 text-[var(--gold)]">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="text-base leading-7 text-white">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="mt-2 text-base text-[var(--gold)]">
                  - {testimonial.author}
                </p>
              </div>
            )}
          </div>

          <div className="pt-5 transition-transform duration-[900ms] ease-out group-hover:-translate-y-1">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
              {categoryLabel}
            </p>

            <h3 className="mt-3 text-[26px] leading-tight text-white transition-colors duration-500 ease-out group-hover:text-[var(--gold)] md:text-[32px]">
              {title}
            </h3>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
