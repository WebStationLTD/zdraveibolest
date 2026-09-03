import { pageUrls } from "../lib/seo";
import HeroSection from "../components/hero";
import Stats from "../components/stats";
import TherapeuticAreas from "../components/therapeutic-areas";
import VideoSection from "../components/video-section";
import ClinicalTrialsIntro from "../components/clinical-trials-intro";
import LatestBlogPosts from "../components/latest-blog-posts";
// import AboutUs from "../components/about-us"; // Removed as per request
// import OurMission from "../components/our-mission"; // Moved off homepage — live at /nashata-misiya
import CTASection from "../components/cta-section";
import StickyQuickRegisterWrapper from "../components/StickyQuickRegisterWrapper";
import { WebVitals } from "./web-vitals";
import JsonLd from "../components/JsonLd";
import { getHomeWebPageSchema } from "../lib/schema";

// Force dynamic rendering to avoid build timeout
export const dynamic = "force-dynamic";

// Добавяне на метаданни за главната страница
export const metadata = {
  title: "Здраве и Болест – информация за заболявания на разбираем език",
  description:
    "Научете повече за заболяванията, клиничните проучвания и иновативни лечения. Медицинска информация, на която може да се доверите.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Здраве и Болест – информация за заболявания на разбираем език",
    description: "Научете повече за заболяванията, клиничните проучвания и иновативни лечения. Медицинска информация, на която може да се доверите.",
    url: "/",
    images: [
      {
        url: "/hero-woman-bg.png",
        width: 1200,
        height: 630,
        alt: "Здраве и Болест",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Здраве и Болест – информация за заболявания на разбираем език",
    description: "Научете повече за заболяванията, клиничните проучвания и иновативни лечения. Медицинска информация, на която може да се доверите.",
    images: ["/hero-woman-bg.png"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd id="home-webpage-schema" data={getHomeWebPageSchema()} />
      <WebVitals />
      <StickyQuickRegisterWrapper />
      <HeroSection />
      <Stats />
      <TherapeuticAreas />
      <VideoSection />
      {/* <AboutUs /> */} {/* Removed as per request */}
      <ClinicalTrialsIntro />
      <LatestBlogPosts />
      <CTASection />
    </>
  );
}
