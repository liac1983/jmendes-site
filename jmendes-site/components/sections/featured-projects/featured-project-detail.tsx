import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, Check, Layers, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import ProjectCard from "@/components/ui/project-card";
import Reveal from "@/components/ui/reveal";
import type {
  FeaturedProjectCard,
  FeaturedProjectContent,
  FeaturedProjectStyle,
} from "@/types/featured-project";

export type FeaturedProjectDetailLabels = {
  back: string;
  overview: string;
  concept: string;
  highlights: string;
  materials: string;
  finishes: string;
  gallery: string;
  relatedTitle: string;
  relatedSubtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
};

type FeaturedProjectDetailProps = {
  project: FeaturedProjectContent;
  relatedProjects: FeaturedProjectCard[];
  locale: string;
  labels: FeaturedProjectDetailLabels;
};

type Theme = {
  accent: string;
  accentSoft: string;
  panel: string;
  border: string;
  imageTreatment: string;
};

const themes: Record<FeaturedProjectStyle, Theme> = {
  blend: {
    accent: "#d6b36d",
    accentSoft: "rgba(214, 179, 109, 0.14)",
    panel: "rgba(214, 179, 109, 0.07)",
    border: "rgba(214, 179, 109, 0.24)",
    imageTreatment: "brightness-105 saturate-[0.95]",
  },
  mavrommatis: {
    accent: "#c8b28f",
    accentSoft: "rgba(200, 178, 143, 0.14)",
    panel: "rgba(200, 178, 143, 0.07)",
    border: "rgba(200, 178, 143, 0.24)",
    imageTreatment: "brightness-105 saturate-[0.82]",
  },
  "mr-chow": {
    accent: "#e23b32",
    accentSoft: "rgba(226, 59, 50, 0.16)",
    panel: "rgba(226, 59, 50, 0.08)",
    border: "rgba(226, 59, 50, 0.28)",
    imageTreatment: "contrast-110 saturate-125",
  },
  poissonchat: {
    accent: "#e0a161",
    accentSoft: "rgba(224, 161, 97, 0.14)",
    panel: "rgba(224, 161, 97, 0.07)",
    border: "rgba(224, 161, 97, 0.24)",
    imageTreatment: "brightness-105 saturate-105",
  },
  sense: {
    accent: "#d08d52",
    accentSoft: "rgba(208, 141, 82, 0.14)",
    panel: "rgba(208, 141, 82, 0.07)",
    border: "rgba(208, 141, 82, 0.24)",
    imageTreatment: "brightness-105 saturate-[0.9]",
  },
};

type FeaturedProjectStyleVars = CSSProperties & {
  "--fp-accent": string;
  "--fp-accent-soft": string;
  "--fp-panel": string;
  "--fp-border": string;
};

export default function FeaturedProjectDetail({
  project,
  relatedProjects,
  locale,
  labels,
}: FeaturedProjectDetailProps) {
  const theme = themes[project.styleVariant];
  const style: FeaturedProjectStyleVars = {
    "--fp-accent": theme.accent,
    "--fp-accent-soft": theme.accentSoft,
    "--fp-panel": theme.panel,
    "--fp-border": theme.border,
  };

  return (
    <article style={style} className="bg-[var(--background)]">
      {renderHero(project, locale, labels, theme)}
      <ProjectOverview project={project} labels={labels} />
      <ProjectConcept project={project} labels={labels} />
      <ProjectGallery project={project} labels={labels} theme={theme} />
      <RelatedFeaturedProjects
        locale={locale}
        projects={relatedProjects}
        labels={labels}
      />
      <FeaturedProjectCta locale={locale} labels={labels} />
    </article>
  );
}

