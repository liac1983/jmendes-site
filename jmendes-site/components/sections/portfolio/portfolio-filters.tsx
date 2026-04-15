"use client";

import type { PortfolioCategory } from "@/data/portfolio";
import { portfolioCategories } from "@/data/portfolio";
import clsx from "clsx";

type Props = {
  activeCategory: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
};

export default function PortfolioFilters({
  activeCategory,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {portfolioCategories.map((category) => (
        <button
          key={category.value}
          type="button"
          onClick={() => onChange(category.value)}
          className={clsx(
            "inline-flex h-[54px] items-center justify-center border px-8 text-xl transition-all",
            activeCategory === category.value
              ? "border-[var(--gold)] bg-[var(--gold)] text-black"
              : "border-[var(--border)] bg-transparent text-white hover:border-[var(--gold)] hover:text-[var(--gold)]"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

