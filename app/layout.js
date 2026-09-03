import { headers } from "next/headers";
import NavigationWrapper from "../components/nav-wrapper";
import CookieConsentBanner from "../components/cookieConsentBanner";
import Footer from "../components/footer";
import JsonLd from "../components/JsonLd";
import ImagePreloader from "../components/ImagePreloader";
import { CriticalCSS } from "./critical-css";
import BackToTop from "../components/BackToTop";
import CallButton from "../components/CallButton";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";
import { Lora } from "next/font/google";
import { getGlobalStructuredData } from "../lib/schema";

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: true,
});

export async function generateMetadata() {
  const host = (await headers()).get("host"); // Get the current domain
  const protocol = host?.includes("localhost") ? "http" : "https"; // Adjust for local dev

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: {
      template: "%s",
      default: "Здраве и Болест – информация за заболявания на разбираем език",
    },
    description:
      "Научете повече за заболяванията, клиничните проучвания и иновативни лечения. Медицинска информация, на която може да се доверите.",
    openGraph: {
      title: "Здраве и Болест – информация за заболявания на разбираем език",
      description:
        "Научете повече за заболяванията, клиничните проучвания и иновативни лечения. Медицинска информация, на която може да се доверите.",
      images: "/hero-woman-bg.png",
      type: "website",
      locale: "bg_BG",
      siteName: "Здраве и Болест",
    },
    twitter: {
      card: "summary_large_image",
      title: "Здраве и Болест",
      description: "Медицинска информация на разбираем език",
      images: ["/hero-woman-bg.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: { url: "/apple-icon.png", sizes: "512x512" },
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <head>
        <CriticalCSS />
        <link
          rel="preconnect"
          href="https://zdraveibolest.admin-panels.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://zdraveibolest.admin-panels.com"
        />

        {/* Директно използване на preload тагове с правилния синтаксис */}
        <link
          rel="preload"
          as="image"
          href="/hero-woman-bg.png"
          type="image/png"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <JsonLd id="structured-data" data={getGlobalStructuredData()} />
      </head>
      <body className={lora.className}>
        <AuthProvider>
        <NextTopLoader showSpinner={false} color="#129160" />
        <BackToTop />
        <CallButton />
        <ImagePreloader />
          <NavigationWrapper />
        <main>{children}</main>
        <CookieConsentBanner />
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
