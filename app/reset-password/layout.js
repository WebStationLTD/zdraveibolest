import { NOINDEX_ROBOTS } from "../../lib/seo";

export const metadata = {
  title: "Нова парола – Здраве и Болест",
  description: "Задайте нова парола за вашия профил в Здраве и Болест.",
  robots: NOINDEX_ROBOTS,
};

export default function ResetPasswordLayout({ children }) {
  return children;
}
