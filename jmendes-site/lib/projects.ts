import { projects } from "@/data/projects";

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3) {
  return projects.filter((project) => project.slug !== currentSlug).slice(0, limit);
}

