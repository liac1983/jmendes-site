import type { Image } from "sanity";
import type {
  FeaturedProjectFact,
  FeaturedProjectStyle,
} from "@/types/featured-project";

export type SanityImageWithAlt = Image & {
  alt?: string;
};

export type SanityProjectTranslation = {
  title?: string;
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
};

export type SanityProjectTranslations = Partial<
  Record<"pt" | "en" | "fr" | "es", SanityProjectTranslation>
>;

export type SanityPortfolioProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  typeLabel?: string;
  heroImage: Image;
  testimonialAuthor?: string;
  testimonialText?: string;
  translations?: SanityProjectTranslations;
};

export type SanityProjectDetail = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  location?: string;
  year?: string;
  typeLabel?: string;
  heroImage: Image;
  overviewImage?: Image;
  gallery?: Image[];
  description?: string;
  challenge?: string;
  solution?: string;
  materials?: string[];
  finishes?: string[];
  testimonialAuthor?: string;
  testimonialText?: string;
  instagramImages?: Image[];
  instagramUrl?: string;
  translations?: SanityProjectTranslations;
};

export type SanityRelatedProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  typeLabel?: string;
  heroImage: Image;
  translations?: SanityProjectTranslations;
};

export type SanityFeaturedProjectTranslation = {
  title?: string;
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
};

export type SanityFeaturedProjectTranslations = Partial<
  Record<"pt" | "en" | "fr" | "es", SanityFeaturedProjectTranslation>
>;

export type SanityFeaturedProject = {
  _id: string;
  title: string;
  slug: string;
  categoryLabel?: string;
  subtitle?: string;
  styleVariant?: FeaturedProjectStyle;
  heroImage?: SanityImageWithAlt;
  cardImage?: SanityImageWithAlt;
  translations?: SanityFeaturedProjectTranslations;
};

export type SanityFeaturedProjectDetail = SanityFeaturedProject & {
  location?: string;
  year?: string;
  overviewImage?: SanityImageWithAlt;
  gallery?: SanityImageWithAlt[];
  intro?: string;
  description?: string;
  conceptTitle?: string;
  conceptText?: string;
  facts?: FeaturedProjectFact[];
  highlights?: string[];
  materials?: string[];
  finishes?: string[];
};
