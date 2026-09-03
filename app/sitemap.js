import { getSiteUrl } from "../lib/site";
import { decodeCategorySlug } from "../lib/category-routing";
import {
  getSitemapBlogPosts,
  getSitemapBlogCategories,
} from "../lib/sitemap-data";

/** Indexable static pages (excludes auth, /team noindex, legacy redirects). */
const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/klinichni-prouchvaniya", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/klinichni-prouchvaniya/nameri-klinichno-prouchvane",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/klinichni-prouchvaniya/zdravi-dobrovoltsi",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/klinichni-prouchvaniya/patsienti",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "/chesto-zadavani-vaprosi", changeFrequency: "monthly", priority: 0.7 },
  { path: "/nashata-misiya", changeFrequency: "monthly", priority: 0.6 },
  { path: "/patiat-na-patsienta", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

function toLastModified(modified) {
  if (!modified) return undefined;
  const date = new Date(modified);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function entry(siteUrl, path, options = {}) {
  return {
    url: `${siteUrl}${path}`,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

export default async function sitemap() {
  const siteUrl = getSiteUrl();

  let posts = [];
  let categories = [];

  try {
    [posts, categories] = await Promise.all([
      getSitemapBlogPosts(),
      getSitemapBlogCategories(),
    ]);
  } catch {
    // Return static routes only if WordPress is unreachable
  }

  if (!Array.isArray(posts)) posts = [];
  if (!Array.isArray(categories)) categories = [];

  const staticEntries = STATIC_ROUTES.map((route) =>
    entry(siteUrl, route.path, {
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  );

  const postEntries = posts.map((post) =>
    entry(siteUrl, `/blog/${post.slug}`, {
      lastModified: toLastModified(post.modified),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const categoryEntries = categories.map((cat) =>
    entry(siteUrl, `/kategoriya/${decodeCategorySlug(cat.slug)}`, {
      lastModified: toLastModified(cat.modified),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [
    ...staticEntries,
    ...postEntries,
    ...categoryEntries,
  ];
}
