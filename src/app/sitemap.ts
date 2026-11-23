import { MetadataRoute } from 'next';
import { getPosts, getPages, getProjects, getCategories, getPrefabrikHouses } from '@/lib/db';
import { SILIVRI_NEIGHBORHOODS } from '@/lib/silivri-neighborhoods';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.yalcingrupmimarlik.com';
  const posts = getPosts();
  const pages = getPages();
  const projects = getProjects();
  const categories = getCategories();
  const prefabrikHouses = getPrefabrikHouses();

  const silivriNeighborhoodUrls = SILIVRI_NEIGHBORHOODS.map((n) => ({
    url: `${baseUrl}/silivri-prefabrik-ev-yapimi/${n.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const postUrls = posts.map(p => ({
    url: `${baseUrl}/${p.slug}/`,
    lastModified: new Date(p.modified || p.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const pageUrls = pages.map(pg => ({
    url: `${baseUrl}/${pg.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const projectUrls = projects.map(proj => ({
    url: `${baseUrl}/portfolio/${proj.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const prefabrikUrls = prefabrikHouses.map(h => ({
    url: `${baseUrl}/prefabrik-ev-yapimi/${h.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const catUrls = categories.map(cat => ({
    url: `${baseUrl}/category/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projeler/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prefabrik-ev-yapimi/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/silivri-prefabrik-ev-yapimi/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/iletisim/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...silivriNeighborhoodUrls,
    ...pageUrls,
    ...postUrls,
    ...projectUrls,
    ...prefabrikUrls,
    ...catUrls
  ];
}
