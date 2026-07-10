import { NOINDEX_ROBOTS } from "../../lib/seo";

export const metadata = {
  title: "Потвърдете имейла си – Здраве и Болест",
  description: "Последна стъпка за активиране на вашия профил и достъп до пълната информация.",
  robots: NOINDEX_ROBOTS,
};

export default function VerifyEmailLayout({ children }) {
  return <>{children}</>;
}
