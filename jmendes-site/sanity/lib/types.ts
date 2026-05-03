import type { Image } from "sanity";

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
  category: "cozinhas" | "roupeiros" | "comercial" | "casas-completas";
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
  category: "cozinhas" | "roupeiros" | "comercial" | "casas-completas";
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
  category: "cozinhas" | "roupeiros" | "comercial" | "casas-completas";
  categoryLabel?: string;
  typeLabel?: string;
  heroImage: Image;
  translations?: SanityProjectTranslations;
};
