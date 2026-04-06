import HeroSection from "../components/hero";
import Stats from "../components/stats";
import TherapeuticAreas from "../components/therapeutic-areas";
import VideoSection from "../components/video-section";
import LatestBlogPosts from "../components/latest-blog-posts";
// import AboutUs from "../components/about-us"; // Removed as per request
import OurMission from "../components/our-mission";
import CTASection from "../components/cta-section";
import StickyQuickRegisterWrapper from "../components/StickyQuickRegisterWrapper";
import { WebVitals } from "./web-vitals";

// Force dynamic rendering to avoid build timeout
export const dynamic = "force-dynamic";

// Добавяне на метаданни за главната страница
export const metadata = {
  title: "Всичко за здравето и болестите на разбираем език - Здраве и Болест",
  description:
    "Разберете какво се случва с вашето тяло, научете за лечения и открийте възможности за по-добро здраве.",
  openGraph: {
    title: "Всичко за здравето и болестите на разбираем език - Здраве и Болест",
    description: "Разберете какво се случва с вашето тяло, научете за лечения и открийте възможности за по-добро здраве.",
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
    title: "Всичко за здравето и болестите на разбираем език",
    description: "Разберете какво се случва с вашето тяло, научете за лечения и открийте възможности за по-добро здраве.",
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
      {/* <AboutUs /> */} {/* Removed as per request */}
      <LatestBlogPosts />
      <OurMission />
      <CTASection />
    </>
  );
}
