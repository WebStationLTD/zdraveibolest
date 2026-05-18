export const metadata = {
  title: "Станете здрав доброволец в клинично изпитване – Здраве и Болест",
  description:
    "Участвайте в клинично изпитване, получете медицински преглед и възнаграждение. Помогнете на науката.",
  openGraph: {
    title: "Станете здрав доброволец в клинично изпитване – Здраве и Болест",
    description:
      "Участвайте в клинично изпитване, получете медицински преглед и възнаграждение. Помогнете на науката.",
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
