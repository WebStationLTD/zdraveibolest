import { NextResponse } from "next/server";
import { getCategorySlugFromServiceSlug } from "./lib/category-routing";

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
      return NextResponse.redirect(
        new URL(`/kategoriya/${categorySlug}${search}`, request.url),
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
      return NextResponse.redirect(
        new URL(`/kategoriya/${categorySlug}${search}`, request.url),
        301
      );
    }
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  const legacyBlogCategoryMatch = pathname.match(/^\/blog\/category\/(.+?)\/?$/);
  if (legacyBlogCategoryMatch) {
    const categorySlug = decodeURIComponent(legacyBlogCategoryMatch[1]);
    return NextResponse.redirect(
      new URL(`/kategoriya/${categorySlug}${search}`, request.url),
      301
    );
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
  ],
};
