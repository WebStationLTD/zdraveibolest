import { getPostBySlug } from "../../../services/posts";
import { getCategories } from "../../../services/categories";
import BlogPostContent from "../../../components/BlogPostContent";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.length === 0) {
    return {
      title: "Статия не е намерена",
    };
  }

  const meta = post[0].yoast_head_json;
  const ogImage =
    meta?.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

  return {
    title: meta?.title || post[0].title.rendered,
    description: meta?.description || "",
  };
}

export default async function PostPage({ params }) {
  try {
    const { slug } = await params;
    const [post, categories] = await Promise.all([
      getPostBySlug(slug),
      getCategories()
    ]);

    if (!post || post.length === 0) {
      throw new Error("Post not found");
    }

    const meta = post[0].yoast_head_json;
    const ogImage =
      meta?.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

    // Форматираме категориите за RegisterForm
    const therapeuticAreas = categories.map(cat => ({
      id: cat.id,
      title: { rendered: cat.name },
      slug: cat.slug,
    }));

    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-[#04737d] px-6 py-16 md:py-20 text-center shadow-2xl sm:px-12 rounded-b-2xl md:rounded-b-3xl">
              <div className="mx-auto max-w-3xl text-center">
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                  dangerouslySetInnerHTML={{ __html: post[0].title.rendered }}
                />
                <div className="mt-6 flex items-center justify-center gap-4 text-white/80">
                  <time dateTime={new Date(post[0].date).toISOString()}>
                    {new Date(post[0].date).toLocaleDateString('bg-BG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
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
                  fill="url(#blog-post-gradient)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="blog-post-gradient">
                    <stop stopColor="#04737d" />
                    <stop offset={1} stopColor="#035057" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <article className="mx-auto w-full">
              {ogImage && (
                <img
                  src={ogImage}
                  alt={meta?.og_title || post[0].title.rendered}
                  className="w-full h-auto mb-10 rounded-2xl shadow-lg"
                />
              )}
              {/* Protected Content - Client Component */}
              <BlogPostContent 
                content={post[0].content.rendered}
                therapeuticAreas={therapeuticAreas}
              />
            </article>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Статия не е намерена
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Съжаляваме, статията която търсите не съществува.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
