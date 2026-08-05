import { getSiteUrl } from "./site";
import { isPaywallEnabled } from "./paywall";

export const SITE_NAME = "Здраве и Болест";

export const HOME_TITLE =
  "Здраве и Болест – информация за заболявания на разбираем език";

export const HOME_DESCRIPTION =
  "Научете повече за заболяванията, клиничните проучвания и иновативни лечения. Медицинска информация, на която може да се доверите.";

export function getSchemaIds(siteUrl = getSiteUrl()) {
  return {
    organization: `${siteUrl}/#organization`,
    website: `${siteUrl}/#website`,
    homeWebpage: `${siteUrl}/#webpage`,
  };
}

export function getOrganizationSchema() {
  const siteUrl = getSiteUrl();
  const ids = getSchemaIds(siteUrl);
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: SITE_NAME,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/zdraveibolest-logo.png`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress:
        'ул. „Синанишко езеро" № 9, офис 1, ет. партер, кв. Манастирски ливади',
      addressLocality: "София",
      postalCode: "1680",
      addressCountry: "BG",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+359885900109",
        email: "info@zdraveibolest.bg",
        contactType: "customer service",
        areaServed: "BG",
        availableLanguage: ["bg", "Bulgarian"],
      },
      {
        "@type": "ContactPoint",
        email: "office@zdraveibolest.bg",
        contactType: "customer support",
        areaServed: "BG",
        availableLanguage: ["bg", "Bulgarian"],
      },
    ],
  };
}

export function getWebSiteSchema() {
  const siteUrl = getSiteUrl();
  const ids = getSchemaIds(siteUrl);
  return {
    "@type": "WebSite",
    "@id": ids.website,
    name: SITE_NAME,
    url: siteUrl,
    inLanguage: "bg-BG",
    publisher: {
      "@id": ids.organization,
    },
  };
}

export function getHomeWebPageSchema() {
  const siteUrl = getSiteUrl();
  const ids = getSchemaIds(siteUrl);
  return {
    "@type": "WebPage",
    "@id": ids.homeWebpage,
    url: siteUrl,
    name: HOME_TITLE,
    description: HOME_DESCRIPTION,
    inLanguage: "bg-BG",
    isPartOf: {
      "@id": ids.website,
    },
    about: {
      "@id": ids.organization,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}/hero-woman-bg.png`,
    },
  };
}

export function getGlobalStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [getOrganizationSchema(), getWebSiteSchema()],
  };
}

export function getHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getWebSiteSchema(),
      getHomeWebPageSchema(),
    ],
  };
}

export function buildFaqPageSchema(faqItems) {
  const siteUrl = getSiteUrl();
  const ids = getSchemaIds(siteUrl);
  const pageUrl = `${siteUrl}/chesto-zadavani-vaprosi`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Често задавани въпроси за клиничните изпитвания – Здраве и Болест",
        description:
          "Отговори на най-важните въпроси за участието в клинични проучвания, безопасност и възнаграждение.",
        inLanguage: "bg-BG",
        isPartOf: {
          "@id": ids.website,
        },
        about: {
          "@id": ids.organization,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        inLanguage: "bg-BG",
        isPartOf: {
          "@id": ids.website,
        },
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
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

export function buildBlogArticleSchema({ post, slug, isPublicPost = true }) {
  const paywallEnabled = isPaywallEnabled();
  const accessibleForFree = !paywallEnabled || isPublicPost;

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
    isAccessibleForFree: accessibleForFree,
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

  if (paywallEnabled && !isPublicPost) {
    schema.hasPart = {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".paywall",
    };
  }

  return schema;
}
