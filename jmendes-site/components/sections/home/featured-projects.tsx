import Container from "@/components/ui/container";
import SectionTitle from "@/components/ui/section-title";
import ProjectCard from "@/components/ui/project-card";
import { featuredProjects } from "@/data/home";
import Link from "next/link";

type Props = {
  locale: string;
};

export default function FeaturedProjects({ locale }: Props) {
  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-24">
      <Container>
        <SectionTitle
          title="Projetos em Destaque"
          subtitle="Exemplos do nosso trabalho em mobiliário personalizado e produção em série"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              image={project.image}
              categoryLabel={project.categoryLabel}
              title={project.title}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-3 text-2xl text-gold transition-opacity hover:opacity-80"
          >
            Ver Todo o Portfolio
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
