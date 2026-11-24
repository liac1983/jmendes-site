import type { MetadataRoute } from "next";
import { SITE_URL, locales, pagePaths } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { projectSlugsQuery } from "@/sanity/lib/queries";

// Os projetos publicados no painel entram no mapa do site no máximo uma hora depois.
export const revalidate = 3600;

function entries(path: string, priority: number, lastModified: Date) {
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let projects: { slug: string; updatedAt: string }[] = [];
  try {
    projects = await client.fetch(projectSlugsQuery);
  } catch {
    // Sem ligação ao Sanity: fica só com as páginas fixas.
  }

  return [
    ...Object.values(pagePaths).flatMap((path) => entries(path, path === "" ? 1 : 0.8, now)),
    ...projects.flatMap(({ slug, updatedAt }) =>
      entries(`/portfolio/${slug}`, 0.6, new Date(updatedAt))
    ),
  ];
}
