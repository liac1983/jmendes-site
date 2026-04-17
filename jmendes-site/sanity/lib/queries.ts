import { groq } from "next-sanity";

export const portfolioProjectsQuery = groq`
  *[_type == "project" && published == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    categoryLabel,
    typeLabel,
    heroImage,
    testimonialAuthor,
    testimonialText
  }
`;

