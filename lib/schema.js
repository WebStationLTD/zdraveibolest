import { getSiteUrl } from "./site";

export const SITE_NAME = "Здраве и Болест";

export function getOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/zdraveibolest-logo.png`,
  };
}

export function getWebSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
  };
}

export function getGlobalStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [getOrganizationSchema(), getWebSiteSchema()],
  };
}

const BACKEND_HOST_PATTERN = /admin-panels\.com|example\.bg|website\.com/i;

/** True when Yoast canonical points at the public frontend, not WP backend. */
export function isFrontendCanonical(url) {
  if (!url || typeof url !== "string") return false;
  if (BACKEND_HOST_PATTERN.test(url)) return false;
  try {
    const parsed = new URL(url);
    const siteHost = new URL(getSiteUrl()).host;
    return parsed.host === siteHost;
  } catch {
    return false;
  }
}

/**
 * Blog canonical for Next.js metadata (relative path; resolved via metadataBase).
 * Duplicate slugs (e.g. …-2) must each declare their own /blog/{slug} canonical;
 * consolidating duplicates requires redirects/canonical cleanup in WordPress.
 */
export function getBlogCanonicalPath(slug, yoastCanonical) {
  if (isFrontendCanonical(yoastCanonical)) {
    try {
      const path = new URL(yoastCanonical).pathname;
      if (path.startsWith("/blog/")) return path;
    } catch {
      // fall through
    }
  }
  return `/blog/${slug}`;
}

export function stripHtml(html) {
  return (html || "").replace(/<[^>]+>/g, "").trim();
}

export function buildBlogArticleSchema({ post, slug, isPublicPost }) {
  const siteUrl = getSiteUrl();
  const meta = post.yoast_head_json || {};
  const pageUrl = `${siteUrl}/blog/${slug}`;
  const ogImage =
    meta.og_image?.[0]?.url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    undefined;

  const headline = stripHtml(post.title?.rendered || meta.title || "");
  const description =
    meta.description ||
    stripHtml(post.content?.rendered || "").substring(0, 200) ||
    undefined;

  const authorEmbed = post._embedded?.author?.[0];
  const authorName = authorEmbed?.name || meta.author;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline,
    description,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    publisher: {
      ...getOrganizationSchema(),
    },
    isAccessibleForFree: isPublicPost,
  };

  if (ogImage) {
    schema.image = ogImage;
  }

  if (authorName) {
    schema.author = {
      "@type": "Person",
      name: authorName,
    };
  }

  if (!isPublicPost) {
    schema.hasPart = {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".paywall",
    };
  }

  return schema;
}
