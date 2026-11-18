// Junta às traduções do código os textos e imagens alterados no painel (Sanity).
// Se o Sanity falhar, o site continua com os textos e imagens do código.
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { siteImagesQuery, siteTextsQuery } from "@/sanity/lib/queries";
import type { Image } from "sanity";

type Messages = Record<string, unknown>;
type SiteText = { chave: string } & Partial<Record<"pt" | "en" | "fr" | "es", string>>;
type SiteImage = { chave: string; imagem: Image };

// O texto escrito no painel é texto simples: chavetas e < > não podem ser lidos como
// formatação, exceto as etiquetas que já existiam no texto original (ex.: <brand>).
export function escapeForMessage(value: string, original: string) {
  const allowed = new Set(
    Array.from(original.matchAll(/<\/?(\w+)>/g), (m) => m[1])
  );
  return value
    .replace(/'/g, "''")
    .replace(/[{}]/g, (c) => `'${c}'`)
    .replace(/<\/?(\w+)>|[<>]/g, (match, tag?: string) =>
      tag && allowed.has(tag) ? match : `'${match}'`
    );
}

function getAt(obj: Messages, path: string[]): unknown {
  let node: unknown = obj;
  for (const part of path) {
    if (!node || typeof node !== "object") return undefined;
    node = (node as Messages)[part];
  }
  return node;
}

function setAt(obj: Messages, path: string[], value: unknown) {
  let node = obj;
  for (const part of path.slice(0, -1)) {
    if (!node[part] || typeof node[part] !== "object") node[part] = {};
    node = node[part] as Messages;
  }
  node[path[path.length - 1]] = value;
}

export async function withSiteContent(locale: string, messages: Messages) {
  const merged: Messages = structuredClone(messages);

  const [texts, images] = await Promise.all([
    client.fetch<SiteText[]>(siteTextsQuery).catch(() => [] as SiteText[]),
    client.fetch<SiteImage[]>(siteImagesQuery).catch(() => [] as SiteImage[]),
  ]);

  for (const item of texts) {
    const value = item[locale as keyof SiteText]?.trim();
    if (!value) continue;
    const path = item.chave.split(".");
    const original = getAt(merged, path);
    // Só substitui textos que existem no código (evita chaves antigas ou erradas).
    if (typeof original !== "string") continue;
    setAt(merged, path, escapeForMessage(value, original));
  }

  const siteImages: Messages = {};
  for (const item of images) {
    try {
      setAt(siteImages, item.chave.split("."), urlFor(item.imagem).width(2400).auto("format").url());
    } catch {
      // imagem inválida: fica a do código
    }
  }
  merged.SiteImages = siteImages;

  return merged;
}
