const WP_API =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://zdraveibolest.admin-panels.com/wp-json/wp/v2";

const SITEMAP_REVALIDATE = 3600;

async function fetchAllPages(endpoint) {
  const items = [];
  let page = 1;
  let totalPages = 1;

  try {
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
  } catch {
    return items;
  }

  return items;
}

/** All published blog posts (not limited to a single category). */
export async function getSitemapBlogPosts() {
  try {
    return await fetchAllPages(
      "posts?status=publish&per_page=100&_fields=slug,modified"
    );
  } catch {
    return [];
  }
}

/** Therapeutic areas (services CPT) */
export async function getSitemapTherapeuticAreas() {
  try {
    return await fetchAllPages("services?per_page=100&_fields=slug,modified");
  } catch {
    return [];
  }
}

/** Team members */
export async function getSitemapTeamMembers() {
  try {
    return await fetchAllPages("members?per_page=100&_fields=slug,modified");
  } catch {
    return [];
  }
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
