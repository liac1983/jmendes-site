import PortfolioHero from "@/components/sections/portfolio/portfolio-hero";
import PortfolioGrid from "@/components/sections/portfolio/portfolio-grid";
import { client } from "@/sanity/lib/client";
import { portfolioProjectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SanityPortfolioProject } from "@/sanity/lib/types";

type PortfolioPageProject = {
  slug: string;
  title: string;
  category: "cozinhas" | "roupeiros" | "comercial" | "casas-completas";
  type: string;
  image: string;
  testimonial?: {
    text: string;
    author: string;
  };
};

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const sanityProjects = await client.fetch<SanityPortfolioProject[]>(
    portfolioProjectsQuery
  );

  const projects: PortfolioPageProject[] = sanityProjects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    type: project.typeLabel || project.categoryLabel || "Por Medida",
    image: project.heroImage
      ? urlFor(project.heroImage).width(1200).height(900).url()
      : "/images/placeholder.jpg",
    testimonial:
      project.testimonialText && project.testimonialAuthor
        ? {
            text: project.testimonialText,
            author: project.testimonialAuthor,
          }
        : undefined,
  }));

  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid locale={locale} projects={projects} />
    </main>
  );
}
