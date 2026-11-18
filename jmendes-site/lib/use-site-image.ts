import { useTranslations } from "next-intl";

// Imagem escolhida no painel (Sanity → "Imagens do site") ou, se não houver, a do código.
// A lista de chaves está em lib/site-image-slots.ts.
export function useSiteImage(key: string, fallback: string) {
  const t = useTranslations("SiteImages");
  return t.has(key) ? t(key) : fallback;
}
