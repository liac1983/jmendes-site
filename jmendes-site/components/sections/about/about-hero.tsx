import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("About.hero");

  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="/images/sobre/hero.jpg"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* conteúdo */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div>
          <h1 className="text-5xl md:text-7xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
