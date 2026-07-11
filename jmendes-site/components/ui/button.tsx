import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";
import Magnetic from "./magnetic";

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
    "premium-button inline-flex h-[64px] items-center justify-center overflow-hidden px-8 text-[17px] font-medium transition-all duration-500 ease-out",
    variant === "primary" &&
      "bg-[var(--gold)] text-black hover:opacity-90",
    variant === "secondary" &&
      "border border-[var(--gold)] bg-transparent text-[var(--gold)] hover:bg-[rgba(200,168,90,0.08)]",
    className
  );

  if (href) {
    return (
      <Magnetic>
        <Link href={href} className={styles}>
          {children}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <button className={styles}>{children}</button>
    </Magnetic>
  );
}
