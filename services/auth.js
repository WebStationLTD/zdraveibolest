import { fetchAPI } from "./api";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/wp-json/wp/v2', '');

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registration response
 */
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

/**
 * Login user
 * @param {string} username - Username or email
 * @param {string} password - Password
 * @returns {Promise<Object>} - Login response with token
 */
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Validate token and get current user
 * @param {string} token - JWT token
 * @returns {Promise<Object>} - User data
 */
export async function validateToken(token) {
  try {
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Token validation failed');
    }

    return data;
  } catch (error) {
    console.error('Token validation error:', error);
    throw error;
  }
}

/**
 * Logout user
 */
export function logoutUser() {
  // Clear token from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
}

/**
 * Get current user from localStorage
 * @returns {Object|null} - User data or null
 */
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Get auth token from localStorage
 * @returns {string|null} - Token or null
 */
export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Save auth data to localStorage
 * @param {string} token - JWT token
 * @param {Object} user - User data
 */
export function saveAuthData(token, user) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_data', JSON.stringify(user));
}





