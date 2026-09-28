/** WP category slugs that use the blog grid layout (not chessboard). */
export const BLOG_HUB_SLUGS = ["statii", "podkasti"];

/** Reliable WP category IDs for blog hub layout. */
export const BLOG_HUB_CATEGORY_IDS = [19, 20];
export const PODCAST_CATEGORY_ID = 20;
export const PODCAST_FEATURED_IMAGE = "/podcasts-featured.jpg";

export const BLOG_ALIAS_CANONICAL_SLUG = "statii";

/** Services CPT (older Latin) → current WP category slug. */
export const SERVICE_SLUG_TO_CATEGORY_SLUG = {
  pulmologia: "pulmologiya",
  revmatologia: "revmatologiya",
  kardiologia: "kardiologiya",
  nevrologia: "nevrologiya",
  nefrologia: "nefrologiya",
  gastroenterologia: "gastroenterologiya",
  endokrinologia: "endokrinologiya",
  onkologia: "onkologiya",
  alergologia: "alergologiya",
  dermatologia: "dermatologiya",
  hematologia: "hematologiya",
  "akusher-ginekologia": "akusher-ginekologiya",
};

/** Icons keyed by WP category slug. */
export const CATEGORY_ICONS = {
  pulmologiya: "/therapeutic-icons/pulmonology.webp",
  revmatologiya: "/therapeutic-icons/rheumatology.webp",
  kardiologiya: "/therapeutic-icons/cardiology.webp",
  nevrologiya: "/therapeutic-icons/neurology.webp",
  nefrologiya: "/therapeutic-icons/nephrology.webp",
  gastroenterologiya: "/therapeutic-icons/gastroenterology.webp",
  endokrinologiya: "/therapeutic-icons/endocrinology.webp",
  onkologiya: "/therapeutic-icons/oncology.webp",
  alergologiya: "/therapeutic-icons/allergology.webp",
  dermatologiya: "/therapeutic-icons/dermatology.webp",
  hematologiya: "/therapeutic-icons/hematology.webp",
  "akusher-ginekologiya": "/therapeutic-icons/obstetrics-gynecology.webp",
};

export function decodeCategorySlug(slug) {
  if (!slug) return slug;
  if (!slug.includes("%")) return slug;
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function normalizeCategorySlug(slug) {
  return decodeCategorySlug(slug).toLowerCase();
}

export function isBlogHubCategory(slug, categoryId) {
  if (categoryId != null && BLOG_HUB_CATEGORY_IDS.includes(Number(categoryId))) {
    return true;
  }
  const normalized = normalizeCategorySlug(slug);
  return BLOG_HUB_SLUGS.some(
    (hub) => normalizeCategorySlug(hub) === normalized
  );
}

export function isPodcastCategory(category, slug) {
  if (category?.id != null && Number(category.id) === PODCAST_CATEGORY_ID) {
    return true;
  }
  const raw = slug || category?.slug;
  if (!raw) return false;
  const normalized = normalizeCategorySlug(raw);
  return (
    normalized === "podkasti" ||
    normalized === "подкасти" ||
    normalized.includes("podcast")
  );
}

/** Public path segment for /kategoriya/{slug}. */
export function getCategoryPathSlug(slug, category) {
  const fromCategory = category?.slug ? decodeCategorySlug(category.slug) : null;
  const fromParam = slug ? decodeCategorySlug(slug) : null;
  return fromCategory || fromParam || slug;
}

export function getCategorySlugFromServiceSlug(serviceSlug) {
  return SERVICE_SLUG_TO_CATEGORY_SLUG[serviceSlug] || null;
}

export function parsePageParam(page) {
  const parsed = parseInt(page, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

/** Query string without redundant `page=1` (empty string if no params remain). */
export function stripRedundantPaginationSearch(search = "") {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search
  );
  const page = parsePageParam(params.get("page"));
  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/** Canonical path for /kategoriya/{slug} (and pagination). */
export function getKategoriyaCanonicalPath(slug, page = 1) {
  if (page > 1) {
    return `/kategoriya/${slug}?page=${page}`;
  }
  return `/kategoriya/${slug}`;
}

/** Canonical for /blog alias → always points at /kategoriya/statii. */
export function getBlogAliasCanonicalPath(page = 1) {
  return getKategoriyaCanonicalPath(BLOG_ALIAS_CANONICAL_SLUG, page);
}

export function getPaginationAlternates(slug, currentPage, totalPages) {
  const alternates = {};
  if (currentPage > 1) {
    alternates.prev = getKategoriyaCanonicalPath(slug, currentPage - 1);
  }
  if (currentPage < totalPages) {
    alternates.next = getKategoriyaCanonicalPath(slug, currentPage + 1);
  }
  return alternates;
}
