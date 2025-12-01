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

        <section className="relative px-5 pt-12 pb-16 md:pb-20 lg:pb-24 bg-white">
          <div className="mx-auto w-[95%] md:w-[80%]">
            <div className="space-y-4 md:space-y-5">
              {/* Първите области */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                {areas.slice(0, 10).map((area) => (
                  <Link
                    key={area.id}
                    href={`/terapevtichni-oblasti/${area.slug}`}
                    className="group relative bg-white rounded-2xl border border-[#04737d] p-6 md:p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center"
                  >
                    {/* Icon */}
                    <div className="mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                      <img
                        src={areaIcons[area.slug] || "/пулмология-icon.svg"}
                        alt={area.title.rendered}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Area Name */}
                    <h3 className="text-base md:text-lg font-normal text-gray-900 group-hover:text-[#04737d] transition-colors">
                      {area.title.rendered}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* Последните три области - Равномерно разпределени */}
              {areas.length > 10 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
                  {areas.slice(10).map((area) => (
                    <Link
                      key={area.id}
                      href={`/terapevtichni-oblasti/${area.slug}`}
                      className="group relative bg-white rounded-2xl border border-[#04737d] p-6 md:p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center"
                    >
                      {/* Icon */}
                      <div className="mb-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <img
                          src={areaIcons[area.slug] || "/пулмология-icon.svg"}
                          alt={area.title.rendered}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Area Name */}
                      <h3 className="text-base md:text-lg font-normal text-gray-900 group-hover:text-[#04737d] transition-colors">
                        {area.title.rendered}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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

