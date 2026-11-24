import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
};

function hostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export default function ProjectInstagram({ project }: Props) {
  const t = useTranslations("Portfolio.project.instagram");

  if (!project.instagramUrl) return null;

  const isFacebook = /(^|\.)facebook\.com$/i.test(hostname(project.instagramUrl));
  const Icon = isFacebook ? FaFacebookF : FaInstagram;
  const images = project.instagramImages ?? [];

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div className="text-center">
          <h2 className="text-5xl text-white md:text-6xl">{t(isFacebook ? "facebookTitle" : "title")}</h2>
          <p className="mt-4 text-xl text-[var(--muted)]">
            {t("subtitle")}
          </p>
        </div>

        {images.length > 0 && <div className="mt-14 grid gap-8 md:grid-cols-3">
          {images.map((image, index) => (
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
                <Icon className="h-12 w-12 text-white" />
              </div>
            </a>
          ))}
        </div>}

        <div className="mt-10 text-center">
          <a
            href={project.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[58px] items-center gap-3 border border-[var(--gold)] px-8 text-lg text-gold transition hover:bg-[var(--gold)] hover:text-black"
          >
            <Icon className="h-5 w-5" />
            {t(isFacebook ? "facebookButton" : "button")}
          </a>
        </div>
      </Container>
    </section>
  );
}
