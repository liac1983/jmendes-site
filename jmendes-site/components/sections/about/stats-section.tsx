import { useTranslations } from "next-intl";
import { stats } from "@/data/stats";
import CountUpNumber from "@/components/ui/count-up-number";
import Reveal from "@/components/ui/reveal";

export default function StatsSection() {
  const t = useTranslations("About.stats");

  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-6 text-center md:grid-cols-4">
        {stats.map((item, i) => (
          <Reveal key={item.key} delay={i * 0.12}>
            <div className="group">
              <p className="text-4xl text-gold transition duration-700 ease-out group-hover:-translate-y-1 group-hover:text-[var(--gold)] md:text-5xl">
                <CountUpNumber value={item.value} delay={i * 120} />
              </p>
              <p className="mt-2 text-sm text-[var(--muted)] transition-colors duration-500 ease-out group-hover:text-white">
                {t(`items.${item.key}`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
