// Configuração central do site para SEO / metadata / structured data.
// IMPORTANTE: em produção, definir NEXT_PUBLIC_SITE_URL com o domínio final
// (ex.: https://www.jaimemendes.com). O fallback abaixo é só para dev/preview.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jaimemendes.com"
).replace(/\/$/, "");

export const locales = ["pt", "en", "fr", "es"] as const;
export const defaultLocale = "pt";

// Dados da empresa (usados no structured data LocalBusiness e nos contactos).
export const business = {
  name: "J. Mendes Mobiliário",
  legalName: "J. Mendes Mobiliário",
  email: "geral@jaimemendes.com",
  telephone: "+351255873030",
  phones: ["+351255873030", "+351933085707", "+351914332572"],
  address: {
    street: "Praça 20 de maio, 39",
    postalCode: "4590-182",
    locality: "Paços de Ferreira",
    country: "PT",
  },
  social: [
    "https://www.facebook.com/jmendes.mobiliario.9/",
    "https://www.instagram.com/jmendesmobiliario/",
    "https://www.tiktok.com/@jmendes.mobiliario",
  ],
  // Imagem usada nas pré-visualizações de partilha (Open Graph / Twitter).
  ogImage: "/images/home/hero-workshop.jpg",
  logo: "/logo.jpg",
};

// Rotas estáticas (chave -> caminho) partilhadas por SEO e sitemap.
export const pagePaths = {
  home: "",
  sobre: "/sobre",
  processo: "/processo",
  projetos: "/projetos-destaque",
  servicos: "/servicos",
  linhas: "/linhas",
  catalogos: "/catalogos",
  renders: "/renders",
  materiais: "/materiais",
  orcamento: "/orcamento",
  contacto: "/contacto",
  privacidade: "/privacidade",
} as const;

export type PageKey = keyof typeof pagePaths;
