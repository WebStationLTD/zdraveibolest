import { fetchAPI } from "./api";
import { cache } from "react";

export const getContactInfo = cache(async () => {
  const data = await fetchAPI("contacts?_fields=acf", {
    next: { revalidate: 3600 }, // Обновяване на всеки час
  });
  const contactInfo = data && data.length > 0 ? data[0].acf : null;
  return contactInfo;
});
