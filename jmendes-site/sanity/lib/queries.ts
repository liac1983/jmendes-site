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

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && published == true][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    categoryLabel,
    location,
    year,
    typeLabel,
    heroImage,
    overviewImage,
    gallery,
    description,
    challenge,
    solution,
    materials,
    finishes,
    testimonialAuthor,
    testimonialText,
    instagramImages,
    instagramUrl
  }
`;

export const relatedProjectsQuery = groq`
  *[_type == "project" && published == true && slug.current != $slug] | order(order asc, _createdAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    category,
    categoryLabel,
    typeLabel,
    heroImage
  }
`;