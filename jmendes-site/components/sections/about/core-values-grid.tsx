import { useTranslations } from "next-intl";
import { Award, Users, Cpu, Target } from "lucide-react";

const values = [
  {
    icon: Award,
    key: "excellence",
  },
  {
    icon: Users,
    key: "team",
  },
  {
    icon: Cpu,
    key: "technology",
  },
  {
    icon: Target,
    key: "clientFocus",
  },
];

export default function CoreValuesGrid() {
  const t = useTranslations("About.coreValues");

  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-4">
        {values.map((item, i) => {
          const Icon = item.icon;

          return (
            <div key={i} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-[var(--gold)]">
                <Icon className="h-6 w-6 text-gold" />
              </div>

              <h4 className="mb-2 text-xl">{t(`items.${item.key}.title`)}</h4>
              <p className="text-sm text-[var(--muted)]">
                {t(`items.${item.key}.description`)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
