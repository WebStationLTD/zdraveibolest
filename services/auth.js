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
    console.log('🔍 VALIDATE TOKEN - Calling:', `${API_URL}/wp-json/zdravei/v1/validate`);
    
    // Използваме custom header X-Auth-Token вместо Authorization за да избегнем JWT плъгина
    const response = await fetch(`${API_URL}/wp-json/zdravei/v1/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      },
    });

    console.log('🔍 VALIDATE TOKEN - Response status:', response.status);
    console.log('🔍 VALIDATE TOKEN - Response ok:', response.ok);

    const data = await response.json();
    console.log('🔍 VALIDATE TOKEN - Response data:', data);

    if (!response.ok) {
      console.error('❌ VALIDATE TOKEN - Error response:', data);
      throw new Error(data.message || 'Token validation failed');
    }

    return data;
  } catch (error) {
    console.error('❌ Token validation error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack
    });
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
    const parsed = userData ? JSON.parse(userData) : null;
    console.log('📖 GET CURRENT USER from localStorage:', parsed);
    return parsed;
  } catch (error) {
    console.error('❌ Error getting current user:', error);
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
 * Profile is considered completed if user has filled ALL required fields
 * @param {Object} user - User data object
 * @returns {boolean} - True if profile is completed
 */
export function isProfileCompleted(user) {
  if (!user) {
    console.log('🔍 isProfileCompleted: user is null/undefined');
    return false;
  }
  
  // Helper function to check if value is truly filled (not empty string, null, or undefined)
  const isFilled = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return true;
    return false;
  };
  
  // Required basic fields
  const hasFirstName = isFilled(user.first_name);
  const hasLastName = isFilled(user.last_name);
  const hasEmail = isFilled(user.email) && /\S+@\S+\.\S+/.test(user.email);
  
  console.log('🔍 isProfileCompleted: Basic fields:', {
    first_name: hasFirstName ? '✅' : '❌',
    last_name: hasLastName ? '✅' : '❌',
    email: hasEmail ? '✅' : '❌'
  });
  
  if (!hasFirstName || !hasLastName || !hasEmail) {
    console.log('❌ isProfileCompleted: Basic fields missing - FALSE');
    return false;
  }
  
  // Extended fields - at least ONE must be filled
  const hasBirthYear = isFilled(user.birth_year);
  const hasGender = isFilled(user.gender);
  const hasCity = isFilled(user.city);
  const hasConditions = isFilled(user.current_conditions);
  const hasMedications = isFilled(user.current_medications);
  const hasSmoking = isFilled(user.smoking_status);
  
  console.log('🔍 isProfileCompleted: Extended fields:', {
    birth_year: hasBirthYear ? '✅' : '❌',
    gender: hasGender ? '✅' : '❌',
    city: hasCity ? '✅' : '❌',
    current_conditions: hasConditions ? '✅' : '❌',
    current_medications: hasMedications ? '✅' : '❌',
    smoking_status: hasSmoking ? '✅' : '❌'
  });
  
  const hasAnyExtendedField = hasBirthYear || hasGender || hasCity || hasConditions || hasMedications || hasSmoking;
  
  const result = hasAnyExtendedField;
  console.log(`🔍 isProfileCompleted: Final result = ${result ? '✅ TRUE' : '❌ FALSE'}`);
  
  return result;
}

/**
 * Save auth data to localStorage
 * @param {string} token - JWT token
 * @param {Object} user - User data
 */
export function saveAuthData(token, user) {
  if (typeof window === 'undefined') return;
  
  console.log('💾 SAVE AUTH DATA:', {
    email: user.email,
    profile_completed: user.profile_completed,
    has_extended_fields: !!(user.birth_year || user.gender || user.city || user.current_conditions || user.current_medications || user.smoking_status)
  });
  
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_data', JSON.stringify(user));
}






