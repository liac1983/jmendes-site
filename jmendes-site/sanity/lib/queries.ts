import {groq} from 'next-sanity'

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
    testimonialText,
    translations
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
    instagramUrl,
    translations
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
    heroImage,
    translations
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "featuredProject" && published == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    categoryLabel,
    subtitle,
    styleVariant,
    heroImage{
      ...,
      alt
    },
    cardImage{
      ...,
      alt
    },
    translations
  }
`;

export const featuredProjectBySlugQuery = groq`
  *[_type == "featuredProject" && slug.current == $slug && published == true][0]{
    _id,
    title,
    "slug": slug.current,
    categoryLabel,
    subtitle,
    location,
    year,
    styleVariant,
    heroImage{
      ...,
      alt
    },
    cardImage{
      ...,
      alt
    },
    overviewImage{
      ...,
      alt
    },
    gallery[]{
      ...,
      alt
    },
    intro,
    description,
    conceptTitle,
    conceptText,
    facts[]{
      label,
      value
    },
    highlights,
    materials,
    finishes,
    translations
  }
`;

export const relatedFeaturedProjectsQuery = groq`
  *[_type == "featuredProject" && published == true && slug.current != $slug] | order(order asc, _createdAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    categoryLabel,
    subtitle,
    styleVariant,
    heroImage{
      ...,
      alt
    },
    cardImage{
      ...,
      alt
    },
    translations
  }
`;

export const featuredProjectSlugsQuery = groq`
  *[_type == "featuredProject" && published == true && defined(slug.current)][]{
    "slug": slug.current
  }
`;
export const productLinesQuery = groq`
  *[_type == "productLine" && isActive == true] | order(orderRank asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    availability,
    subtitle,
    aboutText,
    heroImage{
      ...,
      alt
    },
    aboutImage{
      ...,
      alt
    },
    gallery[]{
      ...,
      alt
    },
    highlights,
    materials,
    finishes,
    dimensions{
      width,
      height,
      depth
    },
    technicalFeatures,
    advantages,
    idealFor,
    orderRank,
    translations
  }
`

export const productLineBySlugQuery = groq`
  *[_type == "productLine" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    availability,
    subtitle,
    aboutText,
    heroImage{
      ...,
      alt
    },
    aboutImage{
      ...,
      alt
    },
    gallery[]{
      ...,
      alt
    },
    highlights,
    materials,
    finishes,
    dimensions{
      width,
      height,
      depth
    },
    technicalFeatures,
    advantages,
    idealFor,
    orderRank,
    translations
  }
`

export const productLineSlugsQuery = groq`
  *[_type == "productLine" && isActive == true && defined(slug.current)][]{
    "slug": slug.current
  }
`
