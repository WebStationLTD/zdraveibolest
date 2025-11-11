import { headers } from "next/headers";
import Navigation from "../components/nav";
import CookieConsentBanner from "../components/cookieConsentBanner";
import Footer from "../components/footer";
import Script from "next/script";
import ImagePreloader from "../components/ImagePreloader";
import { CriticalCSS } from "./critical-css";
import BackToTop from "../components/BackToTop";
import CallButton from "../components/CallButton";
import NextTopLoader from "nextjs-toploader";
import "../styles/globals.css";
import { Lora } from "next/font/google";

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
      template: "%s | NextLevel Services",
      default: "NextLevel Services | Професионални бизнес услуги",
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    openGraph: {
      title: "NextLevel Services | Професионални бизнес услуги",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      images: "/lawyer.webp",
      type: "website",
      locale: "bg_BG",
      siteName: "NextLevel Services",
    },
    twitter: {
      card: "summary_large_image",
      title: "NextLevel Services",
      description: "Lorem ipsum dolor sit amet",
      images: ["/lawyer.webp"],
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
    alternates: {
      canonical: "/",
      languages: {
        bg: "/",
      },
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
      </head>
      <body className={lora.className}>
        <NextTopLoader showSpinner={false} color="#129160" />
        <BackToTop />
        <CallButton />
        <ImagePreloader />
        <Navigation />
        <main>{children}</main>
        <CookieConsentBanner />
        <Footer />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: "Lorem ipsum dolor sit amet",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              url: "https://example.bg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+359XXXXXXXXX",
                contactType: "customer service",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Example Street 123",
                addressLocality: "София",
                postalCode: "1000",
                addressCountry: "BG",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
