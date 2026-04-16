import { FaInstagram } from "react-icons/fa";
import Container from "@/components/ui/container";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
};

export default function ProjectInstagram({ project }: Props) {
  if (!project.instagramImages?.length || !project.instagramUrl) return null;

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div className="text-center">
          <h2 className="text-5xl text-white md:text-6xl">Veja no Instagram</h2>
          <p className="mt-4 text-xl text-[var(--muted)]">
            Siga-nos para mais projetos inspiradores
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {project.instagramImages.map((image, index) => (
            <a
              key={`${project.slug}-instagram-${index}`}
              href={project.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden"
            >
              <img
                src={image}
                alt={`${project.title} instagram ${index + 1}`}
                className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FaInstagram className="h-12 w-12 text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={project.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[58px] items-center gap-3 border border-[var(--gold)] px-8 text-lg text-gold transition hover:bg-[var(--gold)] hover:text-black"
          >
            <FaInstagram className="h-5 w-5" />
            Ver no Instagram
          </a>
        </div>
      </Container>
    </section>
  );
}

