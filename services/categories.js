import { fetchAPI } from "./api";
import { cache } from "react";

/**
 * Get all categories
 * @returns {Promise<Array>} - List of categories
 */
export const getCategories = cache(async () => {
  return await fetchAPI("categories", {
    next: { revalidate: 3600 }, // Обновяване на всеки час
  });
});
