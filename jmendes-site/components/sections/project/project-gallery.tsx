import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/project-types";
import Reveal, { ImageReveal } from "@/components/ui/reveal";

type Props = {
  project: Project;
};

export default function ProjectGallery({ project }: Props) {
  const t = useTranslations("Portfolio.project.gallery");

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="text-5xl text-white md:text-6xl">{t("title")}</h2>
            <p className="mt-4 text-xl text-[var(--muted)]">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {project.gallery.map((image, index) => (
            <ImageReveal
              key={`${project.slug}-gallery-${index}`}
              delay={index % 2 === 0 ? 0 : 0.12}
            >
              <img
                src={image}
                alt={`${project.title} ${index + 1}`}
                className="h-[420px] w-full object-cover transition duration-[1200ms] ease-out hover:scale-[1.035]"
              />
            </ImageReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
