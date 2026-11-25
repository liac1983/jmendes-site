import type { MetadataRoute } from "next";
import { SITE_URL, locales, pagePaths } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { localFeaturedProjects } from "@/data/featured-projects";
import {
  featuredProjectSlugsQuery,
  grupoRenderSlugsQuery,
  productLineSlugsQuery,
  projectSlugsQuery,
} from "@/sanity/lib/queries";

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

async function slugs(query: string) {
  try {
    return (await client.fetch<{ slug: string }[]>(query)).map((item) => item.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let projects: { slug: string; updatedAt: string }[] = [];
  try {
    projects = await client.fetch(projectSlugsQuery);
  } catch {
    // Sem ligação ao Sanity: fica só com as páginas fixas.
  }

  // Projetos em destaque: os do painel; os do código só se o painel não responder,
  // porque alguns repetem projetos do painel com outro endereço.
  const featuredFromSanity = await slugs(featuredProjectSlugsQuery);
  const featured = featuredFromSanity.length
    ? featuredFromSanity
    : localFeaturedProjects.map((project) => project.slug);
  const details = [
    ...featured.map((slug) => `/projetos-destaque/${slug}`),
    ...(await slugs(productLineSlugsQuery)).map((slug) => `/linhas/${slug}`),
    ...(await slugs(grupoRenderSlugsQuery)).map((slug) => `/renders/${slug}`),
  ];

  return [
    ...Object.values(pagePaths).flatMap((path) => entries(path, path === "" ? 1 : 0.8, now)),
    ...projects.flatMap(({ slug, updatedAt }) =>
      entries(`/portfolio/${slug}`, 0.6, new Date(updatedAt))
    ),
    ...details.flatMap((path) => entries(path, 0.6, now)),
  ];
}
