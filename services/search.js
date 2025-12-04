import { fetchAPI } from "./api";

/**
 * Search across all content types
 * @param {string} query - Search query
 * @returns {Promise<Object>} - Search results grouped by type
 */
export async function searchContent(query) {
  if (!query || query.trim().length < 2) {
    return { posts: [], pages: [], categories: [] };
  }

  try {
    // Search in parallel
    const [posts, pages, categories] = await Promise.all([
      // Search blog posts
      fetchAPI(`posts?search=${encodeURIComponent(query)}&per_page=10&_fields=id,slug,title,excerpt,date,categories&_embed`).catch(() => []),
      
      // Search pages
      fetchAPI(`pages?search=${encodeURIComponent(query)}&per_page=3&_fields=id,slug,title,excerpt&_embed`).catch(() => []),
      
      // Search categories
      fetchAPI(`categories?search=${encodeURIComponent(query)}&per_page=5&_fields=id,slug,name,description`).catch(() => []),
    ]);

    // Filter out uncategorized
    const filteredCategories = (categories || []).filter(cat => cat.slug !== 'uncategorized');

    return {
      posts: posts || [],
      pages: pages || [],
      categories: filteredCategories,
    };
  } catch (error) {
    console.error('Search error:', error);
    return { posts: [], pages: [], categories: [] };
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
         (results.categories?.length || 0);
}
