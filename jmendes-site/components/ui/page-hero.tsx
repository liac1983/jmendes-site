import Container from "./container";
import Reveal from "./reveal";

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-[var(--border)] py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h1 className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
              {title}
            </h1>
          </Reveal>

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
