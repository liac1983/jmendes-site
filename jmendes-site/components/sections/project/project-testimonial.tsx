import Container from "@/components/ui/container";
import { Star } from "lucide-react";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
};

export default function ProjectTestimonial({ project }: Props) {
  if (!project.testimonial) return null;

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={`star-${index}`}
                className="h-6 w-6 fill-[var(--gold)] text-[var(--gold)]"
              />
            ))}
          </div>

          <blockquote className="text-4xl leading-[1.4] text-white md:text-5xl">
            “{project.testimonial.text}”
          </blockquote>

          <p className="mt-8 text-2xl text-gold">— {project.testimonial.author}</p>
        </div>
      </Container>
    </section>
  );
}

