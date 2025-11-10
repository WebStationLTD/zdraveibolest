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
 * Get latest posts
 * @returns {Promise<Array>} - List of latest posts
 */
export const getLatestPosts = cache(async () => {
  return await fetchAPI(
    "posts?per_page=3&_fields=id,slug,yoast_head_json,date,title,content"
  );
});
