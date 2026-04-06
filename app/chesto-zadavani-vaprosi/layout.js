export const metadata = {
  title: "Отговори на вашите въпроси за здравето - Здраве и Болест",
  description:
    "Често задавани въпроси за заболявания, лечения и участие в клинични изпитвания. Ясни отговори.",
  openGraph: {
    title: "Отговори на вашите въпроси за здравето",
    description:
      "Често задавани въпроси за заболявания, лечения и участие в клинични изпитвания. Ясни отговори.",
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
