import Image from "next/image";
import { useTranslations } from "next-intl";

export default function StorySection() {
  const t = useTranslations("About.story");

  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-2">
        {/* texto */}
        <div>
          <h2 className="text-4xl mb-6">{t("title")}</h2>

          <p className="text-[var(--muted)] leading-7 mb-6">
            {t.rich("paragraph1", {
              brand: (chunks) => <span className="text-gold">{chunks}</span>,
            })}
          </p>

          <p className="text-[var(--muted)] leading-7 mb-6">
            {t("paragraph2")}
          </p>

          <p className="text-[var(--muted)] leading-7">
            {t("paragraph3")}
          </p>
        </div>

        {/* imagens */}
        <div className="flex gap-6">
          <Image
            src="/images/sobre/story-1.jpeg"
            alt={t("imageAlt1")}
            width={1024}
            height={1280}
            sizes="(min-width: 1024px) 320px, 50vw"
            className="w-1/2 object-cover"
          />
          <Image
            src="/images/sobre/story-2.jpg"
            alt={t("imageAlt2")}
            width={576}
            height={720}
            sizes="(min-width: 1024px) 320px, 50vw"
            className="w-1/2 object-cover mt-10"
          />
        </div>
      </div>
    </section>
  );
}
