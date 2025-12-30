import { fetchAPI } from "./api";
import { cache } from "react";
import { getCategoryBySlug, getPostsByCategory as getPostsByCategoryId } from "./categories";

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
 * @returns {Promise<Array>} - List of latest posts
 */
export const getLatestPosts = cache(async () => {
  return await fetchAPI(
    "posts?per_page=3&_embed"
  );
});

/**
 * Get posts by category slug
 * @param {string} categorySlug - Category slug
 * @returns {Promise<Array>} - List of posts in the category (with only id, slug, title)
 */
export const getPostsByCategory = async (categorySlug) => {
  try {
    // First, get the category by slug
    const category = await getCategoryBySlug(categorySlug);
    
    if (!category) {
      console.error(`Category not found: ${categorySlug}`);
      return [];
    }
    
    // Then, get all posts in this category
    const posts = await getPostsByCategoryId(category.id, 100);
    
    // Return only necessary fields for the select dropdown
    return posts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: {
        rendered: post.title?.rendered || post.title
      }
    }));
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
};