function BackLink({
  labels,
  locale,
}: {
  labels: FeaturedProjectDetailLabels;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/projetos-destaque`}
      className="inline-flex items-center gap-3 text-sm uppercase tracking-normal text-white/70 transition-colors hover:text-[var(--fp-accent)]"
    >
      <ArrowLeft className="h-4 w-4" />
      {labels.back}
    </Link>
  );
}

function HeroImage({
  project,
  theme,
  className,
  priority = false,
}: {
  project: FeaturedProjectContent;
  theme: Theme;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={project.heroImage}
      alt={project.title}
      fill
      priority={priority}
      sizes="100vw"
      className={clsx("object-cover", theme.imageTreatment, className)}
    />
  );
}

function HeroTitle({ project }: { project: FeaturedProjectContent }) {
  return (
    <>
      <p className="text-sm uppercase tracking-normal text-[var(--fp-accent)]">
        {project.categoryLabel}
      </p>
      <h1 className="mt-5 max-w-5xl text-6xl leading-none tracking-normal text-white md:text-8xl lg:text-[112px]">
        {project.title}
      </h1>
      <p className="mt-6 max-w-2xl text-xl leading-9 text-white/75">
        {project.subtitle}
      </p>
    </>
  );
}

function renderHero(
  project: FeaturedProjectContent,
  locale: string,
  labels: FeaturedProjectDetailLabels,
  theme: Theme
) {
  if (project.styleVariant === "mavrommatis") {
    return (
      <section className="border-b border-[var(--fp-border)] py-20 lg:py-28">
        <Container className="grid items-end gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <BackLink labels={labels} locale={locale} />
            <div className="mt-16">
              <HeroTitle project={project} />
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 border-y border-[var(--fp-border)]">
              {project.facts.slice(0, 2).map((fact) => (
                <div key={fact.label} className="border-[var(--fp-border)] py-5 pr-6 first:border-r">
                  <p className="text-xs uppercase tracking-normal text-white/50">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-base text-white">{fact.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative aspect-[5/4] overflow-hidden border border-[var(--fp-border)] bg-[var(--fp-panel)]">
            <HeroImage project={project} theme={theme} priority />
          </Reveal>
        </Container>
      </section>
    );
  }

  if (project.styleVariant === "mr-chow") {
    return (
      <section className="relative min-h-[760px] overflow-hidden border-b border-[var(--fp-border)]">
        <div className="absolute inset-0">
          <HeroImage
            project={project}
            theme={theme}
            priority
            className="opacity-75"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-0 top-0 w-2 bg-[var(--fp-accent)]" />
        </div>

        <Container className="relative z-10 flex min-h-[760px] flex-col justify-between py-16 lg:py-20">
          <Reveal>
            <BackLink labels={labels} locale={locale} />
          </Reveal>
          <Reveal delay={0.14}>
            <div className="max-w-4xl">
              <HeroTitle project={project} />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {project.facts.map((fact) => (
                <span
                  key={fact.label}
                  className="border border-[var(--fp-border)] bg-black/40 px-4 py-3 text-sm text-white/80 backdrop-blur-sm"
                >
                  <span className="text-[var(--fp-accent)]">{fact.label}</span>{" "}
                  {fact.value}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  if (project.styleVariant === "poissonchat") {
    return (
      <section className="border-b border-[var(--fp-border)] py-20 lg:py-28">
        <Container>
          <Reveal>
            <BackLink labels={labels} locale={locale} />
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <Reveal>
              <HeroTitle project={project} />
            </Reveal>

            <Reveal delay={0.12}>
              <p className="max-w-xl text-lg leading-8 text-white/60">
                {project.intro}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <Reveal className="relative aspect-[16/9] overflow-hidden border border-[var(--fp-border)]">
              <HeroImage project={project} theme={theme} priority />
            </Reveal>
            <div className="grid gap-4">
              {project.gallery.slice(1, 3).map((image, index) => (
                <Reveal
                  key={image}
                  delay={0.1 + index * 0.08}
                  className="relative aspect-[4/3] overflow-hidden border border-[var(--fp-border)]"
                >
                  <Image
                    src={image}
                    alt={`${project.title} ${index + 2}`}
                    fill
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    className={clsx("object-cover", theme.imageTreatment)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (project.styleVariant === "sense") {
    return (
      <section className="border-b border-[var(--fp-border)] py-20 lg:py-28">
        <Container>
          <Reveal>
            <BackLink labels={labels} locale={locale} />
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-14 max-w-5xl text-center">
            <HeroTitle project={project} />
          </Reveal>

          <Reveal delay={0.18} className="relative mt-12 aspect-[16/9] overflow-hidden border border-[var(--fp-border)] bg-[var(--fp-panel)]">
            <HeroImage project={project} theme={theme} priority />
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative min-h-[720px] overflow-hidden border-b border-[var(--fp-border)]">
      <div className="absolute inset-0">
        <HeroImage
          project={project}
          theme={theme}
          priority
          className="opacity-85"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.28),rgba(0,0,0,0.04))]" />
      </div>

      <Container className="relative z-10 flex min-h-[720px] flex-col justify-between py-16 lg:py-20">
        <Reveal>
          <BackLink labels={labels} locale={locale} />
        </Reveal>
        <Reveal delay={0.16}>
          <div className="max-w-4xl">
            <HeroTitle project={project} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ProjectOverview({
  project,
  labels,
}: {
  project: FeaturedProjectContent;
  labels: FeaturedProjectDetailLabels;
}) {
  return (
    <section className="border-b border-[var(--fp-border)] py-20 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal>
          <p className="text-sm uppercase tracking-normal text-[var(--fp-accent)]">
            {labels.overview}
          </p>
          <div className="mt-8 grid gap-3">
            {project.facts.map((fact) => (
              <div
                key={fact.label}
                className="border border-[var(--fp-border)] bg-[var(--fp-panel)] p-5"
              >
                <p className="text-xs uppercase tracking-normal text-white/50">
                  {fact.label}
                </p>
                <p className="mt-2 text-xl text-white">{fact.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start">
            <div>
              <p className="text-3xl leading-tight text-white md:text-5xl">
                {project.intro}
              </p>
              <p className="mt-8 text-lg leading-9 text-white/60">
                {project.description}
              </p>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--fp-border)] bg-[var(--fp-panel)]">
              <Image
                src={project.overviewImage}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ProjectConcept({
  project,
  labels,
}: {
  project: FeaturedProjectContent;
  labels: FeaturedProjectDetailLabels;
}) {
  return (
    <section className="border-b border-[var(--fp-border)] py-20 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <p className="text-sm uppercase tracking-normal text-[var(--fp-accent)]">
            {labels.concept}
          </p>
          <h2 className="mt-5 max-w-3xl text-5xl leading-tight tracking-normal text-white md:text-6xl">
            {project.conceptTitle}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-white/60">
            {project.conceptText}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="border border-[var(--fp-border)] bg-[var(--fp-panel)] p-6 md:p-8">
            <div className="flex items-center gap-3 text-[var(--fp-accent)]">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-2xl tracking-normal text-white">
                {labels.highlights}
              </h3>
            </div>

            <div className="mt-7 grid gap-4">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 text-white/70">
                  <Check className="mt-1 h-5 w-5 flex-none text-[var(--fp-accent)]" />
                  <p className="text-base leading-7 text-white/70">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 grid gap-6 md:grid-cols-2">
              <MaterialList title={labels.materials} items={project.materials} />
              <MaterialList title={labels.finishes} items={project.finishes} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function MaterialList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-[var(--fp-accent)]">
        <Layers className="h-4 w-4" />
        <h4 className="text-sm uppercase tracking-normal text-white/50">
          {title}
        </h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="border border-[var(--fp-border)] bg-black/20 px-3 py-2 text-sm text-white/75"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectGallery({
  project,
  labels,
  theme,
}: {
  project: FeaturedProjectContent;
  labels: FeaturedProjectDetailLabels;
  theme: Theme;
}) {
  const gallery = project.gallery.slice(0, 8);

  return (
    <section className="border-b border-[var(--fp-border)] py-20 lg:py-24">
      <Container>
        <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-normal text-[var(--fp-accent)]">
              {labels.gallery}
            </p>
            <h2 className="mt-4 text-5xl leading-tight tracking-normal text-white md:text-6xl">
              {project.title}
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-white/60">
            {project.subtitle}
          </p>
        </Reveal>

        <div className={galleryGridClass(project.styleVariant)}>
          {gallery.map((image, index) => (
            <Reveal
              key={`${project.slug}-gallery-${index}`}
              delay={index * 0.05}
              className={galleryItemClass(project.styleVariant, index)}
            >
              <Image
                src={image}
                alt={`${project.title} ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={clsx(
                  "object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]",
                  theme.imageTreatment
                )}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function galleryGridClass(styleVariant: FeaturedProjectStyle) {
  if (styleVariant === "mr-chow") {
    return "grid gap-4 md:grid-cols-2 lg:grid-cols-[0.9fr_1.1fr_0.8fr]";
  }

  if (styleVariant === "mavrommatis") {
    return "grid gap-4 md:grid-cols-2 lg:grid-cols-3";
  }

  if (styleVariant === "sense") {
    return "grid gap-4 md:grid-cols-2";
  }

  return "grid gap-4 md:grid-cols-2 lg:grid-cols-4";
}

function galleryItemClass(styleVariant: FeaturedProjectStyle, index: number) {
  const base = "relative overflow-hidden border border-[var(--fp-border)] bg-[var(--fp-panel)]";

  if (styleVariant === "mavrommatis" && index === 0) {
    return clsx(base, "aspect-[16/10] lg:col-span-2");
  }

  if (styleVariant === "mr-chow" && index === 0) {
    return clsx(base, "aspect-[4/5] md:row-span-2");
  }

  if (styleVariant === "poissonchat" && index === 0) {
    return clsx(base, "aspect-[16/10] lg:col-span-2");
  }

  if (styleVariant === "sense" && index === 0) {
    return clsx(base, "aspect-[16/9] md:col-span-2");
  }

  return clsx(base, "aspect-[4/5]");
}

function RelatedFeaturedProjects({
  projects,
  locale,
  labels,
}: {
  projects: FeaturedProjectCard[];
  locale: string;
  labels: FeaturedProjectDetailLabels;
}) {
  if (!projects.length) return null;

  return (
    <section className="border-b border-[var(--fp-border)] py-20 lg:py-24">
      <Container>
        <Reveal className="mb-12 text-center">
          <p className="text-sm uppercase tracking-normal text-[var(--fp-accent)]">
            {labels.relatedSubtitle}
          </p>
          <h2 className="mt-4 text-5xl leading-tight tracking-normal text-white md:text-6xl">
            {labels.relatedTitle}
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              locale={locale}
              slug={project.slug}
              image={project.image}
              categoryLabel={project.categoryLabel}
              title={project.title}
              href={`/${locale}/projetos-destaque/${project.slug}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeaturedProjectCta({
  locale,
  labels,
}: {
  locale: string;
  labels: FeaturedProjectDetailLabels;
}) {
  return (
    <section className="py-20 lg:py-24">
      <Container className="text-center">
        <Reveal>
          <p className="text-sm uppercase tracking-normal text-[var(--fp-accent)]">
            J. Mendes Mobiliario
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-5xl leading-tight tracking-normal text-white md:text-6xl">
            {labels.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            {labels.ctaDescription}
          </p>
          <div className="mt-9 flex justify-center">
            <Button href={`/${locale}/contacto`}>
              {labels.ctaButton}
              <ArrowUpRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
