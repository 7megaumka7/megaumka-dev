import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { projects } from "@/lib/projects";

const BASE_URL = "https://megaumka.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const demoRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.demoHref?.startsWith("/demo/"))
    .map((p) => ({
      url: `${BASE_URL}${p.demoHref}`,
      changeFrequency: "monthly",
      priority: 0.4,
    }));

  return [...staticRoutes, ...postRoutes, ...demoRoutes];
}
