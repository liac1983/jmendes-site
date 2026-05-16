"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

type Category = { value: string; label: string };

type Props = {
  activeCategory: string;
  categories: Category[];
  onChange: (category: string) => void;
};

export default function PortfolioFilters({ activeCategory, categories, onChange }: Props) {
  const t = useTranslations("Portfolio.filters");

  const all = [{ value: "todos", label: t("todos") }, ...categories];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {all.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={clsx(
            "inline-flex h-[54px] items-center justify-center border px-8 text-xl transition-all",
            activeCategory === value
              ? "border-[var(--gold)] bg-[var(--gold)] text-black"
              : "border-[var(--border)] bg-transparent text-white hover:border-[var(--gold)] hover:text-[var(--gold)]"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
