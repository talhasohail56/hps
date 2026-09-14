import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { serviceAreas } from "@/lib/data/areas";
import { getPublishedPosts } from "@/lib/blog/db";
import { isNoindexed } from "@/lib/blog/noindex";

export const revalidate = 3600;

function postDate(post: {
  updatedAt?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
}): Date {
  const raw = post.updatedAt || post.publishedAt || post.createdAt;
  return raw ? new Date(raw) : new Date(0);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    // Blog DB may not be available during build
  }

  const latestPostDate = posts.length
    ? posts
        .map(postDate)
        .reduce((a, b) => (a > b ? a : b), new Date(0))
    : new Date(0);

  // Stable date for non-blog pages — only changes on deploy when content edits land.
  const siteDate = new Date(siteConfig.contentUpdatedAt);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: siteDate, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: siteDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: siteDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: siteDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/plans`, lastModified: siteDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/areas`, lastModified: siteDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.7 },
    // /payments is intentionally noindex (see src/app/payments/layout.tsx) —
    // listing it here tells Google to crawl a page it isn't allowed to index,
    // which GSC flags as a "noindex" coverage error.
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: siteDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const areaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${baseUrl}/areas/${area.id}`,
    lastModified: siteDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Noindexed posts must never be submitted for indexing — doing so is what
  // produces the "Submitted URL marked noindex" coverage error in GSC.
  const blogPages: MetadataRoute.Sitemap = posts
    .filter((post) => !isNoindexed(post.slug))
    .map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: postDate(post),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...servicePages, ...areaPages, ...blogPages];
}
