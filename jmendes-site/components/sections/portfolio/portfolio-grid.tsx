"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ProjectCard from "@/components/ui/project-card";
import Container from "@/components/ui/container";
import PortfolioFilters from "./portfolio-filters";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  categoryFilterLabel: string;
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

export default function PortfolioGrid({ locale, projects }: PortfolioGridProps) {
  const t = useTranslations("Portfolio.grid");
  const [activeCategory, setActiveCategory] = useState("todos");

  // Only show categories that have at least one project
  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of projects) {
      if (p.category && !seen.has(p.category)) {
        seen.set(p.category, p.categoryFilterLabel);
      }
    }
    return Array.from(seen.entries()).map(([value, label]) => ({ value, label }));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === "todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <section className="py-20 lg:py-24">
      <Container>
        <PortfolioFilters
          activeCategory={activeCategory}
          categories={categories}
          onChange={setActiveCategory}
        />

        {filteredProjects.length ? (
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
        ) : (
          <p className="mt-14 text-center text-xl text-[var(--muted)]">
            {t("empty")}
          </p>
        )}
      </Container>
    </section>
  );
}
