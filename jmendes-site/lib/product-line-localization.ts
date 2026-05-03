import type {ProductLine, ProductLineTranslation} from "@/types/product-line";

type LocaleKey = "pt" | "en" | "fr" | "es";

const categoryLabelKeys = {
  "cozinhas-modulares": "modularKitchens",
  "roupeiros-modulares": "modularWardrobes",
  "mobiliario-de-sala": "livingFurniture",
} as const;

type ProductLineCategory = keyof typeof categoryLabelKeys;
export type ProductLineCategoryLabelKey =
  (typeof categoryLabelKeys)[ProductLineCategory];

function localizedValue<T>(translated: T | undefined, fallback: T): T {
  if (Array.isArray(translated)) {
    return translated.length ? translated : fallback;
  }

  return translated || fallback;
}

export function getLocalizedProductLine(
  product: ProductLine,
  locale: string
): ProductLine {
  const translation =
    locale === "pt"
      ? undefined
      : product.translations?.[locale as LocaleKey];

  if (!translation) {
    return product;
  }

  const translatedDimensions: ProductLineTranslation["dimensions"] =
    translation.dimensions;

  return {
    ...product,
    title: localizedValue(translation.title, product.title),
    subtitle: localizedValue(translation.subtitle, product.subtitle),
    aboutText: localizedValue(translation.aboutText, product.aboutText),
    highlights: localizedValue(translation.highlights, product.highlights),
    materials: localizedValue(translation.materials, product.materials),
    finishes: localizedValue(translation.finishes, product.finishes),
    dimensions: {
      width: localizedValue(
        translatedDimensions?.width,
        product.dimensions?.width
      ),
      height: localizedValue(
        translatedDimensions?.height,
        product.dimensions?.height
      ),
      depth: localizedValue(
        translatedDimensions?.depth,
        product.dimensions?.depth
      ),
    },
    technicalFeatures: localizedValue(
      translation.technicalFeatures,
      product.technicalFeatures
    ),
    advantages: localizedValue(translation.advantages, product.advantages),
    idealFor: localizedValue(translation.idealFor, product.idealFor),
  };
}

export function getProductLineCategoryLabelKey(
  category: string
): ProductLineCategoryLabelKey | undefined {
  return categoryLabelKeys[category as ProductLineCategory];
}
