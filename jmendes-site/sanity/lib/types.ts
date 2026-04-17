import type { Image } from "sanity";

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
};
