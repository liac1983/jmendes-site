import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import ProjectCard from "@/components/ui/project-card";
import { localFeaturedProjects } from "@/data/featured-projects";
import {
  mapLocalFeaturedProjectCard,
  mapSanityFeaturedProjectCard,
} from "@/lib/featured-projects";
import { client } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import type { SanityFeaturedProject } from "@/sanity/lib/types";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Props = {
  locale: string;
};

export default async function FeaturedProjects({ locale }: Props) {
  const t = await getTranslations("Home.featured");
  const sanityProjects = await client.fetch<SanityFeaturedProject[]>(
    featuredProjectsQuery
  );
  const projects = sanityProjects.length
    ? sanityProjects.map((project) =>
        mapSanityFeaturedProjectCard(project, locale)
      )
    : localFeaturedProjects.map(mapLocalFeaturedProjectCard);

  return (
    <section
      id="projetos-destaque"
      className="border-b border-[var(--border)] py-20 lg:py-24"
    >
      <Container>
        <SectionTitle
          title={t("title")}
          subtitle={t("description")}
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              locale={locale}
              slug={project.slug}
              image={project.image}
              categoryLabel={project.categoryLabel || t("category")}
              title={project.title}
              href={`/${locale}/projetos-destaque/${project.slug}`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/projetos-destaque`}
            className="editorial-link inline-flex items-center gap-3 text-2xl text-gold transition-opacity hover:opacity-80"
          >
            {t("viewAll")}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
