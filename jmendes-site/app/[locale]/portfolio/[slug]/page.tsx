import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
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
import {
  getLocalizedProject,
  getPortfolioLabel,
} from "@/lib/portfolio-localization";
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
  const labelT = await getTranslations("Portfolio.labels");

  const sanityProject = await client.fetch<SanityProjectDetail | null>(
    projectBySlugQuery,
    { slug }
  );

  if (!sanityProject) {
    notFound();
  }

  const localizedSanityProject = getLocalizedProject(sanityProject, locale);

  const sanityRelatedProjects = await client.fetch<SanityRelatedProject[]>(
    relatedProjectsQuery,
    { slug }
  );

  const project = {
    title: localizedSanityProject.title,
    slug: localizedSanityProject.slug,
    category: getPortfolioLabel(
      localizedSanityProject.categoryLabel,
      localizedSanityProject.category,
      labelT
    ),
    location: localizedSanityProject.location || "Portugal",
    year: localizedSanityProject.year || "",
    typeLabel: getPortfolioLabel(
      localizedSanityProject.typeLabel || localizedSanityProject.categoryLabel,
      localizedSanityProject.category,
      labelT
    ),
    heroImage: localizedSanityProject.heroImage
      ? urlFor(localizedSanityProject.heroImage).width(1800).height(1200).url()
      : "/images/placeholder.jpg",
    overviewImage: localizedSanityProject.overviewImage
      ? urlFor(localizedSanityProject.overviewImage)
          .width(1200)
          .height(1200)
          .url()
      : localizedSanityProject.heroImage
      ? urlFor(localizedSanityProject.heroImage).width(1200).height(1200).url()
      : "/images/placeholder.jpg",
    gallery:
      localizedSanityProject.gallery?.map((image) =>
        urlFor(image).width(1400).height(1100).url()
      ) || [],
    description: localizedSanityProject.description || "",
    challenge: localizedSanityProject.challenge || "",
    solution: localizedSanityProject.solution || "",
    materials: localizedSanityProject.materials || [],
    finishes: localizedSanityProject.finishes || [],
    testimonial:
      localizedSanityProject.testimonialText &&
      localizedSanityProject.testimonialAuthor
        ? {
            text: localizedSanityProject.testimonialText,
            author: localizedSanityProject.testimonialAuthor,
          }
        : undefined,
    instagramImages:
      localizedSanityProject.instagramImages?.map((image) =>
        urlFor(image).width(900).height(900).url()
      ) || [],
    instagramUrl: localizedSanityProject.instagramUrl || "",
  };

  const relatedProjects = sanityRelatedProjects.map((item) => {
    const localizedItem = getLocalizedProject(item, locale);

    return {
      slug: localizedItem.slug,
      title: localizedItem.title,
      category: getPortfolioLabel(
        localizedItem.typeLabel || localizedItem.categoryLabel,
        localizedItem.category,
        labelT
      ),
      heroImage: localizedItem.heroImage
        ? urlFor(localizedItem.heroImage).width(1200).height(900).url()
        : "/images/placeholder.jpg",
    };
  });

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
