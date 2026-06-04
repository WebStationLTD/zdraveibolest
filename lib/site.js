/** Production site URL — override locally via NEXT_PUBLIC_SITE_URL if needed */
export const DEFAULT_SITE_URL = "https://zdraveibolest.bg";

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}
