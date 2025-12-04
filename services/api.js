const API_BASE_URL = "https://zdraveibolest.admin-panels.com/wp-json/wp/v2";
import { cache } from "react";

/**
 * Universal fetch function with timeout
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options (optional)
 * @param {number} timeout - Timeout in milliseconds (default: 15000)
 * @returns {Promise<any>} - JSON response
 */
export const fetchAPI = cache(async (endpoint, options = {}, timeout = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();

    try {
      // Опитваме се да парснем отговора като JSON
      return JSON.parse(text);
    } catch (parseError) {
      // Ако получим HTML вместо JSON, хвърляме по-ясна грешка
      if (text.includes("<br />") || text.includes("<html")) {
        throw new Error(
          `WordPress върна HTML вместо JSON: ${text.substring(0, 100)}...`
        );
      }
      throw new Error(
        `Failed to parse API response as JSON: ${parseError.message}`
      );
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.error("Fetch API Timeout:", endpoint);
    } else {
      console.error("Fetch API Error:", error);
    }
    return null;
  }
});
