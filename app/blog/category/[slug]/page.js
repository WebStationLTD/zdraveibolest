import { redirect } from "next/navigation";
import {
  getKategoriyaCanonicalPath,
  parsePageParam,
} from "../../../../lib/category-routing";
import { legacyCategorySlug } from "../../../../lib/legacy-slug-redirects";

export const dynamic = "force-dynamic";

/** Legacy URL — permanent redirect handled in middleware; fallback if middleware is bypassed. */
export default async function LegacyBlogCategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const page = parsePageParam((await searchParams)?.page);
  redirect(getKategoriyaCanonicalPath(legacyCategorySlug(decoded) || decoded, page));
}
