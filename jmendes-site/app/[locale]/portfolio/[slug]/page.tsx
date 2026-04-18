import { notFound } from "next/navigation";
import ProjectHero from "@/components/sections/project/project-hero";
import ProjectOverview from "@/components/sections/project/project-overview";
import ProjectGallery from "@/components/sections/project/project-gallery";
import ProjectChallengeSolution from "@/components/sections/project/project-challenge-solution";
import ProjectMaterials from "@/components/sections/project/project-materials";
import ProjectTestimonial from "@/components/sections/project/project-testimonial";
import ProjectInstagram from "@/components/sections/project/project-instagram";
import RelatedProjects from "@/components/sections/project/related-projects";
import ProjectCta from "@/components/sections/project/project-cta";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  projectBySlugQuery,
  relatedProjectsQuery,
} from "@/sanity/lib/queries";
import type {
  SanityProjectDetail,
  SanityRelatedProject,
} from "@/sanity/lib/types";

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  const sanityProject = await client.fetch<SanityProjectDetail | null>(
    projectBySlugQuery,
    { slug }
  );

  if (!sanityProject) {
    notFound();
  }

  const sanityRelatedProjects = await client.fetch<SanityRelatedProject[]>(
    relatedProjectsQuery,
    { slug }
  );

  const project = {
    title: sanityProject.title,
    slug: sanityProject.slug,
    category: sanityProject.categoryLabel || "Por Medida",
    location: sanityProject.location || "Portugal",
    year: sanityProject.year || "",
    typeLabel: sanityProject.typeLabel || "Por Medida",
    heroImage: sanityProject.heroImage
      ? urlFor(sanityProject.heroImage).width(1800).height(1200).url()
      : "/images/placeholder.jpg",
    overviewImage: sanityProject.overviewImage
      ? urlFor(sanityProject.overviewImage).width(1200).height(1200).url()
      : sanityProject.heroImage
      ? urlFor(sanityProject.heroImage).width(1200).height(1200).url()
      : "/images/placeholder.jpg",
    gallery:
      sanityProject.gallery?.map((image) =>
        urlFor(image).width(1400).height(1100).url()
      ) || [],
    description: sanityProject.description || "",
    challenge: sanityProject.challenge || "",
    solution: sanityProject.solution || "",
    materials: sanityProject.materials || [],
    finishes: sanityProject.finishes || [],
    testimonial:
      sanityProject.testimonialText && sanityProject.testimonialAuthor
        ? {
            text: sanityProject.testimonialText,
            author: sanityProject.testimonialAuthor,
          }
        : undefined,
    instagramImages:
      sanityProject.instagramImages?.map((image) =>
        urlFor(image).width(900).height(900).url()
      ) || [],
    instagramUrl: sanityProject.instagramUrl || "",
  };

  const relatedProjects = sanityRelatedProjects.map((item) => ({
    slug: item.slug,
    title: item.title,
    category: item.typeLabel || item.categoryLabel || "Por Medida",
    heroImage: item.heroImage
      ? urlFor(item.heroImage).width(1200).height(900).url()
      : "/images/placeholder.jpg",
  }));

  return (
    <>
      <ProjectHero project={project} locale={locale} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <ProjectChallengeSolution project={project} />
      <ProjectMaterials project={project} />
      <ProjectTestimonial project={project} />
      <ProjectInstagram project={project} />
      <RelatedProjects projects={relatedProjects} locale={locale} />
      <ProjectCta locale={locale} />
    </>
  );
}

