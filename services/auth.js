import { fetchAPI } from "./api";

// Use environment variable or fallback to hardcoded URL
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/wp-json/wp/v2', '') || 'https://zdraveibolest.admin-panels.com';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registration response
 */
export async function registerUser(userData) {
  try {
    // Always add site_member role for new registrations
    const dataWithRole = {
      ...userData,
      role: 'site_member'
    };
    
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithRole),
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
 * Quick register with minimal fields (email as username, phone, password)
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registration response
 */
export async function quickRegisterUser(userData) {
  try {
    const dataWithRole = {
      username: userData.email, // Email is also username
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      disease: userData.disease || '',
      role: 'site_member'
    };
    
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithRole),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Quick registration error:', error);
    throw error;
  }
}

/**
 * Update user profile with additional health info
 * @param {Object} profileData - Extended profile data
 * @param {string} token - Auth token
 * @returns {Promise<Object>} - Update response
 */
export async function updateUserProfile(profileData, token) {
  try {
    if (!token || typeof token !== 'string' || token.trim() === '') {
      throw new Error('Не сте влезли в системата. Моля, влезте отново.');
    }
    
    // Използваме custom header X-Auth-Token вместо Authorization
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/update-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Грешка при обновяване на профила');
    }

    return data;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
}

/**
 * Submit clinical trial inquiry form
 * @param {Object} formData - Form data with health info
 * @param {string} token - Auth token
 * @returns {Promise<Object>} - Submission response
 */
export async function submitClinicalTrialInquiry(formData, token) {
  try {
    if (!token || typeof token !== 'string' || token.trim() === '') {
      throw new Error('Не сте влезли в системата. Моля, влезте отново.');
    }
    
    // Използваме custom header X-Auth-Token вместо Authorization
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/clinical-trial-inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Грешка при изпращане на заявката');
    }

    return data;
  } catch (error) {
    console.error('Clinical trial inquiry error:', error);
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
  // Ако няма токен, връщаме null (не е грешка - потребителят просто не е логнат)
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return null;
  }
  
  try {
    // Използваме custom header X-Auth-Token вместо Authorization за да избегнем JWT плъгина
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
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






