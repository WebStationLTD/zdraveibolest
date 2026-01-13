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
    // Email is used as username
    const dataWithRole = {
      ...userData,
      username: userData.email, // Use email as username
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
 * Quick register with minimal fields (email as username, phone, password, therapeutic_area, disease)
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
      therapeutic_area: userData.therapeutic_area || '',
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
 * Check if user profile is completed
 * Profile is considered completed if user has filled extended health information
 * @param {Object} user - User data object
 * @returns {boolean} - True if profile is completed
 */
export function isProfileCompleted(user) {
  if (!user) return false;
  
  // If backend explicitly sets profile_completed, use that
  // Handle both boolean true and string values like "1" or "true"
  if (user.profile_completed === true || user.profile_completed === 1 || user.profile_completed === "1" || user.profile_completed === "true") {
    return true;
  }
  
  // Otherwise, check if extended profile fields are filled
  // Profile is completed if user has provided health-related information
  const hasExtendedInfo = !!(
    user.birth_year ||
    user.gender ||
    user.city ||
    user.current_conditions ||
    user.current_medications ||
    user.smoking_status
  );
  
  return hasExtendedInfo;
}

/**
 * Save auth data to localStorage
 * @param {string} token - JWT token
 * @param {Object} user - User data
 */
export function saveAuthData(token, user) {
  if (typeof window === 'undefined') return;
  
  // Add profile_completed flag based on user data
  const userWithProfileStatus = {
    ...user,
    profile_completed: isProfileCompleted(user)
  };
  
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_data', JSON.stringify(userWithProfileStatus));
}






