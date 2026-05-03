import type {
  SanityProjectDetail,
  SanityProjectTranslation,
  SanityProjectTranslations,
} from "@/sanity/lib/types";

type LocaleKey = "pt" | "en" | "fr" | "es";
type PortfolioCategory = SanityProjectDetail["category"];
type LocalizableProject = {
  title: string;
  categoryLabel?: string;
  location?: string;
  typeLabel?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  materials?: string[];
  finishes?: string[];
  testimonialAuthor?: string;
  testimonialText?: string;
  translations?: SanityProjectTranslations;
};

const knownPortfolioLabelKeys: Record<string, string> = {
  "Por Medida": "customMade",
  "Projeto Completo": "completeProject",
  Comercial: "commercial",
  Cozinhas: "kitchens",
  Roupeiros: "wardrobes",
  "Casas Completas": "completeHomes",
};

function localizedValue<T>(translated: T | undefined, fallback: T): T {
  if (Array.isArray(translated)) {
    return translated.length ? translated : fallback;
  }

  return translated || fallback;
}

export function getLocalizedProject<T extends LocalizableProject>(
  project: T,
  locale: string
): T {
  const translation: SanityProjectTranslation | undefined =
    locale === "pt" ? undefined : project.translations?.[locale as LocaleKey];

  if (!translation) {
    return project;
  }

  return {
    ...project,
    title: localizedValue(translation.title, project.title),
    categoryLabel: localizedValue(
      translation.categoryLabel,
      project.categoryLabel
    ),
    location: localizedValue(translation.location, project.location),
    typeLabel: localizedValue(translation.typeLabel, project.typeLabel),
    description: localizedValue(translation.description, project.description),
    challenge: localizedValue(translation.challenge, project.challenge),
    solution: localizedValue(translation.solution, project.solution),
    materials: localizedValue(translation.materials, project.materials),
    finishes: localizedValue(translation.finishes, project.finishes),
    testimonialAuthor: localizedValue(
      translation.testimonialAuthor,
      project.testimonialAuthor
    ),
    testimonialText: localizedValue(
      translation.testimonialText,
      project.testimonialText
    ),
  };
}

export function getPortfolioLabel(
  label: string | undefined,
  category: PortfolioCategory,
  t: (key: string) => string
) {
  if (label) {
    const knownKey = knownPortfolioLabelKeys[label.trim()];

    if (knownKey) {
      return t(`types.${knownKey}`);
    }

    return label;
  }

  return t(`categories.${category}`);
}
