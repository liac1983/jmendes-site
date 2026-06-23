// data/navigation.ts
export const navigation = [
  { label: "home", href: "" },
  { label: "about", href: "/sobre" },
  { label: "process", href: "/processo" },
  { label: "portfolio", href: "/projetos-destaque" },
  { label: "services", href: "/servicos" },
  { label: "catalogos", href: "/catalogos" },
  { label: "contact", href: "/contacto" },
];

export const locales = ["pt", "en", "fr", "es"] as const;
export type AppLocale = (typeof locales)[number];
