import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPostsByCategory, getCategories } from "../../../services/categories";
import Script from "next/script";

// Force dynamic rendering to avoid build timeout
export const dynamic = 'force-dynamic';

// Динамични метаданни
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Категория не е намерена",
    };
  }

  return {
    title: `${category.name} - Терапевтична област | zdraveibolest.bg`,
    description: category.description || `Статии в категория ${category.name}. Научете повече за клиничните проучвания в тази терапевтична област.`,
  };
}

// Мапинг на slugs към иконки (същите като преди)
const areaIcons = {
  pulmologia: "/пулмология-icon.svg",
  revmatologia: "/ревматология-icon.svg",
  kardiologia: "/кардиология-icon.svg",
  nevrologia: "/неврология-icon.svg",
  nefrologia: "/нефрология-icon.svg",
  gastroenterologia: "/гастроентерология-icon.svg",
  endokrinologia: "/ендокринология-icon.svg",
  onkologia: "/онкология-icon.svg",
  alergologia: "/алергология-icon.svg",
  dermatologia: "/дерматология-icon.svg",
  "ranni-fazi": "/ранни-фази-icon.svg",
  hematologia: "/хематология-icon.svg",
  "akusher-ginekologia": "/акушер-гинекология-icon.svg",
};

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);

  // Schema.org структурирани данни
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description || `Статии в категория ${category.name}`,
    url: `https://zdraveibolest.bg/kategoriya/${slug}`,
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
      <Script
        id="category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-[#04737d] px-6 py-12 text-center shadow-2xl sm:px-12 rounded-b-2xl md:rounded-b-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              {category.name}
            </h1>
            {category.description && (
              <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-white/90">
                {category.description}
              </p>
            )}
            {!category.description && (
              <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-white/90">
                Разгледайте статиите в тази терапевтична област
              </p>
            )}

            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="url(#category-gradient)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="category-gradient">
                  <stop stopColor="#04737d" />
                  <stop offset={1} stopColor="#035057" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Articles Section - Шахматен ефект */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-white">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              В момента няма статии в тази категория.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 mt-6 text-[#04737d] font-medium hover:gap-3 transition-all"
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Към началната страница
            </Link>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post, index) => {
              // Шахматен ефект - редуване на ляво/дясно
              const imageOnLeft = index % 2 === 0;

              // Извличане на featured image
              const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url 
                || areaIcons[slug] 
                || "/hero-woman-bg.png";

              // Extract excerpt - ALWAYS use full content, not the short excerpt
              const rawText = post.content?.rendered || post.excerpt?.rendered || "";
              
              const textContent = rawText
                .replace(/<[^>]+>/g, "") // Remove HTML tags
                .replace(/\[&hellip;\]/g, "") // Remove [&hellip;]
                .replace(/&hellip;/g, "") // Remove &hellip;
                .replace(/\[…\]/g, "") // Remove […]
                .replace(/&#8230;/g, "") // Remove &#8230;
                .trim();
              
              // Show longer excerpt - one full paragraph (500 characters)
              const excerpt = textContent
                ? textContent.substring(0, 500) + "..."
                : "Прочетете цялата статия за повече информация.";

              return (
                <div
                  key={post.id}
                  className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]"
                >
                  {/* Image Column - 50% */}
                  <div className={`${imageOnLeft ? "lg:order-1" : "lg:order-2"} relative`}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block group h-full"
                    >
                      <div className="relative w-full h-full min-h-[300px] lg:min-h-full">
                        {/* Featured Image или Gradient с иконка */}
                        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                          <img
                            src={featuredImage}
                            alt={post.title.rendered}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#04737d] to-[#035057] flex items-center justify-center">
                            <img
                              src={areaIcons[slug] || "/пулмология-icon.svg"}
                              alt={category.name}
                              className="w-32 h-32 md:w-40 md:h-40 object-contain opacity-30"
                            />
                          </div>
                        )}
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      </div>
                    </Link>
                  </div>

                  {/* Content Column - 50% */}
                  <div
                    className={`${imageOnLeft ? "lg:order-2" : "lg:order-1"} flex items-center px-6 py-12 md:px-12 lg:px-16 xl:px-20`}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block w-full"
                    >
                      {/* Category Label */}
                      <p className="text-xs md:text-sm font-medium tracking-wider text-[#fd9300] mb-3 uppercase">
                        {category.name}
                      </p>

                      {/* Post Title */}
                      <h2 
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#04737d] transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />

                      {/* Excerpt */}
                      <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                        {excerpt}
                      </p>

                      {/* CTA Link */}
                      <span className="inline-flex items-center gap-2 text-[#04737d] font-medium hover:gap-3 transition-all duration-200">
                        Прочети статията
                        <svg
                          className="w-5 h-5"
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
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}


