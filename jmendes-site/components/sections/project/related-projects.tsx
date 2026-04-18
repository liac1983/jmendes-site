import Link from "next/link";
import Container from "@/components/ui/container";

type RelatedProject = {
  slug: string;
  title: string;
  category: string;
  heroImage: string;
};

type Props = {
  projects: RelatedProject[];
  locale: string;
};

export default function RelatedProjects({ projects, locale }: Props) {
  if (!projects.length) return null;

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div className="text-center">
          <h2 className="text-5xl text-white md:text-6xl">
            Outros Projetos Semelhantes
          </h2>
          <p className="mt-4 text-xl text-[var(--muted)]">
            Explore mais trabalhos desta categoria
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/${locale}/portfolio/${project.slug}`}
              className="group block"
            >
              <div className="overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <p className="mt-5 text-sm uppercase tracking-[0.18em] text-gold">
                {project.category}
              </p>

              <h3 className="mt-2 text-3xl text-white transition group-hover:text-gold">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
