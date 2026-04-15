import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/container";
import IconBox from "@/components/ui/icon-box";
import clsx from "clsx";

type Props = {
  reverse?: boolean;
  number: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export default function ProcessStep({
  reverse = false,
  number,
  title,
  description,
  image,
  icon,
}: Props) {
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
            <div className="absolute left-0 top-0 text-[110px] font-semibold leading-none text-[rgba(200,168,90,0.12)] md:text-[140px]">
              {number}
            </div>

            <div className="relative z-10 pt-12">
              <IconBox icon={icon} className="mb-8 h-18 w-18" />

              <h2 className="max-w-[560px] text-4xl leading-tight text-[var(--foreground)] md:text-5xl">
                {title}
              </h2>

              <p className="mt-6 max-w-[580px] text-xl leading-9 text-[var(--muted)]">
                {description}
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute left-5 top-5 h-full w-full bg-[rgba(200,168,90,0.22)]" />
            <div className="relative h-[360px] w-full overflow-hidden md:h-[420px]">
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
