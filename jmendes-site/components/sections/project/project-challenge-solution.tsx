import Container from "@/components/ui/container";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
};

export default function ProjectChallengeSolution({ project }: Props) {
  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-5xl text-gold md:text-6xl">Desafio</h2>
            <p className="mt-8 text-xl leading-9 text-[var(--muted)]">
              {project.challenge}
            </p>
          </div>

          <div>
            <h2 className="text-5xl text-gold md:text-6xl">Solução</h2>
            <p className="mt-8 text-xl leading-9 text-[var(--muted)]">
              {project.solution}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

