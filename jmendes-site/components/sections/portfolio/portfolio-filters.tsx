"use client";

import clsx from "clsx";
import type { PortfolioCategory } from "./portfolio-grid";

type Props = {
  activeCategory: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
};

const portfolioCategories: { value: PortfolioCategory; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "cozinhas", label: "Cozinhas" },
  { value: "roupeiros", label: "Roupeiros" },
  { value: "comercial", label: "Comercial" },
  { value: "casas-completas", label: "Casas Completas" },
];

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
