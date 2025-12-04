const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// Helper function to fetch with timeout
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Взима всички категории от WordPress
 * @returns {Promise<Array>} - списък с категории
 */
export async function getCategories() {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/categories?per_page=100&_embed&hide_empty=true`,
      {
        next: { revalidate: 60 },
      },
      15000
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    
    // Филтрираме "Uncategorized" категорията
    return categories.filter(cat => cat.slug !== 'uncategorized');
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Взима една категория по slug
 * @param {string} slug - slug на категорията
 * @returns {Promise<Object|null>} - категорията или null
 */
export async function getCategoryBySlug(slug) {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/categories?slug=${slug}`,
      {
        next: { revalidate: 60 },
      },
      15000
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category");
    }

    const categories = await response.json();
    return categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

/**
 * Взима статиите от дадена категория
 * @param {number} categoryId - ID на категорията
 * @param {number} perPage - брой статии на страница
 * @returns {Promise<Array>} - списък със статии
 */
export async function getPostsByCategory(categoryId, perPage = 100) {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/posts?categories=${categoryId}&per_page=${perPage}&_embed&orderby=date&order=desc`,
      {
        next: { revalidate: 60 },
      },
      15000
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

/**
 * Взима категориите за навигацията (за менюто)
 * @returns {Promise<Array>} - списък с категории за меню
 */
export async function getCategoriesForNav() {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/categories?per_page=100&hide_empty=false&orderby=name&order=asc`,
      {
        next: { revalidate: 60 },
      },
      15000
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories for nav");
    }

    const categories = await response.json();
    
    // Филтрираме "Uncategorized" и форматираме за меню
    return categories
      .filter(cat => cat.slug !== 'uncategorized')
      .map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
        description: cat.description || '',
      }));
  } catch (error) {
    console.error("Error fetching categories for nav:", error);
    return [];
  }
}
