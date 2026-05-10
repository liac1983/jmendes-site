import clsx from "clsx";
import Reveal from "./reveal";

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
        "mb-14",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <Reveal>
        <h2 className="text-5xl leading-tight text-[var(--foreground)] md:text-6xl lg:text-[76px]">
          {title}
        </h2>
      </Reveal>

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
