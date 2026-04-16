export type Project = {
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  typeLabel: string;
  heroImage: string;
  overviewImage: string;
  gallery: string[];
  description: string;
  challenge: string;
  solution: string;
  materials: string[];
  finishes: string[];
  testimonial?: {
    author: string;
    text: string;
  };
  instagramImages?: string[];
  instagramUrl?: string;
};

