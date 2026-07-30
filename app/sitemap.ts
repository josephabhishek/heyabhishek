import type { MetadataRoute } from 'next';
import { mvpRoutes } from '@/config/routes';
import { absoluteUrl } from '@/lib/url';

/**
 * Sitemap, generated from the route registry so a route cannot exist without
 * appearing here. Content documents are appended in Sprint 02 once the
 * loaders are wired to routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return mvpRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.path === '/' ? 'weekly' : 'monthly',
    priority: route.path === '/' ? 1 : 0.7,
  }));
}
