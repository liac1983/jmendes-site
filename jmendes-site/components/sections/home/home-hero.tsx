import Image from "next/image";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

type Props = {
  locale: string;
};

export default function HomeHero({ locale }: Props) {
  return (
    <section className="relative min-h-[860px] overflow-hidden border-b border-[var(--border)]">
      <Image
        src="/images/home/hero-workshop.jpg"
        alt="Oficina J. Mendes Mobiliário"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />

      <Container className="relative z-10 flex min-h-[860px] items-center">
        <div className="max-w-[720px] pt-16">
          <h1 className="max-w-[680px] text-6xl leading-[0.92] text-[var(--foreground)] md:text-7xl lg:text-[92px]">
            Fabricamos
            <br />
            mobiliário com
            <br />
            precisão, design e
            <br />
            <span className="text-gold">excelência</span>
          </h1>

          <p className="mt-8 max-w-[760px] text-xl leading-9 text-white/90 md:text-[20px]">
            Desde 1995 a criar soluções únicas em mobiliário, combinando tradição
            artesanal com tecnologia de ponta.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`/${locale}/portfolio`} className="min-w-[190px]">
              Ver Projetos
            </Button>

            <Button
              href={`/${locale}/contacto`}
              variant="secondary"
              className="min-w-[210px]"
            >
              Pedir Orçamento
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
