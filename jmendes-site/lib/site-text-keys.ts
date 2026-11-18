// Lista dos textos do site que se podem alterar no painel (Sanity → "Textos do site").
// Gerada a partir das traduções em português, para o painel mostrar o texto atual de cada um.
import pt from "@/messages/pt.json";

const sectionLabels: Record<string, string> = {
  Nav: "Menu",
  Home: "Início",
  Portfolio: "Portefólio",
  FeaturedProjects: "Projetos em destaque",
  Lines: "Linhas",
  Services: "Serviços",
  Contact: "Contacto",
  About: "Sobre nós",
  Process: "Processo",
  Catalogos: "Catálogos",
  Renders: "Projetos 3D",
  Quote: "Pedido de orçamento",
  Materials: "Tecidos e acabamentos",
  Meta: "Google (títulos e descrições)",
  Privacy: "Política de privacidade",
  Cookie: "Aviso de cookies",
};

export type SiteTextKey = {
  key: string;
  section: string;
  current: string;
};

function collect(node: unknown, path: string[], out: SiteTextKey[]) {
  if (typeof node === "string") {
    // Textos com variáveis ({nome}) são montados pelo código e não se editam aqui.
    if (/[{}]/.test(node)) return;
    out.push({
      key: path.join("."),
      section: sectionLabels[path[0]] ?? path[0],
      current: node,
    });
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) collect(v, [...path, k], out);
  }
}

export const siteTextKeys: SiteTextKey[] = (() => {
  const out: SiteTextKey[] = [];
  collect(pt, [], out);
  return out;
})();

export function siteTextOptionTitle(item: SiteTextKey) {
  const clean = item.current.replace(/<\/?\w+>/g, "");
  const short = clean.length > 70 ? `${clean.slice(0, 70)}…` : clean;
  return `${item.section} — «${short}»`;
}
