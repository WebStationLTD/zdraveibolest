import Link from "next/link";
import Image from "next/image";

/**
 * Display list of clinical trial posts
 */
export default function ClinicalTrialsList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Няма намерени резултати
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Опитайте с други филтри или търсене, за да намерите подходящо клинично проучване
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" role="list" aria-label="Списък с клинични проучвания">
      {posts.map((post) => {
        const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/hero-woman-bg.png";
        const tags = post._embedded?.["wp:term"]?.[1] || [];
        const categories = post._embedded?.["wp:term"]?.[0] || [];

        // Extract text from HTML content for excerpt
        const rawContent = post.excerpt?.rendered || post.content?.rendered || "";
        const excerpt = rawContent
          .replace(/<[^>]+>/g, "")
          .replace(/\[&hellip;\]/g, "")
          .replace(/&hellip;/g, "")
          .replace(/&#8230;/g, "")
          .replace(/\[…\]/g, "")
          .trim()
          .substring(0, 180) + "...";

        // Format date
        const postDate = new Date(post.date).toLocaleDateString('bg-BG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        return (
          <article
            key={post.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-[#04737d]/20"
            role="listitem"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-0">
              {/* Image */}
              <Link 
                href={`/blog/${post.slug}`} 
                className="relative h-[200px] md:h-[250px] block"
                aria-label={`Виж статия: ${post.title.rendered}`}
              >
                <Image
                  src={featuredImage}
                  alt={post.title.rendered.replace(/<[^>]+>/g, '')}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* Content */}
              <div className="sm:col-span-2 md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                {/* Tags & Category */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {tags.length > 0 && tags.slice(0, 3).map(tag => (
                    <span
                      key={tag.id}
                      className="text-xs font-semibold text-white bg-[#04737d] px-3 py-1 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                  {categories.length > 0 && (
                    <span className="text-xs font-medium text-[#fd9300] bg-[#fd9300]/10 px-3 py-1 rounded-full uppercase">
                      {categories[0].name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`}>
                  <h3 
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#04737d] transition-colors line-clamp-2 leading-tight"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </Link>

                {/* Date */}
                <p className="text-sm text-gray-500 mb-3">
                  {postDate}
                </p>

                {/* Excerpt */}
                <p className="text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#04737d] font-semibold hover:gap-3 transition-all group/link"
                >
                  <span>Прочети статията</span>
                  <svg
                    className="w-5 h-5 group-hover/link:translate-x-1 transition-transform"
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
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

