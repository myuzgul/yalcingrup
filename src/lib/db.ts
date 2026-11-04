import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');

function readJson<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultValue;
  }
}

function writeJson<T>(filename: string, data: T): boolean {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

export interface Post {
  id: number | string;
  title: string;
  slug: string;
  date: string;
  modified?: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  altText?: string;
  categories: string[];
  link?: string;
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface PageItem {
  id: number | string;
  title: string;
  slug: string;
  date?: string;
  content: string;
  featuredImage?: string;
  link?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ProjectItem {
  title: string;
  slug: string;
  category: string;
  featuredImage?: string;
  gallery: string[];
  link?: string;
  description?: string;
  year?: string;
  location?: string;
  area?: string;
  scope?: string;
  concept?: string;
  engineering?: string;
  materials?: string[];
}

export interface PrefabrikHouse {
  id: number | string;
  name: string;
  slug: string;
  sku: string;
  price?: number | null;
  priceFormatted?: string;
  regularPrice?: number | null;
  regularPriceFormatted?: string;
  structureType: string;
  categorySlug: string;
  area: number | null;
  rooms: string;
  isDubleks: boolean;
  isCelik: boolean;
  categories: string[];
  featuredImage?: string;
  planImage?: string;
  gallery: string[];
  shortDescription?: string;
  specifications: Record<string, string>;
  includedInPrice?: string;
  excludedFromPrice?: string;
  manufacturerScope?: string;
  yalcinGrupScope?: string;
  contractNotice?: string;
}

export interface CategoryItem {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
  workingHours: string;
  instagram: string;
  linkedin: string;
  googleSiteVerification: string;
  gtmId: string;
}

export interface MenuItem {
  label: string;
  url: string;
  children?: { label: string; url: string }[];
}

export interface MenusConfig {
  header: MenuItem[];
  footerQuickLinks: MenuItem[];
  footerServices: MenuItem[];
}

// POSTS
export function getPosts(): Post[] {
  return readJson<Post[]>('posts.json', []);
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getPosts();
  return posts.find(p => p.slug === slug || p.slug === decodeURIComponent(slug));
}

export function savePost(post: Partial<Post> & { title: string; slug: string }): Post {
  const posts = getPosts();
  const existingIdx = posts.findIndex(p => p.id === post.id || p.slug === post.slug);
  
  const updatedPost: Post = {
    id: post.id || Date.now(),
    title: post.title,
    slug: post.slug,
    date: post.date || new Date().toISOString(),
    modified: new Date().toISOString(),
    content: post.content || '',
    excerpt: post.excerpt || '',
    featuredImage: post.featuredImage || '',
    altText: post.altText || post.title,
    categories: post.categories || ['Genel'],
    published: post.published !== undefined ? post.published : true,
    metaTitle: post.metaTitle || post.title,
    metaDescription: post.metaDescription || (post.excerpt ? post.excerpt.substring(0, 160) : '')
  };

  if (existingIdx >= 0) {
    posts[existingIdx] = { ...posts[existingIdx], ...updatedPost };
  } else {
    posts.unshift(updatedPost);
  }

  writeJson('posts.json', posts);
  return updatedPost;
}

export function deletePost(id: number | string): boolean {
  const posts = getPosts();
  const filtered = posts.filter(p => String(p.id) !== String(id));
  return writeJson('posts.json', filtered);
}

// PAGES
export function getPages(): PageItem[] {
  return readJson<PageItem[]>('pages.json', []);
}

export function getPageBySlug(slug: string): PageItem | undefined {
  const pages = getPages();
  return pages.find(p => p.slug === slug || p.slug === decodeURIComponent(slug));
}

export function savePage(page: PageItem): PageItem {
  const pages = getPages();
  const idx = pages.findIndex(p => String(p.id) === String(page.id) || p.slug === page.slug);
  if (idx >= 0) {
    pages[idx] = { ...pages[idx], ...page };
  } else {
    pages.push(page);
  }
  writeJson('pages.json', pages);
  return page;
}

// PROJECTS
export function getProjects(): ProjectItem[] {
  return readJson<ProjectItem[]>('projects.json', []);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const projects = getProjects();
  return projects.find(p => p.slug === slug || p.slug === decodeURIComponent(slug));
}

export function saveProject(project: ProjectItem): ProjectItem {
  const projects = getProjects();
  const idx = projects.findIndex(p => p.slug === project.slug);
  if (idx >= 0) {
    projects[idx] = { ...projects[idx], ...project };
  } else {
    projects.push(project);
  }
  writeJson('projects.json', projects);
  return project;
}

export function deleteProject(slug: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter(p => p.slug !== slug);
  return writeJson('projects.json', filtered);
}

// CATEGORIES
export function getCategories(): CategoryItem[] {
  return readJson<CategoryItem[]>('categories.json', []);
}

export function saveCategory(category: CategoryItem): CategoryItem {
  const cats = getCategories();
  const idx = cats.findIndex(c => String(c.id) === String(category.id) || c.slug === category.slug);
  if (idx >= 0) {
    cats[idx] = { ...cats[idx], ...category };
  } else {
    cats.push(category);
  }
  writeJson('categories.json', cats);
  return category;
}

export function deleteCategory(idOrSlug: string): boolean {
  const cats = getCategories();
  const filtered = cats.filter(c => String(c.id) !== idOrSlug && c.slug !== idOrSlug);
  return writeJson('categories.json', filtered);
}

// SETTINGS
export function getSettings(): SiteSettings {
  return readJson<SiteSettings>('settings.json', {
    siteTitle: 'Yalçın Grup Mimarlık',
    siteDescription: 'Silivri mimari tasarım ve inşaat firması.',
    phone: '+90 538 082 85 92',
    phoneRaw: '905380828592',
    email: 'info@yalcingrup.net',
    address: 'Silivri / İstanbul',
    workingHours: 'Pzt-Cmt: 09:00 - 18:30',
    instagram: 'https://instagram.com/',
    linkedin: '',
    googleSiteVerification: '',
    gtmId: ''
  });
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  writeJson('settings.json', updated);
  return updated;
}

// MENUS
export function getMenus(): MenusConfig {
  return readJson<MenusConfig>('menus.json', { header: [], footerQuickLinks: [], footerServices: [] });
}

export function updateMenus(menus: MenusConfig): boolean {
  return writeJson('menus.json', menus);
}

// PREFABRIK HOUSES
export function getPrefabrikHouses(): PrefabrikHouse[] {
  return readJson<PrefabrikHouse[]>('prefabrik.json', []);
}

export function getPrefabrikHouseBySlug(slug: string): PrefabrikHouse | undefined {
  const houses = getPrefabrikHouses();
  return houses.find(h => h.slug === slug || h.slug === decodeURIComponent(slug));
}
