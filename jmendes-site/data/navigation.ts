export const navigation = [
  { label: "Início", href: "" },
  { label: "Sobre", href: "/sobre" },
  { label: "Processo", href: "/processo" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Linhas", href: "/linhas" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contacto", href: "/contacto" },
];

export const locales = ["pt", "en", "fr", "es"] as const;
export type AppLocale = (typeof locales)[number];

