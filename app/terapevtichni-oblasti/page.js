import Link from "next/link";
import { getServices } from "../../services/services";
import { Suspense } from "react";
import Script from "next/script";

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export const metadata = {
  title: "Терапевтични области - zdraveibolest.bg",
  description:
    "Разгледайте всички терапевтични области, в които провеждаме клинични проучвания. Намерете клиничното изпитване, което търсите.",
  openGraph: {
    title: "Терапевтични области | zdraveibolest.bg",
    description: "Разгледайте всички терапевтични области с клинични проучвания",
    images: [
      {
        url: "/hero-woman-bg.png",
        width: 1200,
        height: 630,
        alt: "zdraveibolest.bg",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
};

// Мапинг на slugs към иконки
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

export default async function TherapeuticAreas() {
  try {
    const areas = await getServices();

    if (!areas || areas.length === 0) {
      return (
        <p className="text-gray-600 text-center mt-10">
          В момента няма налични терапевтични области!
        </p>
      );
    }

    // Подготвяме структурирани данни за Schema.org
    const areasSchemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: areas.map((area, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "MedicalSpecialty",
          name: area.title.rendered,
          url: `https://zdraveibolest.bg/terapevtichni-oblasti/${area.slug}`,
          description:
            area.content.rendered.replace(/<[^>]+>/g, "").substring(0, 150) +
            "...",
        },
      })),
    };

    return (
      <>
        <Script
          id="therapeutic-areas-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(areasSchemaData),
          }}
        />
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-[#04737d] px-6 py-12 text-center shadow-2xl sm:px-12 rounded-b-2xl md:rounded-b-3xl">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                Терапевтични области
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-white/90">
                Разгледайте всички терапевтични области, в които провеждаме
                клинични проучвания.
              </p>

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

        <section className="relative py-16 md:py-20 lg:py-24 bg-white">
          <div className="space-y-0">
            {areas.map((area, index) => {
              // Determine if image should be on left or right
              const imageOnLeft = index % 2 === 0;
              
              // Get excerpt from content
              const excerpt = area.content?.rendered
                ? area.content.rendered.replace(/<[^>]+>/g, "").substring(0, 250) + "..."
                : "Разгледайте информация за клиничните проучвания в тази терапевтична област.";

              return (
                <div 
                  key={area.id}
                  className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]"
                >
                  {/* Image Column - Full Width */}
                  <div className={`${imageOnLeft ? 'lg:order-1' : 'lg:order-2'} relative`}>
                    <Link href={`/terapevtichni-oblasti/${area.slug}`} className="block group h-full">
                      <div className="relative w-full h-full">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#04737d] to-[#035057] flex items-center justify-center">
                          <img
                            src={areaIcons[area.slug] || "/пулмология-icon.svg"}
                            alt={area.title.rendered}
                            className="w-32 h-32 md:w-40 md:h-40 object-contain opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                          />
                        </div>
                        {/* Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={areaIcons[area.slug] || "/пулмология-icon.svg"}
                            alt={area.title.rendered}
                            className="w-24 h-24 md:w-32 md:h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Content Column */}
                  <div className={`${imageOnLeft ? 'lg:order-2' : 'lg:order-1'} flex items-center px-6 py-12 md:px-12 lg:px-16 xl:px-20`}>
                    <Link 
                      href={`/terapevtichni-oblasti/${area.slug}`}
                      className="group block w-full"
                    >
                      {/* Small Title */}
                      <p className="text-xs md:text-sm font-medium tracking-wider text-[#fd9300] mb-3 uppercase">
                        Терапевтична област
                      </p>

                      {/* Main Heading */}
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#04737d] transition-colors">
                        {area.title.rendered}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                        {excerpt}
                      </p>

                      {/* CTA Link */}
                      <span className="inline-flex items-center gap-2 text-[#04737d] font-medium hover:gap-3 transition-all duration-200">
                        Научи повече
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
        </section>
      </>
    );
  } catch (error) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Грешка при зареждане
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Съжаляваме, възникна проблем при зареждането на терапевтичните
              области.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

