import { fetchAPI } from "./api";
import { cache } from "react";

/**
 * Get single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post data
 */
export const getPostBySlug = cache(async (slug) => {
  return await fetchAPI(
    `posts?slug=${slug}&_fields=id,slug,yoast_head_json,date,title,content`
  );
});

/**
 * Get latest posts with featured image and categories
 * Only posts from category ID 19 (Статии) are returned
 * @returns {Promise<Array>} - List of latest posts from category 19
 */
export const getLatestPosts = cache(async () => {
  return await fetchAPI(
    "posts?per_page=3&categories=19&_embed"
  );
});
