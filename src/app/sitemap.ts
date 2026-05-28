import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getProjectSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/publications",
    "/projects",
    "/team",
    "/news",
    "/contact",
  ];

  const projectRoutes = getProjectSlugs().map(
    (slug) => `/projects/${slug}`,
  );

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
