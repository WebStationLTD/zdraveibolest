import Image from "next/image";
import Script from "next/script";
import ClinicalTrialsPageClient from "../../../components/ClinicalTrialsPageClient";
import { getTagsByCategory, getFilteredPosts } from "../../../services/tags";

export const metadata = {
  title: "Намери клинично проучване - Клинични изпитвания | zdraveibolest.bg",
  description: "Разгледайте всички налични клинични проучвания и изпитвания. Филтрирайте по терапевтична област и намерете подходящо изследване за вас.",
  keywords: "клинични проучвания, клинични изпитвания, медицински изследвания, здраве, терапевтични области, България",
  openGraph: {
    title: "Намери клинично проучване - zdraveibolest.bg",
    description: "Разгледайте всички налични клинични проучвания и изпитвания",
    type: "website",
    locale: "bg_BG",
  },
};

export const dynamic = 'force-dynamic';

export default async function FindClinicalTrialsPage() {
  const CATEGORY_SLUG = "клинични-проучвания";

  let initialTags = [];
  let initialPosts = [];

  try {
    [initialTags, initialPosts] = await Promise.all([
      getTagsByCategory(CATEGORY_SLUG),
      getFilteredPosts(CATEGORY_SLUG, [], "", 100),
    ]);
  } catch (error) {
    console.error("Error loading initial data:", error);
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Намери клинично проучване",
    "description": "Разгледайте всички налични клинични проучвания и изпитвания",
    "url": "https://zdraveibolest.bg/klinichni-prouchvaniya/nameri-klinichno-prouchvane",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": initialPosts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
          "name": post.title?.rendered || "",
          "url": `https://zdraveibolest.bg/blog/${post.slug}`,
        }
      }))
    }
  };

  return (
    <>
      <Script
        id="clinical-trials-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#04737d] via-[#238C96] to-[#5FA8B3] overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated gradient blobs */}
          <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-[#5FA8B3]/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#A8D5DD]/20 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 left-1/3 w-[700px] h-[700px] bg-gradient-to-tr from-[#04737d]/30 to-transparent rounded-full blur-3xl"></div>
          
          {/* Geometric patterns */}
          <div className="absolute top-20 right-40 w-40 h-40 border-2 border-white/10 rounded-full"></div>
          <div className="absolute bottom-40 left-60 w-60 h-60 border-2 border-white/5 rounded-full"></div>
          <div className="absolute top-1/2 right-20 w-3 h-3 bg-white/20 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-white/15 rounded-full"></div>
        </div>

        <div className="relative py-16 md:py-24 px-6 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-white/90 mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-0.5 bg-white/70"></span>
                РЕСУРСИ И СТАТИИ
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Здравна информация
              </h1>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl">
                Вземайте информирани решения за вашето здраве с нашите здравно-образователни статии, ръководства и ресурси.
              </p>
            </div>
          </div>
        </div>

        {/* Wave bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M0,0 C200,80 400,80 600,40 C800,0 1000,0 1200,40 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Client Component for filtering and search */}
      <ClinicalTrialsPageClient
        initialTags={initialTags}
        initialPosts={initialPosts}
        categorySlug={CATEGORY_SLUG}
      />
    </div>
    </>
  );
}
