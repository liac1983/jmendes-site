import Container from "@/components/ui/container";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
};

export default function ProjectGallery({ project }: Props) {
  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div className="text-center">
          <h2 className="text-5xl text-white md:text-6xl">Galeria do Projeto</h2>
          <p className="mt-4 text-xl text-[var(--muted)]">
            Veja todos os detalhes deste projeto
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {project.gallery.map((image, index) => (
            <div key={`${project.slug}-gallery-${index}`} className="overflow-hidden">
              <img
                src={image}
                alt={`${project.title} ${index + 1}`}
                className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

