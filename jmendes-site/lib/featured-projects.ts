import { localFeaturedProjects } from "@/data/featured-projects";
import { urlFor } from "@/sanity/lib/image";
import type {
  SanityFeaturedProject,
  SanityFeaturedProjectDetail,
  SanityFeaturedProjectTranslation,
  SanityFeaturedProjectTranslations,
  SanityImageWithAlt,
} from "@/sanity/lib/types";
import type {
  FeaturedProjectCard,
  FeaturedProjectContent,
  FeaturedProjectFact,
  FeaturedProjectStyle,
} from "@/types/featured-project";

type LocaleKey = "pt" | "en" | "fr" | "es";

type LocalizableFeaturedProject = {
  title: string;
  categoryLabel?: string;
  subtitle?: string;
  location?: string;
  intro?: string;
  description?: string;
  conceptTitle?: string;
  conceptText?: string;
  facts?: FeaturedProjectFact[];
  highlights?: string[];
  materials?: string[];
  finishes?: string[];
  translations?: SanityFeaturedProjectTranslations;
};

const defaultProject = localFeaturedProjects[0];

function localizedValue<T>(translated: T | undefined, fallback: T): T {
  if (Array.isArray(translated)) {
    return translated.length ? translated : fallback;
  }

  return translated || fallback;
}

function cleanStrings(items: string[] | undefined) {
  return (items || []).filter(Boolean);
}

function cleanFacts(items: FeaturedProjectFact[] | undefined) {
  return (items || []).filter((item) => item.label && item.value);
}

function imageUrl(
  image: SanityImageWithAlt | undefined,
  fallback: string,
  width: number,
  height: number
) {
  return image ? urlFor(image).width(width).height(height).url() : fallback;
}

export function getLocalFeaturedProject(slug: string) {
  return localFeaturedProjects.find((project) => project.slug === slug);
}

export function getRelatedLocalFeaturedProjects(slug: string, limit = 3) {
  return localFeaturedProjects
    .filter((project) => project.slug !== slug)
    .slice(0, limit);
}

export function getLocalizedFeaturedProject<T extends LocalizableFeaturedProject>(
  project: T,
  locale: string
): T {
  const translation: SanityFeaturedProjectTranslation | undefined =
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
    subtitle: localizedValue(translation.subtitle, project.subtitle),
    location: localizedValue(translation.location, project.location),
    intro: localizedValue(translation.intro, project.intro),
    description: localizedValue(translation.description, project.description),
    conceptTitle: localizedValue(
      translation.conceptTitle,
      project.conceptTitle
    ),
    conceptText: localizedValue(translation.conceptText, project.conceptText),
    facts: localizedValue(translation.facts, project.facts),
    highlights: localizedValue(translation.highlights, project.highlights),
    materials: localizedValue(translation.materials, project.materials),
    finishes: localizedValue(translation.finishes, project.finishes),
  };
}

export function mapSanityFeaturedProjectCard(
  project: SanityFeaturedProject,
  locale: string
): FeaturedProjectCard {
  const localizedProject = getLocalizedFeaturedProject(project, locale);
  const fallback = getLocalFeaturedProject(localizedProject.slug);
  const fallbackProject = fallback || defaultProject;
  const heroFallback = fallbackProject.heroImage;

  return {
    slug: localizedProject.slug,
    title: localizedProject.title || fallbackProject.title,
    categoryLabel:
      localizedProject.categoryLabel || fallbackProject.categoryLabel,
    subtitle: localizedProject.subtitle || fallbackProject.subtitle,
    styleVariant:
      localizedProject.styleVariant ||
      fallback?.styleVariant ||
      ("blend" satisfies FeaturedProjectStyle),
    image: imageUrl(
      localizedProject.cardImage || localizedProject.heroImage,
      fallback?.cardImage || heroFallback,
      1200,
      900
    ),
  };
}

export function mapLocalFeaturedProjectCard(
  project: FeaturedProjectContent
): FeaturedProjectCard {
  return {
    slug: project.slug,
    title: project.title,
    categoryLabel: project.categoryLabel,
    subtitle: project.subtitle,
    styleVariant: project.styleVariant,
    image: project.cardImage,
  };
}

export function mapSanityFeaturedProjectDetail(
  project: SanityFeaturedProjectDetail,
  locale: string
): FeaturedProjectContent {
  const localizedProject = getLocalizedFeaturedProject(project, locale);
  const fallback = getLocalFeaturedProject(localizedProject.slug);
  const fallbackProject = fallback || defaultProject;
  const galleryFallback = fallbackProject.gallery.length
    ? fallbackProject.gallery
    : [fallbackProject.heroImage];

  return {
    _id: localizedProject._id,
    slug: localizedProject.slug,
    title: localizedProject.title || fallbackProject.title,
    categoryLabel:
      localizedProject.categoryLabel || fallbackProject.categoryLabel,
    subtitle: localizedProject.subtitle || fallbackProject.subtitle,
    location: localizedProject.location || fallbackProject.location,
    year: localizedProject.year || fallbackProject.year,
    styleVariant:
      localizedProject.styleVariant ||
      fallback?.styleVariant ||
      ("blend" satisfies FeaturedProjectStyle),
    heroImage: imageUrl(
      localizedProject.heroImage,
      fallbackProject.heroImage,
      1800,
      1200
    ),
    cardImage: imageUrl(
      localizedProject.cardImage || localizedProject.heroImage,
      fallbackProject.cardImage,
      1200,
      900
    ),
    overviewImage: imageUrl(
      localizedProject.overviewImage || localizedProject.heroImage,
      fallbackProject.overviewImage,
      1200,
      1400
    ),
    gallery: localizedProject.gallery?.length
      ? localizedProject.gallery.map((image) =>
          imageUrl(image, fallbackProject.heroImage, 1400, 1000)
        )
      : galleryFallback,
    intro: localizedProject.intro || fallbackProject.intro,
    description:
      localizedProject.description || fallbackProject.description,
    conceptTitle:
      localizedProject.conceptTitle || fallbackProject.conceptTitle,
    conceptText: localizedProject.conceptText || fallbackProject.conceptText,
    facts: cleanFacts(localizedProject.facts).length
      ? cleanFacts(localizedProject.facts)
      : fallbackProject.facts,
    highlights: cleanStrings(localizedProject.highlights).length
      ? cleanStrings(localizedProject.highlights)
      : fallbackProject.highlights,
    materials: cleanStrings(localizedProject.materials).length
      ? cleanStrings(localizedProject.materials)
      : fallbackProject.materials,
    finishes: cleanStrings(localizedProject.finishes).length
      ? cleanStrings(localizedProject.finishes)
      : fallbackProject.finishes,
  };
}
