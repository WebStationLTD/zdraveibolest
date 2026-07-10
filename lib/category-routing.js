/** WP category slugs that use the blog grid layout (not chessboard). */
export const BLOG_HUB_SLUGS = ["статии", "подкасти"];

/** Reliable WP category IDs for blog hub layout. */
export const BLOG_HUB_CATEGORY_IDS = [19, 20];

export const BLOG_ALIAS_CANONICAL_SLUG = "статии";

/** Services CPT (Latin) → WP category slug (Cyrillic). */
export const SERVICE_SLUG_TO_CATEGORY_SLUG = {
  pulmologia: "пулмология",
  revmatologia: "ревматология",
  kardiologia: "кардиология",
  nevrologia: "неврология",
  nefrologia: "нефрология",
  gastroenterologia: "гастроентерология",
  endokrinologia: "ендокринология",
  onkologia: "онкология",
  alergologia: "алергология",
  dermatologia: "дерматология",
  hematologia: "хематология",
  "akusher-ginekologia": "акушер-гинекология",
};

/** Icons keyed by WP category slug (Cyrillic). */
export const CATEGORY_ICONS = {
  пулмология: "/pulmonology-icon.svg",
  ревматология: "/rheumatology-icon.svg",
  кардиология: "/cardiology-icon.svg",
  неврология: "/neurology-icon.svg",
  нефрология: "/nephrology-icon.svg",
  гастроентерология: "/gastroenterology-icon.svg",
  ендокринология: "/endocrinology-icon.svg",
  онкология: "/oncology-icon.svg",
  алергология: "/allergology-icon.svg",
  дерматология: "/dermatology-icon.svg",
  хематология: "/hematology-icon.svg",
  "акушер-гинекология": "/obstetrics-gynecology-icon.svg",
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

/** Public path segment for /kategoriya/{slug} (always decoded Cyrillic). */
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

/** Canonical path for /kategoriya/{slug} (and pagination). */
export function getKategoriyaCanonicalPath(slug, page = 1) {
  if (page > 1) {
    return `/kategoriya/${slug}?page=${page}`;
  }
  return `/kategoriya/${slug}`;
}

/** Canonical for /blog alias → always points at /kategoriya/статии. */
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
