import Link from "next/link";
import { getLatestPosts } from "../services/posts";

export default async function LatestBlogPosts() {
  let posts = [];

  try {
    posts = await getLatestPosts();
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return null;
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  // Helper function to get featured image
  const getFeaturedImage = (post) => {
    const media = post?._embedded?.["wp:featuredmedia"]?.[0];

    if (media?.source_url) {
      return media.source_url;
    }

    if (media?.media_details?.sizes?.large?.source_url) {
      return media.media_details.sizes.large.source_url;
    }

    if (media?.media_details?.sizes?.medium_large?.source_url) {
      return media.media_details.sizes.medium_large.source_url;
    }

    return "/placeholder.webp";
  };

  // Helper function to get category name - dynamically from WordPress
  const getCategoryName = (post) => {
    // Get the first category from WordPress taxonomy
    if (post?._embedded?.["wp:term"]?.[0]?.[0]?.name) {
      return post._embedded["wp:term"][0][0].name;
    }
    // Fallback - check categories array
    if (post?.categories?.length > 0 && post?._embedded?.["wp:term"]?.[0]) {
      const category = post._embedded["wp:term"][0].find(
        (term) => term.id === post.categories[0]
      );
      return category?.name || "";
    }
    return "";
  };

  return (
    <section className="relative px-5 pt-5 pb-16 md:pb-20 lg:pb-24 bg-[#fafafa]">
      <div className="mx-auto w-[95%] md:w-[80%]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Small Title */}
          <p className="text-xs md:text-sm font-normal tracking-[0.2em] text-[#04737d] mb-4 uppercase">
            АКТУАЛНИ СТАТИИ
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Здравна информация
          </h2>

          {/* Decorative Line */}
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-[#04737d] rounded-full"></div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 md:gap-8 mb-12 lg:h-[600px]">
          {/* Large Featured Post - Left - 70% width (7 columns) */}
          {posts[0] && (
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group relative lg:col-span-7 h-[400px] md:h-[500px] lg:h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image */}
              <img
                src={getFeaturedImage(posts[0])}
                alt={posts[0].title?.rendered || ""}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Category Badge - Top Left */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#04737d]/40 backdrop-blur-md px-4 py-2 rounded-xl">
                <img src="/News-tag-icon.svg" alt="" className="w-4 h-4" />
                <span className="text-white text-sm font-normal">
                  {getCategoryName(posts[0])}
                </span>
              </div>

              {/* Title - Bottom Left */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#04737d]/40 backdrop-blur-md px-6 py-4 rounded-xl inline-block max-w-[90%]">
                  <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2">
                    {posts[0].title?.rendered || ""}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {/* Smaller Posts Grid - Right - 30% width (3 columns) */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-6 md:gap-8 lg:grid-rows-2">
            {posts.slice(1, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative h-[250px] md:h-[280px] lg:h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <img
                  src={getFeaturedImage(post)}
                  alt={post.title?.rendered || ""}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Category Badge - Top Left */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#04737d]/40 backdrop-blur-md px-3 py-1.5 rounded-xl">
                  <img
                    src="/News-tag-icon.svg"
                    alt=""
                    className="w-3.5 h-3.5"
                  />
                  <span className="text-white text-xs font-normal">
                    {getCategoryName(post)}
                  </span>
                </div>

                {/* Title - Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-[#04737d]/40 backdrop-blur-md px-4 py-3 rounded-xl inline-block max-w-[90%]">
                    <h3 className="text-base md:text-lg font-bold text-white line-clamp-2">
                      {post.title?.rendered || ""}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block px-8 py-3.5 bg-[#fd9300] hover:bg-[#e48400] text-white text-base font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Вижте всички
          </Link>
        </div>
      </div>
    </section>
  );
}
