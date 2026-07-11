import type { SanityGrupoRender, SanityGrupoRenderDetail, SanityGrupoRenderTranslation, SanityGrupoRenderTranslations } from "@/sanity/lib/types";

type LocaleKey = "en" | "fr" | "es";

function localizedValue<T>(translated: T | undefined, fallback: T): T {
  return translated || fallback;
}

function getTranslation(
  translations: SanityGrupoRenderTranslations | undefined,
  locale: string
): SanityGrupoRenderTranslation | undefined {
  if (locale === "pt" || !translations) return undefined;
  return translations[locale as LocaleKey];
}

export function getLocalizedGrupoRender<T extends SanityGrupoRender>(
  grupo: T,
  locale: string
): T {
  const translation = getTranslation(grupo.translations, locale);
  if (!translation) return grupo;

  return {
    ...grupo,
    titulo: localizedValue(translation.titulo, grupo.titulo),
    ...("descricao" in grupo && {
      descricao: localizedValue(
        translation.descricao,
        (grupo as SanityGrupoRenderDetail).descricao
      ),
    }),
  };
}
