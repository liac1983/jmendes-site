import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import { PenTool, Factory, Sparkles } from "lucide-react";

const items = [
  {
    key: "customProjects",
    icon: PenTool,
    lineKeys: ["customFurniture", "interiorDesign", "visualization3d"],
  },
  {
    key: "production",
    icon: Factory,
    lineKeys: ["seriesManufacturing", "industrialCapacity", "qualityControl"],
  },
  {
    key: "installation",
    icon: Sparkles,
    lineKeys: ["professionalAssembly", "fitting", "finalFinishes"],
  },
];

export default function FullService() {
  const t = useTranslations("Services.fullService");

  return (
    <section className="border-t border-[var(--border)] py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-5xl text-white">{t("title")}</h2>

          <p className="mt-4 text-[var(--muted)]">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 text-center">
          {items.map((item) => (
            <div key={item.key}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[var(--gold)] text-[var(--gold)]">
                <item.icon />
              </div>

              <h3 className="mt-6 text-xl text-white">
                {t(`items.${item.key}.title`)}
              </h3>

              <div className="mt-3 text-sm text-[var(--muted)] space-y-1">
                {item.lineKeys.map((lineKey) => (
                  <p key={lineKey}>{t(`items.${item.key}.lines.${lineKey}`)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
