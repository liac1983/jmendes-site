import Container from "@/components/ui/container";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/project-types";
import Reveal from "@/components/ui/reveal";

type Props = {
  project: Project;
};

export default function ProjectMaterials({ project }: Props) {
  const t = useTranslations("Portfolio.project.materials");

  // Só mostra as caixas com itens; sem nenhuma, a secção não aparece.
  const boxes = [
    { key: "material", title: t("materials"), items: project.materials ?? [] },
    { key: "finish", title: t("finishes"), items: project.finishes ?? [] },
  ]
    .map((box) => ({ ...box, items: box.items.filter((item) => item?.trim()) }))
    .filter((box) => box.items.length > 0);

  if (boxes.length === 0) return null;

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

        <div
          className={`mt-14 grid gap-8 ${boxes.length > 1 ? "lg:grid-cols-2" : "mx-auto max-w-2xl"}`}
        >
          {boxes.map((box, boxIndex) => (
            <Reveal key={box.key} delay={0.12 * (boxIndex + 1)}>
              <div className="border border-[var(--border)] p-10 transition duration-700 ease-out hover:border-[rgba(200,168,90,0.36)] hover:bg-white/[0.02]">
                <h3 className="text-4xl text-gold">{box.title}</h3>

                <ul className="mt-8 space-y-5">
                  {box.items.map((item, index) => (
                    <li
                      key={`${project.slug}-${box.key}-${index}`}
                      className="group flex items-start gap-3 text-xl text-[var(--muted)] transition-colors duration-500 ease-out hover:text-white"
                    >
                      <span className="mt-2 h-2 w-2 bg-[var(--gold)] transition-transform duration-500 ease-out group-hover:scale-125" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
