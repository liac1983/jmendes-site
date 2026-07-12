import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL, business, locales, pagePaths, type PageKey } from "./site";

const ogLocale: Record<string, string> = {
  pt: "pt_PT",
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

// URLs alternativas (hreflang) para uma página em todos os idiomas.
function languageAlternates(key: PageKey) {
  const path = pagePaths[key];
  return Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
  ) as Record<string, string>;
}

// Metadata por página, reutilizável em cada page.tsx via generateMetadata.
export async function pageMetadata(
  locale: string,
  key: PageKey
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const url = `${SITE_URL}/${locale}${pagePaths[key]}`;

  return {
    // Na home usamos título absoluto (sem o sufixo do template).
    title: key === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(key),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      locale: ogLocale[locale] ?? "pt_PT",
      type: "website",
      images: [{ url: business.ogImage, width: 1200, height: 630, alt: business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [business.ogImage],
    },
  };
}
