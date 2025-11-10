import { getServiceBySlug } from "../../../services/services";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

// Динамично зареждане на компоненти за по-добро разделяне на кода
const ServiceContent = dynamic(
  () => import("../../../components/ServiceContent"),
  {
    ssr: true,
    loading: () => (
      <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
    ),
  }
);

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service || service.length === 0) {
    throw new Error("Service not found");
  }

  const meta = service[0].yoast_head_json;
  const ogImage =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords || [
      "услуги",
      "професионални услуги",
      slug.replace(/-/g, " "),
    ],
    openGraph: {
      title: meta.og_title,
      description: meta.og_description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: meta.title,
            },
          ]
        : [],
      type: "article",
    },
    alternates: {
      canonical: meta.canonical,
    },
  };
}

export default async function ServicePage({ params }) {
  try {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service || service.length === 0) {
      throw new Error("Service not found");
    }

    const meta = service[0].yoast_head_json;
    const ogImage =
      meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

    // Подготвяме структурирани данни за Schema.org
    const serviceSchemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service[0].title.rendered,
      description:
        service[0].content.rendered.replace(/<[^>]+>/g, "").substring(0, 200) +
        "...",
      url: meta.canonical || `https://example.bg/services/${slug}`,
      provider: {
        "@type": "Organization",
        name: "NextLevel Services",
        url: "https://example.bg",
        logo: "https://example.bg/logo.png",
      },
      image: ogImage || "https://example.bg/placeholder.webp",
      offers: {
        "@type": "Offer",
        price: "Свържете се с нас за цена",
        priceCurrency: "BGN",
      },
    };

    return (
      <>
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchemaData),
          }}
        />

        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                {service[0].title.rendered}
              </h1>
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
        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto w-full">
            <Suspense
              fallback={
                <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
              }
            >
              <ServiceContent content={service[0].content.rendered} />
            </Suspense>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}
