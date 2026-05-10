import ProjectCard from "@/components/ui/project-card";
import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import { localFeaturedProjects } from "@/data/featured-projects";
import {
  mapLocalFeaturedProjectCard,
  mapSanityFeaturedProjectCard,
} from "@/lib/featured-projects";
import { client } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import type { SanityFeaturedProject } from "@/sanity/lib/types";
import { getTranslations } from "next-intl/server";

type FeaturedProjectsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function FeaturedProjectsPage({
  params,
}: FeaturedProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations("FeaturedProjects.index");
  const sanityProjects = await client.fetch<SanityFeaturedProject[]>(
    featuredProjectsQuery
  );
  const projects = sanityProjects.length
    ? sanityProjects.map((project) =>
        mapSanityFeaturedProjectCard(project, locale)
      )
    : localFeaturedProjects.map(mapLocalFeaturedProjectCard);

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              locale={locale}
              slug={project.slug}
              image={project.image}
              categoryLabel={project.categoryLabel}
              title={project.title}
              href={`/${locale}/projetos-destaque/${project.slug}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
