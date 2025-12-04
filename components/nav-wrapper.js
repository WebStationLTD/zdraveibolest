import Navigation from "./nav";
import { getCategoriesForNav } from "../services/categories";

export default async function NavigationWrapper() {
  let therapeuticAreas = [];

  try {
    const categories = await getCategoriesForNav();
    // Форматираме категориите да имат същата структура като преди
    therapeuticAreas = categories.map(cat => ({
      id: cat.id,
      title: { rendered: cat.name },
      slug: cat.slug,
      count: cat.count,
    }));
  } catch (error) {
    console.error("Error fetching categories for navigation:", error);
  }

  return <Navigation therapeuticAreas={therapeuticAreas} />;
}
