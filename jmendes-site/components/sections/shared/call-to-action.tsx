import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

type Props = {
  locale: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
};

export default function CallToAction({
  locale,
  title,
  subtitle,
  buttonLabel,
  buttonHref,
}: Props) {
  return (
    <section className="border-b border-[var(--border)] py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-[76px]">
            {title.split("projeto ideal").length > 1 ? (
              <>
                Pronto para criar o seu <span className="text-gold">projeto ideal</span>?
              </>
            ) : (
              title
            )}
          </h2>

          <p className="mx-auto mt-6 max-w-[700px] text-xl leading-9 text-[var(--muted)]">
            {subtitle}
          </p>

          <div className="mt-10 flex justify-center">
            <Button href={`/${locale}${buttonHref}`} className="min-w-[210px]">
              {buttonLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
