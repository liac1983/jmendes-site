import Container from "@/components/ui/container";
import { Calendar, MapPin, Square } from "lucide-react";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
};

export default function ProjectOverview({ project }: Props) {
  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-5xl text-white md:text-6xl">Sobre o Projeto</h2>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-[var(--muted)]">
              {project.description}
            </p>

            <div className="mt-10 space-y-5 text-lg text-white/90">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-[var(--muted)]">Localização:</span>
                <strong>{project.location}</strong>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gold" />
                <span className="text-[var(--muted)]">Ano:</span>
                <strong>{project.year}</strong>
              </div>

              <div className="flex items-center gap-3">
                <Square className="h-5 w-5 text-gold" />
                <span className="text-[var(--muted)]">Tipo:</span>
                <strong>{project.typeLabel}</strong>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -bottom-6 -right-6 h-full w-full border border-[var(--gold)]/30" />
            <img
              src={project.overviewImage}
              alt={project.title}
              className="relative z-10 h-[520px] w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
