import { getSiteUrl } from "../lib/site";
import {
  getSitemapBlogPosts,
  getSitemapTherapeuticAreas,
  getSitemapTeamMembers,
  getSitemapBlogCategories,
} from "../lib/sitemap-data";

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/terapevtichni-oblasti", changeFrequency: "weekly", priority: 0.9 },
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
  { path: "/chesto-zadavani-vaprosi", changeFrequency: "monthly", priority: 0.7 },
  { path: "/nashata-misiya", changeFrequency: "monthly", priority: 0.6 },
  { path: "/patiat-na-patsienta", changeFrequency: "monthly", priority: 0.6 },
  { path: "/team", changeFrequency: "monthly", priority: 0.6 },
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

  const [posts, areas, members, categories] = await Promise.all([
    getSitemapBlogPosts(),
    getSitemapTherapeuticAreas(),
    getSitemapTeamMembers(),
    getSitemapBlogCategories(),
  ]);

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

  const areaEntries = areas.map((area) =>
    entry(siteUrl, `/terapevtichni-oblasti/${area.slug}`, {
      lastModified: toLastModified(area.modified),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const memberEntries = members
    .filter((member) => member.slug)
    .map((member) =>
      entry(siteUrl, `/team/${member.slug}`, {
        lastModified: toLastModified(member.modified),
        changeFrequency: "yearly",
        priority: 0.5,
      })
    );

  const categoryEntries = categories.map((cat) =>
    entry(siteUrl, `/blog/category/${cat.slug}`, {
      lastModified: toLastModified(cat.modified),
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [
    ...staticEntries,
    ...postEntries,
    ...areaEntries,
    ...memberEntries,
    ...categoryEntries,
  ];
}
