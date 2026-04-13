import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = clsx(
    "inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium transition-all duration-300",
    variant === "primary" &&
      "bg-[var(--gold)] text-black hover:opacity-90",
    variant === "secondary" &&
      "border border-[var(--gold)] bg-transparent text-[var(--gold)] hover:bg-[rgba(200,168,90,0.08)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
}
