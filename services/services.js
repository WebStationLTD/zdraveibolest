import { fetchAPI } from "./api";
import { cache } from "react";

/**
 * Get all services
 * @returns {Promise<Array>} - List of services
 */
export const getServices = cache(async () => {
  return await fetchAPI(
    "services?_fields=id,slug,yoast_head_json,date,title,content&per_page=100",
    {
      next: { revalidate: 60 },
    }
  );
});

/**
 * Get all services for nav bar
 * @returns {Promise<Array>} - List of services
 */
export const getServicesNav = cache(async () => {
  return await fetchAPI(
    "services?_fields=id,slug,yoast_head_json,title&per_page=16"
  );
});

/**
 * Get a single service by slug
 * @param {string} slug - Service slug
 * @returns {Promise<Object|null>} - Service data
 */
export const getServiceBySlug = cache(async (slug) => {
  return await fetchAPI(
    `services?slug=${slug}&_fields=id,slug,yoast_head_json,date,title,content`
  );
});

/**
 * Get services by category
 * @param {number} categoryId - Category ID
 * @returns {Promise<Array>} - List of services in category
 */
export const getServicesByCategory = cache(async (categoryId) => {
  return await fetchAPI(`services?categories=${categoryId}`);
});
