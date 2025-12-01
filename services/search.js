import { fetchAPI } from "./api";

/**
 * Search across all content types
 * @param {string} query - Search query
 * @returns {Promise<Object>} - Search results grouped by type
 */
export async function searchContent(query) {
  if (!query || query.trim().length < 2) {
    return { posts: [], pages: [], services: [] };
  }

  try {
    // Search in parallel
    const [posts, pages, services] = await Promise.all([
      // Search blog posts
      fetchAPI(`posts?search=${encodeURIComponent(query)}&per_page=5&_fields=id,slug,title,excerpt,date&_embed`).catch(() => []),
      
      // Search pages
      fetchAPI(`pages?search=${encodeURIComponent(query)}&per_page=3&_fields=id,slug,title,excerpt&_embed`).catch(() => []),
      
      // Search therapeutic areas (services)
      fetchAPI(`services?search=${encodeURIComponent(query)}&per_page=5&_fields=id,slug,title,excerpt&_embed`).catch(() => []),
    ]);

    return {
      posts: posts || [],
      pages: pages || [],
      services: services || [],
    };
  } catch (error) {
    console.error('Search error:', error);
    return { posts: [], pages: [], services: [] };
  }
}

/**
 * Get total results count
 * @param {Object} results - Search results object
 * @returns {number} - Total count
 */
export function getTotalResultsCount(results) {
  return (results.posts?.length || 0) + 
         (results.pages?.length || 0) + 
         (results.services?.length || 0);
}
