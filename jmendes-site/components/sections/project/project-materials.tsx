import Container from "@/components/ui/container";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
};

export default function ProjectMaterials({ project }: Props) {
  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div className="text-center">
          <h2 className="text-5xl text-white md:text-6xl">Materiais & Acabamentos</h2>
          <p className="mt-4 text-xl text-[var(--muted)]">
            Qualidade premium em cada detalhe
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="border border-[var(--border)] p-10">
            <h3 className="text-4xl text-gold">Materiais</h3>

            <ul className="mt-8 space-y-5">
              {project.materials.map((item, index) => (
                <li
                  key={`${project.slug}-material-${index}`}
                  className="flex items-start gap-3 text-xl text-[var(--muted)]"
                >
                  <span className="mt-2 h-2 w-2 bg-[var(--gold)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[var(--border)] p-10">
            <h3 className="text-4xl text-gold">Acabamentos</h3>

            <ul className="mt-8 space-y-5">
              {project.finishes.map((item, index) => (
                <li
                  key={`${project.slug}-finish-${index}`}
                  className="flex items-start gap-3 text-xl text-[var(--muted)]"
                >
                  <span className="mt-2 h-2 w-2 bg-[var(--gold)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}


