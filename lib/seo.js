/** Robots metadata for pages that should not be indexed. */
export const NOINDEX_ROBOTS = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

/** Canonical path + matching Open Graph URL for indexable pages. */
export function pageUrls(path) {
  return {
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: path,
    },
  };
}

/** Merge canonical/OG URL into an existing metadata object. */
export function withPageUrls(path, metadata = {}) {
  const urls = pageUrls(path);
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      ...urls.alternates,
    },
    openGraph: {
      ...metadata.openGraph,
      ...urls.openGraph,
    },
  };
}
