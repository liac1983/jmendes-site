"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ui/project-card";
import Container from "@/components/ui/container";
import PortfolioFilters from "./portfolio-filters";
import {
  portfolioProjects,
  type PortfolioCategory,
} from "@/data/portfolio";

type PortfolioGridProps = {
  locale: string;
};

export default function PortfolioGrid({ locale }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>("todos");

  const filteredProjects = useMemo(() => {
    return activeCategory === "todos"
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) => project.category === activeCategory
        );
  }, [activeCategory]);

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

