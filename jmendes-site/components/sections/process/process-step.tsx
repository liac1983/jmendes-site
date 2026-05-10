import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import IconBox from "@/components/ui/icon-box";
import clsx from "clsx";
import Reveal, { ImageReveal } from "@/components/ui/reveal";

type Props = {
  reverse?: boolean;
  number: string;
  stepKey: string;
  image: string;
  icon: LucideIcon;
};

export default function ProcessStep({
  reverse = false,
  number,
  stepKey,
  image,
  icon,
}: Props) {
  const t = useTranslations("Process.steps");
  const title = t(`${stepKey}.title`);

  return (
    <section className="py-18 lg:py-22">
      <Container>
        <div
          className={clsx(
            "grid items-center gap-14 lg:grid-cols-2 lg:gap-20",
            reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          )}
        >
          <div className="relative">
            <Reveal y={12}>
              <div className="absolute left-0 top-0 text-[110px] font-semibold leading-none text-[rgba(200,168,90,0.12)] md:text-[140px]">
                {number}
              </div>
            </Reveal>

            <div className="relative z-10 pt-12">
              <Reveal delay={0.08}>
                <IconBox icon={icon} className="mb-8 h-18 w-18" />
              </Reveal>

              <Reveal delay={0.22}>
                <h2 className="max-w-[560px] text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
                  {title}
                </h2>
              </Reveal>

              <Reveal delay={0.38}>
                <p className="mt-6 max-w-[580px] text-xl leading-9 text-[var(--muted)]">
                  {t(`${stepKey}.description`)}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute left-5 top-5 h-full w-full bg-[rgba(200,168,90,0.22)]" />
            <ImageReveal className="relative h-[360px] w-full md:h-[420px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.035]"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
