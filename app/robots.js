import { getSiteUrl } from "../lib/site";

export default function robots() {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/register", "/verify-email", "/reset-password"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
