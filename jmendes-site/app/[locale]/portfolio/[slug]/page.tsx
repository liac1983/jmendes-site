import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import ProjectHero from "@/components/sections/project/project-hero";
import ProjectOverview from "@/components/sections/project/project-overview";
import ProjectGallery from "@/components/sections/project/project-gallery";
import ProjectChallengeSolution from "@/components/sections/project/project-challenge-solution";
import ProjectMaterials from "@/components/sections/project/project-materials";
import ProjectTestimonial from "@/components/sections/project/project-testimonial";
import ProjectInstagram from "@/components/sections/project/project-instagram";
import RelatedProjects from "@/components/sections/project/related-projects";
import ProjectCta from "@/components/sections/project/project-cta";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug);

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


