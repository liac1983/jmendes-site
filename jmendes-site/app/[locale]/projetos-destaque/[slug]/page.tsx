import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailMetadata } from "@/lib/seo";
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

async function loadFeaturedProject(slug: string, locale: string) {
  let sanityProject: SanityFeaturedProjectDetail | null = null;
  try {
    sanityProject = await client.fetch<SanityFeaturedProjectDetail | null>(
      featuredProjectBySlugQuery,
      { slug }
    );
  } catch {
    // Sem ligação ao Sanity: usa os dados locais.
  }
  return sanityProject
    ? mapSanityFeaturedProjectDetail(sanityProject, locale)
    : getLocalFeaturedProject(slug) ?? null;
}

export async function generateMetadata({
  params,
}: FeaturedProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await loadFeaturedProject(slug, locale);
  if (!project) return {};

  return detailMetadata(locale, `/projetos-destaque/${slug}`, {
    title: project.title,
    description: project.subtitle,
    image: project.heroImage,
  });
}

export default async function FeaturedProjectPage({
  params,
}: FeaturedProjectPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations("FeaturedProjects.detail");
  let sanityProject: SanityFeaturedProjectDetail | null = null;
  try {
    sanityProject = await client.fetch<SanityFeaturedProjectDetail | null>(
      featuredProjectBySlugQuery,
      { slug }
    );
  } catch {
    // Network error — fall back to local data
  }
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
