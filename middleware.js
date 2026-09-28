import { NextResponse } from "next/server";
import {
  BLOG_ALIAS_CANONICAL_SLUG,
  getCategorySlugFromServiceSlug,
  getKategoriyaCanonicalPath,
  parsePageParam,
  stripRedundantPaginationSearch,
} from "./lib/category-routing";
import {
  legacyCategorySlug,
  legacyPostSlug,
} from "./lib/legacy-slug-redirects";

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/services" || pathname === "/terapevtichni-oblasti") {
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  const legacyServiceMatch = pathname.match(/^\/services\/([^/]+)\/?$/);
  if (legacyServiceMatch) {
    const categorySlug = getCategorySlugFromServiceSlug(
      decodeURIComponent(legacyServiceMatch[1])
    );
    if (categorySlug) {
      const cleanSearch = stripRedundantPaginationSearch(search);
      return NextResponse.redirect(
        new URL(`/kategoriya/${categorySlug}${cleanSearch}`, request.url),
        301
      );
    }
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  const legacyAreaMatch = pathname.match(/^\/terapevtichni-oblasti\/([^/]+)\/?$/);
  if (legacyAreaMatch) {
    const categorySlug = getCategorySlugFromServiceSlug(
      decodeURIComponent(legacyAreaMatch[1])
    );
    if (categorySlug) {
      const cleanSearch = stripRedundantPaginationSearch(search);
      return NextResponse.redirect(
        new URL(`/kategoriya/${categorySlug}${cleanSearch}`, request.url),
        301
      );
    }
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  const legacyBlogCategoryMatch = pathname.match(/^\/blog\/category\/(.+?)\/?$/);
  if (legacyBlogCategoryMatch) {
    const rawSlug = decodeURIComponent(legacyBlogCategoryMatch[1]);
    const categorySlug = legacyCategorySlug(rawSlug) || rawSlug;
    const cleanSearch = stripRedundantPaginationSearch(search);
    return NextResponse.redirect(
      new URL(`/kategoriya/${categorySlug}${cleanSearch}`, request.url),
      301
    );
  }

  const blogPostMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogPostMatch) {
    const nextSlug = legacyPostSlug(decodeURIComponent(blogPostMatch[1]));
    if (nextSlug) {
      const cleanSearch = stripRedundantPaginationSearch(search);
      return NextResponse.redirect(
        new URL(`/blog/${nextSlug}${cleanSearch}`, request.url),
        301
      );
    }
  }

  // /blog?page=N → canonical /kategoriya/statii (page=1 without query)
  if (pathname === "/blog" && search) {
    const params = new URLSearchParams(search);
    if (params.has("page")) {
      const page = parsePageParam(params.get("page"));
      const target = getKategoriyaCanonicalPath(BLOG_ALIAS_CANONICAL_SLUG, page);
      return NextResponse.redirect(new URL(target, request.url), 301);
    }
  }

  // /kategoriya/{slug}?page=1 → /kategoriya/{slug}
  const kategoriyaMatch = pathname.match(/^\/kategoriya\/([^/]+)\/?$/);
  if (kategoriyaMatch) {
    const rawSlug = decodeURIComponent(kategoriyaMatch[1]);
    const nextSlug = legacyCategorySlug(rawSlug) || rawSlug;
    const cleanSearch = stripRedundantPaginationSearch(search);
    if (nextSlug !== rawSlug || cleanSearch !== search) {
      return NextResponse.redirect(
        new URL(`/kategoriya/${nextSlug}${cleanSearch}`, request.url),
        301
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/services",
    "/services/:slug*",
    "/terapevtichni-oblasti",
    "/terapevtichni-oblasti/:slug*",
    "/blog/category/:slug*",
    "/blog",
    "/blog/:slug*",
    "/kategoriya/:slug*",
  ],
};
