import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPostsByCategory } from "../../../../services/categories";
import Script from "next/script";

// Force dynamic rendering to avoid build timeout
export const dynamic = 'force-dynamic';

/**
 * Generate dynamic metadata for category pages
 * @param {Object} params - Route parameters
 * @returns {Promise<Object>} - Metadata object
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Категория не е намерена",
    };
  }

  return {
    title: `${category.name} - Здравна информация | zdraveibolest.bg`,
    description: category.description || `Разгледайте всички ${category.name.toLowerCase()} в нашата здравна информация. Научете повече за клиничните проучвания и здравната информация.`,
  };
}

/**
 * Category page component - displays posts filtered by category
 * @param {Object} params - Route parameters containing category slug
 * @returns {Promise<JSX.Element>} - Category page with filtered posts
 */
export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const page = (await searchParams)?.page;
  const currentPage = parseInt(page) || 1;
  const perPage = 9;
  
  // Fetch category by slug
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Fetch posts by category ID with pagination
  const allPosts = await getPostsByCategory(category.id, 100);
  
  // Calculate pagination
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const posts = allPosts.slice(startIndex, endIndex);

  // Schema.org structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description || `Всички ${category.name.toLowerCase()} от Здравна информация`,
    url: `https://zdraveibolest.bg/blog/category/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          name: post.title.rendered,
          url: `https://zdraveibolest.bg/blog/${post.slug}`,
        },
      })),
    },
  };

  return (
    <>
      {/* Schema.org structured data */}
      <Script
        id="category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* Hero Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {category.name}
              </h1>
              {category.description && (
                <p className="mt-4 text-lg text-white/90">
                  {category.description}
                </p>
              )}
              {!category.description && (
                <p className="mt-4 text-lg text-white/90">
                  Разгледайте всички {category.name.toLowerCase()} от нашата здравна информация
                </p>
              )}
            </div>
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#129160" />
                  <stop offset={1} stopColor="#129160" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Posts Grid Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} prefetch={true}>
                    <article className="flex flex-col items-start justify-between">
                      {/* Featured Image */}
                      <div className="relative w-full">
                        <Image
                          width={380}
                          height={250}
                          alt={post.title.rendered || ""}
                          src={
                            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                            post.yoast_head_json?.og_image?.[0]?.url ||
                            "/placeholder.webp"
                          }
                          className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                      </div>
                      
                      {/* Post Content */}
                      <div className="max-w-xl">
                        {/* Date and Category */}
                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                          <time dateTime={post.date} className="text-gray-500">
                            {new Date(post.date).toLocaleDateString('bg-BG')}
                          </time>
                          <span className="relative z-10 rounded-full bg-[#04737d] px-3 py-1.5 font-medium text-white">
                            {category.name}
                          </span>
                        </div>
                        
                        {/* Title and Excerpt */}
                        <div className="group relative">
                          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            {post.title.rendered}
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                            {post.excerpt?.rendered
                              ? post.excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150) + "..."
                              : post.content?.rendered
                                ? post.content.rendered.replace(/<[^>]+>/g, "").substring(0, 150) + "..."
                                : "Прочетете цялата статия за повече информация."}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center gap-4">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog/category/${slug}?page=${currentPage - 1}`}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                      prefetch={true}
                    >
                      Предишна
                    </Link>
                  )}
                  <span className="px-4 py-2 text-gray-700">
                    Страница {currentPage} от {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog/category/${slug}?page=${currentPage + 1}`}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                      prefetch={true}
                    >
                      Следваща
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                В момента няма публикации в тази категория.
              </p>
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 mt-6 text-[#04737d] font-medium hover:gap-3 transition-all"
              >
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Към всички статии
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
