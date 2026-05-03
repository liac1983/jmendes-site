import { useTranslations } from "next-intl";

export default function MissionVisionValues() {
  const t = useTranslations("About.missionVision");

  return (
    <section className="border-t border-[var(--border)] py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-3">
        
        <div>
          <h3 className="text-2xl text-gold mb-4">{t("mission.title")}</h3>
          <p className="text-[var(--muted)] leading-7">
            {t("mission.description")}
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-gold mb-4">{t("vision.title")}</h3>
          <p className="text-[var(--muted)] leading-7">
            {t("vision.description")}
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-gold mb-4">{t("values.title")}</h3>
          <p className="text-[var(--muted)] leading-7">
            {t("values.description")}
          </p>
        </div>

      </div>
    </section>
  );
}
