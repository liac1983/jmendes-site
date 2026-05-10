import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal, { ImageReveal } from "@/components/ui/reveal";

export default function StorySection() {
  const t = useTranslations("About.story");

  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-2">
        {/* texto */}
        <div>
          <Reveal>
            <h2 className="text-4xl mb-6">{t("title")}</h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-[var(--muted)] leading-7 mb-6">
              {t.rich("paragraph1", {
                brand: (chunks) => <span className="text-gold">{chunks}</span>,
              })}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="text-[var(--muted)] leading-7 mb-6">
              {t("paragraph2")}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-[var(--muted)] leading-7">
              {t("paragraph3")}
            </p>
          </Reveal>
        </div>

        {/* imagens */}
        <div className="flex gap-6">
          <ImageReveal className="w-1/2">
            <Image
              src="/images/sobre/story-1.jpeg"
              alt={t("imageAlt1")}
              width={1024}
              height={1280}
              sizes="(min-width: 1024px) 320px, 50vw"
              className="w-full object-cover"
            />
          </ImageReveal>
          <ImageReveal className="mt-10 w-1/2" delay={0.18}>
            <Image
              src="/images/sobre/story-2.jpg"
              alt={t("imageAlt2")}
              width={576}
              height={720}
              sizes="(min-width: 1024px) 320px, 50vw"
              className="w-full object-cover"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
