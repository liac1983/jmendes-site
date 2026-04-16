import Link from "next/link";
import Image from "next/image";

type ProjectCardProps = {
  locale: string;
  slug: string;
  image: string;
  title: string;
  categoryLabel: string;
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
  testimonial,
}: ProjectCardProps) {
  return (
    <Link
      href={`/${locale}/portfolio/${slug}`}
      className="group block"
      aria-label={`Ver projeto ${title}`}
    >
      <article>
        <div className="relative overflow-hidden bg-neutral-900">
          <div className="relative h-[320px] w-full md:h-[360px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          {testimonial && (
            <div className="absolute inset-x-0 bottom-0 bg-black/65 p-5 backdrop-blur-sm">
              <div className="mb-3 flex gap-1 text-[var(--gold)]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="text-base leading-7 text-white">
                "{testimonial.text}"
              </p>
              <p className="mt-2 text-base text-[var(--gold)]">
                - {testimonial.author}
              </p>
            </div>
          )}
        </div>

        <div className="pt-5">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
            {categoryLabel}
          </p>

          <h3 className="mt-3 text-[26px] leading-tight text-white transition-colors duration-300 group-hover:text-[var(--gold)] md:text-[32px]">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
}

