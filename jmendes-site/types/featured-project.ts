export type FeaturedProjectStyle =
  | "blend"
  | "mavrommatis"
  | "mr-chow"
  | "poissonchat"
  | "sense";

export type FeaturedProjectFact = {
  label: string;
  value: string;
};

export type FeaturedProjectContent = {
  _id?: string;
  slug: string;
  title: string;
  categoryLabel: string;
  subtitle: string;
  location: string;
  year: string;
  styleVariant: FeaturedProjectStyle;
  heroImage: string;
  cardImage: string;
  overviewImage: string;
  gallery: string[];
  intro: string;
  description: string;
  conceptTitle: string;
  conceptText: string;
  facts: FeaturedProjectFact[];
  highlights: string[];
  materials: string[];
  finishes: string[];
};

export type FeaturedProjectCard = Pick<
  FeaturedProjectContent,
  "slug" | "title" | "categoryLabel" | "subtitle" | "styleVariant"
> & {
  image: string;
};
