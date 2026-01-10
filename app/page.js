import HeroSection from "../components/hero";
import Stats from "../components/stats";
import TherapeuticAreas from "../components/therapeutic-areas";
import VideoSection from "../components/video-section";
import LatestBlogPosts from "../components/latest-blog-posts";
import AboutUs from "../components/about-us";
import OurMission from "../components/our-mission";
import CTASection from "../components/cta-section";
import StickyQuickRegisterWrapper from "../components/StickyQuickRegisterWrapper";
import { WebVitals } from "./web-vitals";

// Force dynamic rendering to avoid build timeout
export const dynamic = "force-dynamic";

// Добавяне на метаданни за главната страница
export const metadata = {
  title: "NextLevel Services - Професионални бизнес услуги",
  description:
    "Открийте нашите висококачествени бизнес услуги, които ще изведат вашия бизнес на следващо ниво. Консултирайте се с нашите експерти днес.",
  openGraph: {
    title: "NextLevel Services - Професионални бизнес услуги",
    description: "Открийте нашите висококачествени бизнес услуги",
    images: [
      {
        url: "/hero-woman-bg.png",
        width: 1200,
        height: 630,
        alt: "NextLevel Services",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextLevel Services - Професионални бизнес услуги",
    description: "Открийте нашите висококачествени бизнес услуги",
    images: ["/hero-woman-bg.png"],
  },
};

export default function Home() {
  return (
    <>
      <WebVitals />
      <StickyQuickRegisterWrapper />
      <HeroSection />
      <Stats />
      <TherapeuticAreas />
      <VideoSection />
      <AboutUs />
      <LatestBlogPosts />
      <OurMission />
      <CTASection />
    </>
  );
}
