import { withPageUrls } from "../../../lib/seo";

export const metadata = withPageUrls("/klinichni-prouchvaniya/patsienti", {
  title: "Клинични проучвания за пациенти – Здраве и Болест",
  description:
    "Открий нова възможност за твоето лечение чрез клинични проучвания. Безплатен достъп до иновативни терапии под медицински контрол.",
  openGraph: {
    title: "Клинични проучвания за пациенти – Здраве и Болест",
    description:
      "Открий нова възможност за твоето лечение чрез клинични проучвания. Безплатен достъп до иновативни терапии под медицински контрол.",
    images: [
      {
        url: "/images/patients-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Клинични проучвания за пациенти",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
});

export default function PatientsLayout({ children }) {
  return <>{children}</>;
}
