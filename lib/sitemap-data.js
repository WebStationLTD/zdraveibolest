const WP_API =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://zdraveibolest.admin-panels.com/wp-json/wp/v2";

const SITEMAP_REVALIDATE = 3600;

async function fetchAllPages(endpoint) {
  const items = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(`${WP_API}/${endpoint}&page=${page}`, {
      next: { revalidate: SITEMAP_REVALIDATE },
    });

    if (!res.ok) {
      break;
    }

    totalPages = Number(res.headers.get("x-wp-totalpages") || 1);
    const data = await res.json();

    if (!Array.isArray(data)) {
      break;
    }

    items.push(...data);
    page += 1;
  }

  return items;
}

/** Blog posts in category 19 (Статии) */
export async function getSitemapBlogPosts() {
  return fetchAllPages(
    "posts?categories=19&per_page=100&_fields=slug,modified"
  );
}

/** Therapeutic areas (services CPT) */
export async function getSitemapTherapeuticAreas() {
  return fetchAllPages("services?per_page=100&_fields=slug,modified");
}

/** Team members */
export async function getSitemapTeamMembers() {
  return fetchAllPages("members?per_page=100&_fields=slug,modified");
}

/** Blog categories (non-empty) */
export async function getSitemapBlogCategories() {
  try {
    const res = await fetch(
      `${WP_API}/categories?per_page=100&hide_empty=true&_fields=slug,modified`,
      { next: { revalidate: SITEMAP_REVALIDATE } }
    );
    if (!res.ok) return [];
    const categories = await res.json();
    if (!Array.isArray(categories)) return [];
    return categories.filter((cat) => cat.slug !== "uncategorized");
  } catch {
    return [];
  }
}
