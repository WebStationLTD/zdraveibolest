import HeroSection from "../components/hero";
import Stats from "../components/stats";
import TherapeuticAreas from "../components/therapeutic-areas";
import VideoSection from "../components/video-section";
import LatestBlogPosts from "../components/latest-blog-posts";
import { WebVitals } from "./web-vitals";
import dynamic from "next/dynamic";

// Динамично зареждане на компоненти с lazy loading
const Incentives = dynamic(() => import("../components/incentives"), {
  ssr: true,
});
const Team = dynamic(() => import("../components/team"), { ssr: true });
const CTA = dynamic(() => import("../components/cta"), { ssr: true });
const Clients = dynamic(() => import("../components/clients"), { ssr: true });
const Newsletter = dynamic(() => import("../components/newsletter"), {
  ssr: true,
});
const Testimonial = dynamic(() => import("../components/testimonial"), {
  ssr: true,
});

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

// Добавяне на метаданни за главната страница
export const metadata = {
  title: "NextLevel Services - Професионални бизнес услуги",
  description:
    "Открийте нашите висококачествени бизнес услуги, които ще изведат вашия бизнес на следващо ниво. Консултирайте се с нашите експерти днес.",
  keywords: [
    "бизнес услуги",
    "консултации",
    "професионални услуги",
    "NextLevel",
  ],
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
      <HeroSection />
      <Stats />
      <TherapeuticAreas />
      <VideoSection />
      <LatestBlogPosts />
      <Incentives />
      <Team />
      <CTA />
      <Clients />
      <Newsletter />
      <Testimonial />
    </>
  );
}
