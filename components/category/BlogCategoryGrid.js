import Link from "next/link";
import Image from "next/image";
import { getPostCardExcerpt } from "../../lib/excerpt";
import { getKategoriyaCanonicalPath } from "../../lib/category-routing";

export default function BlogCategoryGrid({
  category,
  posts,
  slug,
  currentPage,
  totalPages,
}) {
  return (
    <>
      {currentPage > 1 && (
        <link
          rel="prev"
          href={getKategoriyaCanonicalPath(slug, currentPage - 1)}
        />
      )}
      {currentPage < totalPages && (
        <link
          rel="next"
          href={getKategoriyaCanonicalPath(slug, currentPage + 1)}
        />
      )}

      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {category.name}
              </h1>
              {category.description ? (
                <p className="mt-4 text-lg text-white/90">{category.description}</p>
              ) : (
                <p className="mt-4 text-lg text-white/90">
                  Разгледайте всички {category.name.toLowerCase()} от нашата
                  здравна информация
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
                fill="url(#blog-category-grid-gradient)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="blog-category-grid-gradient">
                  <stop stopColor="#129160" />
                  <stop offset={1} stopColor="#129160" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} prefetch={true}>
                    <article className="flex flex-col items-start justify-between">
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
                      <div className="max-w-xl">
                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                          <time dateTime={post.date} className="text-gray-500">
                            {new Date(post.date).toLocaleDateString("bg-BG")}
                          </time>
                          <span className="relative z-10 rounded-full bg-[#04737d] px-3 py-1.5 font-medium text-white">
                            {category.name}
                          </span>
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            {post.title.rendered}
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                            {getPostCardExcerpt(post)}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-10 flex justify-center items-center gap-4"
                  aria-label="Странициране"
                >
                  {currentPage > 1 && (
                    <Link
                      href={getKategoriyaCanonicalPath(slug, currentPage - 1)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                      prefetch={true}
                      rel="prev"
                    >
                      Предишна
                    </Link>
                  )}
                  <span className="px-4 py-2 text-gray-700">
                    Страница {currentPage} от {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={getKategoriyaCanonicalPath(slug, currentPage + 1)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                      prefetch={true}
                      rel="next"
                    >
                      Следваща
                    </Link>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                В момента няма публикации в тази категория.
              </p>
              <Link
                href={getKategoriyaCanonicalPath(slug, 1)}
                className="inline-flex items-center gap-2 mt-6 text-[#04737d] font-medium hover:gap-3 transition-all"
              >
                <svg
                  className="w-5 h-5 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
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
