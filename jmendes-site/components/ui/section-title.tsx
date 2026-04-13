import clsx from "clsx";

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
      <h2 className="text-4xl leading-tight text-[var(--foreground)] md:text-5xl lg:text-6xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--muted)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
