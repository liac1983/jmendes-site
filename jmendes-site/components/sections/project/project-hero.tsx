import Link from "next/link";
import Container from "@/components/ui/container";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
  locale: string;
};

export default function ProjectHero({ project, locale }: Props) {
  return (
    <section className="border-b border-[var(--border)] bg-black">
      <Container>
        <div className="py-8">
          <Link
            href={`/${locale}/portfolio`}
            className="text-base text-white/70 transition hover:text-gold"
          >
            ← Voltar ao Portfolio
          </Link>
        </div>
      </Container>

      <div className="relative h-[70vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <Container>
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1280px] px-6 pb-16">
            <p className="mb-4 text-lg tracking-[0.2em] text-gold uppercase">
              {project.category}
            </p>
            <h1 className="max-w-4xl text-6xl leading-none text-white md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 text-2xl text-white/85">
              Projeto por medida em {project.location}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

