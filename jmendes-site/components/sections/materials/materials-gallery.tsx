"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";

export type MaterialColor = {
  key: string;
  name: string;
  hex?: string;
  imageUrl?: string;
};

export type MaterialItem = {
  id: string;
  name: string;
  category: string;
  brand?: string;
  reference?: string;
  description?: string;
  imageUrl: string;
  colors: MaterialColor[];
};

type Props = {
  locale: string;
  categories: string[];
  materials: MaterialItem[];
};

function quoteLabel(material: MaterialItem, color?: MaterialColor) {
  return [
    material.name,
    [material.brand, material.reference].filter(Boolean).join(" "),
    color?.name,
  ]
    .filter(Boolean)
    .join(" – ");
}

export default function MaterialsGallery({ locale, categories, materials }: Props) {
  const t = useTranslations("Materials");
  const [category, setCategory] = useState<string>("all");
  const [open, setOpen] = useState<MaterialItem | null>(null);
  const [color, setColor] = useState<MaterialColor | undefined>();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const visible = category === "all" ? materials : materials.filter((m) => m.category === category);
  const usedCategories = categories.filter((c) => materials.some((m) => m.category === c));

  const openMaterial = (material: MaterialItem) => {
    setOpen(material);
    setColor(undefined);
  };

  return (
    <>
      {usedCategories.length > 1 && (
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {["all", ...usedCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`h-[44px] border px-5 text-sm transition-colors ${
                category === c
                  ? "border-[var(--gold)] bg-[var(--gold)] text-black"
                  : "border-[var(--border)] text-white hover:border-[var(--gold)]"
              }`}
            >
              {t(`categories.${c}`)}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((material) => (
          <button
            key={material.id}
            type="button"
            onClick={() => openMaterial(material)}
            className="group text-left"
          >
            <div className="relative aspect-square overflow-hidden border border-[var(--border)]">
              <Image
                src={material.imageUrl}
                alt={material.name}
                fill
                sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[var(--gold)]">
              {t(`categories.${material.category}`)}
              {material.brand ? ` · ${material.brand}` : ""}
            </p>
            <h3 className="mt-1 text-xl text-white">{material.name}</h3>
            {material.colors.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                {material.colors.slice(0, 8).map((c) => (
                  <span
                    key={c.key}
                    title={c.name}
                    className="relative h-5 w-5 overflow-hidden rounded-full border border-white/20"
                    style={c.hex ? { backgroundColor: c.hex } : undefined}
                  >
                    {c.imageUrl && (
                      <Image src={c.imageUrl} alt="" fill sizes="20px" className="object-cover" />
                    )}
                  </span>
                ))}
                {material.colors.length > 8 && (
                  <span className="text-xs text-[var(--muted)]">+{material.colors.length - 8}</span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[960px] overflow-y-auto border border-[var(--border)] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={t("close")}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-black/60 text-white hover:text-[var(--gold)]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square">
                <Image
                  src={color?.imageUrl ?? open.imageUrl}
                  alt={color ? `${open.name} – ${color.name}` : open.name}
                  fill
                  sizes="(min-width: 768px) 480px, 100vw"
                  className="object-cover"
                  style={color?.hex && !color.imageUrl ? { opacity: 0 } : undefined}
                />
                {color?.hex && !color.imageUrl && (
                  <div className="absolute inset-0" style={{ backgroundColor: color.hex }} />
                )}
              </div>

              <div className="space-y-5 p-8">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--gold)]">
                  {t(`categories.${open.category}`)}
                </p>
                <h2 className="text-3xl text-white">{open.name}</h2>
                {(open.brand || open.reference) && (
                  <p className="text-sm text-[var(--muted)]">
                    {[open.brand, open.reference && `${t("reference")} ${open.reference}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
                {open.description && (
                  <p className="leading-7 text-[var(--muted)]">{open.description}</p>
                )}

                {open.colors.length > 0 && (
                  <div>
                    <p className="mb-3 text-sm text-white">
                      {t("colors")}
                      {color ? `: ${color.name}` : ""}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {open.colors.map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          title={c.name}
                          aria-label={c.name}
                          aria-pressed={color?.key === c.key}
                          onClick={() => setColor(color?.key === c.key ? undefined : c)}
                          className={`relative h-11 w-11 overflow-hidden rounded-full border-2 transition ${
                            color?.key === c.key ? "border-[var(--gold)]" : "border-white/20 hover:border-white/60"
                          }`}
                          style={c.hex ? { backgroundColor: c.hex } : undefined}
                        >
                          {c.imageUrl && (
                            <Image src={c.imageUrl} alt="" fill sizes="44px" className="object-cover" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={`/${locale}/orcamento?material=${encodeURIComponent(quoteLabel(open, color))}`}
                  className="inline-flex h-[54px] items-center gap-3 bg-[var(--gold)] px-6 font-medium text-black transition-opacity hover:opacity-90"
                >
                  {t("askQuote")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
