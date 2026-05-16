import PortfolioHero from "@/components/sections/portfolio/portfolio-hero";
import PortfolioGrid, { type PortfolioProject } from "@/components/sections/portfolio/portfolio-grid";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { portfolioProjectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import {
  getLocalizedProject,
  getPortfolioLabel,
} from "@/lib/portfolio-localization";
import type { SanityPortfolioProject } from "@/sanity/lib/types";

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labelT = await getTranslations("Portfolio.labels");

  const sanityProjects = await client.fetch<SanityPortfolioProject[]>(
    portfolioProjectsQuery
  );

  const projects: PortfolioProject[] = sanityProjects.map((project) => {
    const localizedProject = getLocalizedProject(project, locale);

    return {
      slug: localizedProject.slug,
      title: localizedProject.title,
      category: localizedProject.category,
      categoryFilterLabel: slugToLabel(localizedProject.category),
      type: getPortfolioLabel(
        localizedProject.typeLabel || localizedProject.categoryLabel,
        localizedProject.category,
        labelT
      ),
      image: localizedProject.heroImage
        ? urlFor(localizedProject.heroImage).width(1200).height(900).url()
        : "/images/placeholder.jpg",
      testimonial:
        localizedProject.testimonialText && localizedProject.testimonialAuthor
          ? {
              text: localizedProject.testimonialText,
              author: localizedProject.testimonialAuthor,
            }
          : undefined,
    };
  });

  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid locale={locale} projects={projects} />
    </main>
  );
}
