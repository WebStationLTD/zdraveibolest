const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://zdraveibolest.admin-panels.com/wp-json/wp/v2";

/**
 * Get all tags from WordPress
 * @returns {Promise<Array>} - List of tags
 */
export async function getAllTags() {
  try {
    const response = await fetch(
      `${API_URL}/tags?per_page=100&orderby=name&order=asc&hide_empty=true`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }

    const tags = await response.json();
    return tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      count: tag.count,
    }));
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

/**
 * Get posts by category with optional tag and search filters
 * @param {string} categorySlug - Category slug to filter by
 * @param {Array} tagIds - Array of tag IDs to filter by (optional)
 * @param {string} searchQuery - Search query (optional)
 * @param {number} perPage - Number of posts per page
 * @returns {Promise<Array>} - List of filtered posts
 */
export async function getFilteredPosts(categorySlug, tagIds = [], searchQuery = '', perPage = 100) {
  try {
    // First get category by slug
    const categoryResponse = await fetch(
      `${API_URL}/categories?slug=${categorySlug}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!categoryResponse.ok) {
      throw new Error("Failed to fetch category");
    }

    const categories = await categoryResponse.json();
    if (categories.length === 0) {
      return [];
    }

    const categoryId = categories[0].id;

    // Build query parameters
    let queryParams = `categories=${categoryId}&per_page=${perPage}&_embed&orderby=date&order=desc`;

    // Add tag filter if provided
    if (tagIds && tagIds.length > 0) {
      queryParams += `&tags=${tagIds.join(',')}`;
    }

    // Add search query if provided
    if (searchQuery && searchQuery.trim()) {
      queryParams += `&search=${encodeURIComponent(searchQuery.trim())}`;
    }

    const response = await fetch(
      `${API_URL}/posts?${queryParams}`,
      {
        next: { revalidate: 0 }, // Don't cache filtered results
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch filtered posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    return [];
  }
}

/**
 * Get tags used in a specific category
 * @param {string} categorySlug - Category slug
 * @returns {Promise<Array>} - List of tags used in this category
 */
export async function getTagsByCategory(categorySlug) {
  try {
    // First get all posts from this category
    const categoryResponse = await fetch(
      `${API_URL}/categories?slug=${categorySlug}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!categoryResponse.ok) {
      throw new Error("Failed to fetch category");
    }

    const categories = await categoryResponse.json();
    if (categories.length === 0) {
      return [];
    }

    const categoryId = categories[0].id;

    // Get posts with embedded tags
    const postsResponse = await fetch(
      `${API_URL}/posts?categories=${categoryId}&per_page=100&_embed`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!postsResponse.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await postsResponse.json();

    // Extract unique tags from posts
    const tagMap = new Map();

    posts.forEach(post => {
      const tags = post._embedded?.['wp:term']?.[1] || []; // Tags are in second position
      tags.forEach(tag => {
        if (!tagMap.has(tag.id)) {
          tagMap.set(tag.id, {
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            count: 1,
          });
        } else {
          const existing = tagMap.get(tag.id);
          existing.count++;
        }
      });
    });

    // Convert map to array and sort by name
    return Array.from(tagMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name, 'bg')
    );
  } catch (error) {
    console.error("Error fetching tags by category:", error);
    return [];
  }
}
