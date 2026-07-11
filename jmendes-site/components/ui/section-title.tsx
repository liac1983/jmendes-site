import clsx from "clsx";
import Reveal from "./reveal";
import { WordReveal } from "./text-reveal";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={clsx(
        "mb-16 lg:mb-20",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <WordReveal
        as="h2"
        text={title}
        className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-[76px]"
      />

      {subtitle && (
        <Reveal delay={0.18}>
          <p className="mx-auto mt-5 max-w-3xl text-xl leading-9 text-[var(--muted)]">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
