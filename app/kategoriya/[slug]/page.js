import { notFound } from "next/navigation";
import { getCategoryBySlug, getPostsByCategory } from "../../../services/categories";
import JsonLd from "../../../components/JsonLd";
import BlogCategoryGrid from "../../../components/category/BlogCategoryGrid";
import TherapeuticCategoryLayout from "../../../components/category/TherapeuticCategoryLayout";
import { getSiteUrl } from "../../../lib/site";
import {
  getKategoriyaCanonicalPath,
  getCategoryPathSlug,
  isBlogHubCategory,
  parsePageParam,
} from "../../../lib/category-routing";

export const dynamic = "force-dynamic";

const BLOG_HUB_PER_PAGE = 9;

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Категория не е намерена" };
  }

  const currentPage = parsePageParam((await searchParams)?.page);
  const isBlogHub = isBlogHubCategory(slug, category.id);

  const title = isBlogHub
    ? `${category.name} - Здравна информация | zdraveibolest.bg`
    : `${category.name} - Терапевтична област | zdraveibolest.bg`;

  const description = isBlogHub
    ? category.description ||
      `Разгледайте всички ${category.name.toLowerCase()} в нашата здравна информация.`
    : category.description ||
      `Статии в категория ${category.name}. Научете повече за клиничните проучвания в тази терапевтична област.`;

  const pathSlug = getCategoryPathSlug(slug, category);
  const canonical = getKategoriyaCanonicalPath(pathSlug, currentPage);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: "bg_BG",
      type: "website",
    },
  };
}

export default async function KategoriyaPage({ params, searchParams }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const pathSlug = getCategoryPathSlug(slug, category);
  const isBlogHub = isBlogHubCategory(slug, category.id);
  const currentPage = parsePageParam((await searchParams)?.page);

  let posts;
  let totalPages = 1;

  if (isBlogHub) {
    const allPosts = await getPostsByCategory(category.id, 100);
    totalPages = Math.max(1, Math.ceil(allPosts.length / BLOG_HUB_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * BLOG_HUB_PER_PAGE;
    posts = allPosts.slice(startIndex, startIndex + BLOG_HUB_PER_PAGE);
  } else {
    posts = await getPostsByCategory(category.id);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description:
      category.description || `Статии в категория ${category.name}`,
    url: `${siteUrl}${getKategoriyaCanonicalPath(pathSlug, currentPage)}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: (currentPage - 1) * BLOG_HUB_PER_PAGE + index + 1,
        item: {
          "@type": "Article",
          name: post.title.rendered,
          url: `${siteUrl}/blog/${post.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <JsonLd id="category-schema" data={schemaData} />
      {isBlogHub ? (
        <BlogCategoryGrid
          category={category}
          posts={posts}
          slug={pathSlug}
          currentPage={Math.min(currentPage, totalPages)}
          totalPages={totalPages}
        />
      ) : (
        <TherapeuticCategoryLayout
          category={category}
          posts={posts}
          slug={pathSlug}
        />
      )}
    </>
  );
}
