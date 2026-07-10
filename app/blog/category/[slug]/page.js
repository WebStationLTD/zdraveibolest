import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Legacy URL — permanent redirect handled in middleware; fallback if middleware is bypassed. */
export default async function LegacyBlogCategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const page = (await searchParams)?.page;
  const destination = page
    ? `/kategoriya/${slug}?page=${page}`
    : `/kategoriya/${slug}`;
  redirect(destination);
}
