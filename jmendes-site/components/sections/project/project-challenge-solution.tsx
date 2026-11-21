import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/project-types";

type Props = {
  project: Project;
};

export default function ProjectChallengeSolution({ project }: Props) {
  const t = useTranslations("Portfolio.project.challengeSolution");

  // Só mostra os blocos que têm texto; sem nenhum, a secção não aparece.
  const blocks = [
    { key: "challenge", title: t("challenge"), text: project.challenge?.trim() },
    { key: "solution", title: t("solution"), text: project.solution?.trim() },
  ].filter((block) => block.text);

  if (blocks.length === 0) return null;

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-28">
      <Container>
        <div
          className={`grid gap-16 ${blocks.length > 1 ? "lg:grid-cols-2" : "mx-auto max-w-4xl"}`}
        >
          {blocks.map((block) => (
            <div key={block.key}>
              <h2 className="text-5xl text-gold md:text-6xl">{block.title}</h2>
              <p className="mt-8 text-xl leading-9 text-[var(--muted)]">
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
