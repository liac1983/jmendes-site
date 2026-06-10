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
import FeaturedProjectsCarousel from "./featured-projects-carousel";

type Props = {
  locale: string;
};

export default async function FeaturedProjects({ locale }: Props) {
  const t = await getTranslations("Home.featured");

  let sanityProjects: SanityFeaturedProject[] = [];
  try {
    sanityProjects = await client.fetch<SanityFeaturedProject[]>(featuredProjectsQuery);
  } catch {
    // Network error — fall back to local data
  }

  const projects = sanityProjects.length
    ? sanityProjects.map((project) => mapSanityFeaturedProjectCard(project, locale))
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

        <FeaturedProjectsCarousel
          projects={projects}
          locale={locale}
          viewAllLabel={t("viewAll")}
          viewAllHref={`/${locale}/projetos-destaque`}
          viewProjectLabel={t("viewProject")}
          categoryFallback={t("category")}
        />
      </Container>
    </section>
  );
}
