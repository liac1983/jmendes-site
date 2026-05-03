"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import type { PortfolioCategory } from "./portfolio-grid";

type Props = {
  activeCategory: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
};

const portfolioCategories: PortfolioCategory[] = [
  "todos",
  "cozinhas",
  "roupeiros",
  "comercial",
  "casas-completas",
];

export default function PortfolioFilters({
  activeCategory,
  onChange,
}: Props) {
  const t = useTranslations("Portfolio.filters");

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {portfolioCategories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={clsx(
            "inline-flex h-[54px] items-center justify-center border px-8 text-xl transition-all",
            activeCategory === category
              ? "border-[var(--gold)] bg-[var(--gold)] text-black"
              : "border-[var(--border)] bg-transparent text-white hover:border-[var(--gold)] hover:text-[var(--gold)]"
          )}
        >
          {t(category)}
        </button>
      ))}
    </div>
  );
}
