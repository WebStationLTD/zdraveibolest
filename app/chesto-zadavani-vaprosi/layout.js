export const metadata = {
  title: "Често задавани въпроси за клиничните изпитвания – Здраве и Болест",
  description:
    "Отговори на най-важните въпроси за участието в клинични проучвания, безопасност и възнаграждение.",
  openGraph: {
    title: "Често задавани въпроси за клиничните изпитвания – Здраве и Болест",
    description:
      "Отговори на най-важните въпроси за участието в клинични проучвания, безопасност и възнаграждение.",
    images: [
      {
        url: "/hero-woman-bg.png",
        width: 1200,
        height: 630,
        alt: "ЧЗВ - Здраве и Болест",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
};

export default function FAQLayout({ children }) {
  return <>{children}</>;
}
