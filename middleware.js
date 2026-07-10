import { NextResponse } from "next/server";
import {
  BLOG_ALIAS_CANONICAL_SLUG,
  getCategorySlugFromServiceSlug,
  getKategoriyaCanonicalPath,
  parsePageParam,
  stripRedundantPaginationSearch,
} from "./lib/category-routing";

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
    const categorySlug = decodeURIComponent(legacyBlogCategoryMatch[1]);
    const cleanSearch = stripRedundantPaginationSearch(search);
    return NextResponse.redirect(
      new URL(`/kategoriya/${categorySlug}${cleanSearch}`, request.url),
      301
    );
  }

  // /blog?page=N → canonical /kategoriya/статии (page=1 without query)
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
    const cleanSearch = stripRedundantPaginationSearch(search);
    if (cleanSearch !== search) {
      return NextResponse.redirect(
        new URL(`${pathname}${cleanSearch}`, request.url),
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
    "/kategoriya/:slug*",
  ],
};
