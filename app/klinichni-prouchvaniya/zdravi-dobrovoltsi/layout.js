export const metadata = {
  title: "Помогнете на медицината като здрав доброволец - Здраве и Болест",
  description:
    "Участвайте в клинично изпитване, получете пълен медицински преглед и компенсация за вашето време.",
  openGraph: {
    title: "Помогнете на медицината като здрав доброволец",
    description:
      "Участвайте в клинично изпитване, получете пълен медицински преглед и компенсация за вашето време.",
    images: [
      {
        url: "/hero-woman-bg.png",
        width: 1200,
        height: 630,
        alt: "Здрави доброволци",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
};

export default function HealthyVolunteersLayout({ children }) {
  return <>{children}</>;
}
