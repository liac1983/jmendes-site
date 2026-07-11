import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import Reveal from "@/components/ui/reveal";
import { testimonials } from "@/data/testimonials";

function Stars() {
  return (
    <div className="mb-5 flex gap-1 text-[var(--gold)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]" />
      ))}
    </div>
  );
}

export default function HomeTestimonials() {
  const t = useTranslations("Home.testimonials");

  if (!testimonials.length) return null;

  const single = testimonials.length === 1;

  return (
    <section className="section-glow border-b border-[var(--border)] py-24 lg:py-32">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        {single ? (
          // Um único testemunho — citação central em destaque.
          <Reveal>
            <figure className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <Stars />
              </div>
              <blockquote className="text-3xl leading-[1.4] text-white md:text-4xl">
                &ldquo;{testimonials[0].quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <span className="text-xl text-gold">— {testimonials[0].author}</span>
                {testimonials[0].role && (
                  <span className="mt-1 block text-sm text-[var(--muted)]">
                    {testimonials[0].role}
                  </span>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ) : (
          // Vários testemunhos — grelha de cartões.
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal key={`${item.author}-${i}`} delay={i * 0.12} className="h-full">
                <figure className="flex h-full flex-col border border-[var(--border)] bg-[var(--surface)] p-8 transition-colors duration-500 ease-out hover:border-[var(--gold)]/40">
                  <Stars />
                  <blockquote className="text-lg leading-8 text-white/90">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <span className="text-gold">— {item.author}</span>
                    {item.role && (
                      <span className="mt-1 block text-sm text-[var(--muted)]">
                        {item.role}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
