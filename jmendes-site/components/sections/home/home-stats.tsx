import { useTranslations } from "next-intl";
import { stats } from "@/data/stats";
import CountUpNumber from "@/components/ui/count-up-number";
import Reveal from "@/components/ui/reveal";
import Container from "@/components/ui/container";

// Reutiliza os mesmos dados e etiquetas da página Sobre para manter os números
// consistentes em todo o site.
export default function HomeStats() {
  const t = useTranslations("About.stats");

  return (
    <section className="border-b border-[var(--border)] py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4">
          {stats.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.12}>
              <div className="group">
                <p className="text-5xl text-gold transition duration-700 ease-out group-hover:-translate-y-1 md:text-6xl">
                  <CountUpNumber value={item.value} delay={i * 120} />
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-[var(--muted)] transition-colors duration-500 ease-out group-hover:text-white">
                  {t(`items.${item.key}`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
