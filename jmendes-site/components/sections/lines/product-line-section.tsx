import Image from "next/image";
import { CheckCircle2, Clock3 } from "lucide-react";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import type { ProductLine } from "@/data/product-lines";
import clsx from "clsx";

type Props = ProductLine & {
  reverse?: boolean;
  locale: string;
};

export default function ProductLineSection({
  title,
  description,
  deliveryTime,
  features,
  image,
  reverse = false,
  locale,
}: Props) {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <div
          className={clsx(
            "grid items-center gap-14 lg:grid-cols-2 lg:gap-20",
            reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          <div>
            <h2 className="text-5xl leading-tight text-white md:text-6xl">
              {title}
            </h2>

            <p className="mt-6 max-w-[620px] text-xl leading-9 text-[var(--muted)]">
              {description}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 text-xl text-[var(--gold)]">
              <Clock3 className="h-5 w-5" />
              <span>Prazo de entrega: {deliveryTime}</span>
            </div>

            <ul className="mt-8 space-y-5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-4 text-xl leading-8 text-[var(--muted)]"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={`/${locale}/contacto`} className="min-w-[220px]">
                Pedir Informação
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute left-5 top-5 h-full w-full bg-[rgba(200,168,90,0.22)]" />
            <div className="relative h-[420px] w-full overflow-hidden md:h-[520px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

