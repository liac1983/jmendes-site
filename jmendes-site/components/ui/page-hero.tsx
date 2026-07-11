import Container from "./container";
import Reveal from "./reveal";
import { WordReveal } from "./text-reveal";

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="section-glow border-b border-[var(--border)] py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <WordReveal
            as="h1"
            trigger="mount"
            text={title}
            className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-7xl"
          />

          {subtitle && (
            <Reveal delay={0.18}>
              <p className="mt-6 text-lg text-[var(--muted)] md:text-xl">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
