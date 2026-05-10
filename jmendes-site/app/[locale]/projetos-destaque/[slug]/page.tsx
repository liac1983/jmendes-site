import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import FeaturedProjectDetail, {
  type FeaturedProjectDetailLabels,
} from "@/components/sections/featured-projects/featured-project-detail";
import {
  getLocalFeaturedProject,
  getRelatedLocalFeaturedProjects,
  mapLocalFeaturedProjectCard,
  mapSanityFeaturedProjectCard,
  mapSanityFeaturedProjectDetail,
} from "@/lib/featured-projects";
import { client } from "@/sanity/lib/client";
import {
  featuredProjectBySlugQuery,
  relatedFeaturedProjectsQuery,
} from "@/sanity/lib/queries";
import type {
  SanityFeaturedProject,
  SanityFeaturedProjectDetail,
} from "@/sanity/lib/types";

type FeaturedProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function FeaturedProjectPage({
  params,
}: FeaturedProjectPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations("FeaturedProjects.detail");
  const sanityProject = await client.fetch<SanityFeaturedProjectDetail | null>(
    featuredProjectBySlugQuery,
    { slug }
  );
  const localProject = getLocalFeaturedProject(slug);

  if (!sanityProject && !localProject) {
    notFound();
  }

  const project = sanityProject
    ? mapSanityFeaturedProjectDetail(sanityProject, locale)
    : localProject!;

  const sanityRelatedProjects = sanityProject
    ? await client.fetch<SanityFeaturedProject[]>(relatedFeaturedProjectsQuery, {
        slug,
      })
    : [];
  const relatedProjects = sanityRelatedProjects.length
    ? sanityRelatedProjects.map((item) =>
        mapSanityFeaturedProjectCard(item, locale)
      )
    : getRelatedLocalFeaturedProjects(project.slug).map(
        mapLocalFeaturedProjectCard
      );
  const labels: FeaturedProjectDetailLabels = {
    back: t("back"),
    overview: t("overview"),
    concept: t("concept"),
    highlights: t("highlights"),
    materials: t("materials"),
    finishes: t("finishes"),
    gallery: t("gallery"),
    relatedTitle: t("relatedTitle"),
    relatedSubtitle: t("relatedSubtitle"),
    ctaTitle: t("ctaTitle"),
    ctaDescription: t("ctaDescription"),
    ctaButton: t("ctaButton"),
  };

  return (
    <FeaturedProjectDetail
      project={project}
      relatedProjects={relatedProjects}
      locale={locale}
      labels={labels}
    />
  );
}
