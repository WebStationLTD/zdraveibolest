import { getServiceBySlug, getServices } from "../../../services/services";
import ProtectedContent from "../../../components/ProtectedContent";
import Script from "next/script";

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const service = await getServiceBySlug(slug);

    if (!service || service.length === 0) {
      return {
        title: "Терапевтична област не е намерена",
        description: "Търсената терапевтична област не съществува.",
      };
    }

    const meta = service[0].yoast_head_json || {};
    const ogImage =
      meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "/hero-woman-bg.png";

    return {
      title: meta.title || service[0].title?.rendered || "Терапевтична област",
      description: meta.description || meta.og_description || "Клинични проучвания",
      keywords: meta.keywords || undefined,
      openGraph: {
        title: meta.og_title || meta.title || service[0].title?.rendered,
        description: meta.og_description || meta.description,
        images: ogImage
          ? [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: service[0].title?.rendered || "Терапевтична област",
              },
            ]
          : [],
        type: "article",
        locale: "bg_BG",
      },
      alternates: {
        canonical: meta.canonical || undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Терапевтична област",
      description: "Клинични проучвания",
    };
  }
}

export default async function TherapeuticAreaPage({ params }) {
  try {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service || service.length === 0) {
      throw new Error("Терапевтична област не е намерена");
    }

    // Fetch всички терапевтични области за Register форма
    let therapeuticAreas = [];
    try {
      therapeuticAreas = await getServices();
    } catch (error) {
      console.error("Error fetching therapeutic areas:", error);
    }

    const meta = service[0].yoast_head_json;
    const ogImage =
      meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

    // Подготвяме структурирани данни за Schema.org
    const areaSchemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalSpecialty",
      name: service[0].title.rendered,
      description:
        service[0].content.rendered.replace(/<[^>]+>/g, "").substring(0, 200) +
        "...",
      url: meta.canonical || `https://zdraveibolest.bg/terapevtichni-oblasti/${slug}`,
      provider: {
        "@type": "Organization",
        name: "zdraveibolest.bg",
        url: "https://zdraveibolest.bg",
      },
      image: ogImage || "https://zdraveibolest.bg/hero-woman-bg.png",
    };

    return (
      <>
        <Script
          id="therapeutic-area-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(areaSchemaData),
          }}
        />

        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-[#04737d] px-6 py-23 text-center shadow-2xl sm:px-23 rounded-b-2xl md:rounded-b-3xl">
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
                    <stop stopColor="#04737d" />
                    <stop offset={1} stopColor="#035057" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto w-[95%] md:w-[80%] px-4 sm:px-6 lg:px-8">
            <ProtectedContent 
              content={service[0].content.rendered} 
              previewHeight={120}
              therapeuticAreas={therapeuticAreas}
            />
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
              Страницата не е намерена
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Съжаляваме, но търсената терапевтична област не съществува.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

