import Container from "./container";

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-[var(--border)] py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-6 text-lg text-[var(--muted)] md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
