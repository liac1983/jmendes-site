"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ui/project-card";
import Container from "@/components/ui/container";
import PortfolioFilters from "./portfolio-filters";

export type PortfolioCategory =
  | "todos"
  | "cozinhas"
  | "roupeiros"
  | "comercial"
  | "casas-completas";

type PortfolioProject = {
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, "todos">;
  type: string;
  image: string;
  testimonial?: {
    text: string;
    author: string;
  };
};

type PortfolioGridProps = {
  locale: string;
  projects: PortfolioProject[];
};

export default function PortfolioGrid({
  locale,
  projects,
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>("todos");

  const filteredProjects = useMemo(() => {
    return activeCategory === "todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <section className="py-20 lg:py-24">
      <Container>
        <PortfolioFilters
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              locale={locale}
              slug={project.slug}
              image={project.image}
              title={project.title}
              categoryLabel={project.type}
              testimonial={project.testimonial}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}