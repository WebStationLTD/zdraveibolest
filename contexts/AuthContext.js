"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  loginUser as apiLogin,
  registerUser as apiRegister,
  quickRegisterUser as apiQuickRegister,
  updateUserProfile as apiUpdateProfile,
  submitClinicalTrialInquiry as apiSubmitInquiry,
  createApplication as apiCreateApplication,
  validateToken,
  logoutUser as apiLogout,
  getCurrentUser as getStoredUser,
  getAuthToken,
  saveAuthData,
  isProfileCompleted,
} from "../services/auth";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const storedUser = getStoredUser();

      // Ако имаме token и user в localStorage, веднагаги използваме
      if (token && storedUser) {
        // Валидираме токена на заден план (задължително за пълни данни)
        // ВАЖНО: Не задаваме user преди validation, за да избегнем race conditions
        try {
          const validatedUser = await validateToken(token);
          console.log('🔍 CHECK AUTH - Backend validated user:', validatedUser);
          console.log('🔍 CHECK AUTH - Stored user:', storedUser);
          
          // Ако валидацията е успешна, обновяваме user данните
          if (validatedUser && (validatedUser.id || validatedUser.user_id)) {
            // SIMPLE LOGIC: Use backend data directly - backend is the source of truth
            const userData = {
              ...validatedUser,
              // Force re-check profile completion based on CURRENT data from backend
              profile_completed: isProfileCompleted(validatedUser)
            };
            
            console.log('✅ CHECK AUTH - User data from backend:', userData);
            
            saveAuthData(token, userData);
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (validationError) {
          // Логваме грешката но НЕ logout-ваме потребителя
          // освен ако токенът изрично е изтекъл
          console.warn("Token validation warning:", validationError.message);

          const errorMessage = validationError.message?.toLowerCase() || "";

          // Само ако сървърът изрично каже че токенът е изтекъл, logout-ваме
          if (
            errorMessage.includes("expired") ||
            errorMessage.includes("jwt_auth_invalid_token")
          ) {
            console.log("Token expired, logging out...");
            apiLogout();
            setUser(null);
            setIsAuthenticated(false);
          } else {
            // За всички други грешки използваме user-а от localStorage
            // IMPORTANT: Always re-validate profile completion
            const userWithProfileStatus = {
              ...storedUser,
              profile_completed: isProfileCompleted(storedUser)
            };
            // Update localStorage with re-validated status
            saveAuthData(token, userWithProfileStatus);
            setUser(userWithProfileStatus);
            setIsAuthenticated(true);
          }
        }
      } else {
        // Няма token или user - потребителят не е логнат (НЕ е грешка!)
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Catch any unexpected errors but don't crash the app
      console.error("Auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await apiLogin(username, password);
      
      if (response.token && response.user) {
        // Save token first
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.token);
        }
        
        // Now fetch full user data via validateToken to get extended fields
        try {
          const fullUserData = await validateToken(response.token);
          if (fullUserData && (fullUserData.id || fullUserData.user_id)) {
            // IMPORTANT: Validate profile completion before saving
            const userWithValidatedProfile = {
              ...fullUserData,
              profile_completed: isProfileCompleted(fullUserData)
            };
            saveAuthData(response.token, userWithValidatedProfile);
            const userWithStatus = getStoredUser();
            setUser(userWithStatus);
            setIsAuthenticated(true);
            return { success: true, user: userWithStatus };
          }
        } catch (validationError) {
          // If validation fails, fall back to login response user
          console.warn('Failed to fetch full user data, using login response:', validationError);
          const userWithValidatedProfile = {
            ...response.user,
            profile_completed: isProfileCompleted(response.user)
          };
          saveAuthData(response.token, userWithValidatedProfile);
          const userWithStatus = getStoredUser();
          setUser(userWithStatus);
          setIsAuthenticated(true);
          return { success: true, user: userWithStatus };
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData);
      
      // Email verification required — backend returns no token, just success
      if (response.requires_verification || !response.token) {
        return { success: true, requiresVerification: true };
      }

      // Fallback: if backend still returns token (old behaviour), log in normally
      if (response.token && response.user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.token);
        }
        try {
          const fullUserData = await validateToken(response.token);
          if (fullUserData && (fullUserData.id || fullUserData.user_id)) {
            const userWithValidatedProfile = {
              ...fullUserData,
              profile_completed: isProfileCompleted(fullUserData)
            };
            saveAuthData(response.token, userWithValidatedProfile);
            const userWithStatus = getStoredUser();
            setUser(userWithStatus);
            setIsAuthenticated(true);
            return { success: true, user: userWithStatus };
          }
        } catch (validationError) {
          console.warn('Failed to fetch full user data:', validationError);
        }
      }

      return { success: true, requiresVerification: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const quickRegister = async (userData) => {
    try {
      const response = await apiQuickRegister(userData);

      // Email verification required — backend returns no token, just success
      if (response.requires_verification || !response.token) {
        return { success: true, requiresVerification: true };
      }

      // Fallback: if backend still returns token (old behaviour), log in normally
      if (response.token && response.user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.token);
        }
        try {
          const fullUserData = await validateToken(response.token);
          if (fullUserData && (fullUserData.id || fullUserData.user_id)) {
            const userWithValidatedProfile = {
              ...fullUserData,
              profile_completed: isProfileCompleted(fullUserData)
            };
            saveAuthData(response.token, userWithValidatedProfile);
            const userWithStatus = getStoredUser();
            setUser(userWithStatus);
            setIsAuthenticated(true);
            return { success: true, user: userWithStatus };
          }
        } catch (validationError) {
          console.warn('Failed to fetch full user data:', validationError);
        }
      }

      return { success: true, requiresVerification: true };
    } catch (error) {
      console.error("Quick registration error:", error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      console.log('📤 UPDATE PROFILE - Sending data:', profileData);

      const response = await apiUpdateProfile(profileData, token);

      console.log('📥 UPDATE PROFILE - Backend response:', response);

      // ВАЖНО: След update, вземи АКТУАЛНИТЕ данни от базата чрез validate
      console.log('🔄 FETCHING UPDATED USER DATA...');
      const validateResponse = await validateToken(token);
      
      if (validateResponse) {
        const updatedUserData = {
          ...validateResponse,
          // Normalize ACF field names
          phone: validateResponse.phone || validateResponse.acf_phone_number,
          birth_year: validateResponse.birth_year || validateResponse.acf_birth_year,
          gender: validateResponse.gender || validateResponse.acf_gender,
          city: validateResponse.city || validateResponse.acf_city,
          therapeutic_area: validateResponse.therapeutic_area || validateResponse.acf_therapeutic_area,
          current_conditions: validateResponse.current_conditions || validateResponse.acf_current_diseases,
          current_medications: validateResponse.current_medications || validateResponse.acf_current_medications,
          smoking_status: validateResponse.smoking_status || validateResponse.acf_smoking_status,
          additional_info: validateResponse.additional_info || validateResponse.acf_additional_health_info,
        };
        
        updatedUserData.profile_completed = isProfileCompleted(updatedUserData);
        
        console.log('💾 SAVING UPDATED USER DATA:', updatedUserData);
        
        // Save to localStorage
        saveAuthData(token, updatedUserData);
        
        // Force update state
        setUser(updatedUserData);
        
        console.log('✅ PROFILE UPDATE COMPLETE');
        
        return { success: true, user: updatedUserData };
      }
      
      return { success: true, user: response.user };
    } catch (error) {
      console.error("❌ Profile update error:", error);
      return { success: false, error: error.message };
    }
  };

  const submitClinicalInquiry = async (formData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await apiSubmitInquiry(formData, token);
      return { success: true, data: response };
    } catch (error) {
      console.error("Clinical inquiry error:", error);
      return { success: false, error: error.message };
    }
  };

  const createApplication = async (applicationData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await apiCreateApplication(applicationData, token);
      return { success: true, data: response };
    } catch (error) {
      console.error("Application creation error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    quickRegister,
    updateProfile,
    submitClinicalInquiry,
    createApplication,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}






