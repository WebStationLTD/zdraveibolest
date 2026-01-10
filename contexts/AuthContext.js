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
          // Ако валидацията е успешна, обновяваме user данните
          if (validatedUser && (validatedUser.id || validatedUser.user_id)) {
            // Check if backend returned complete data
            // If profile is marked as completed, we MUST have extended fields
            const hasExtendedFields = !!(validatedUser.birth_year || validatedUser.gender || validatedUser.city || validatedUser.current_conditions || validatedUser.current_medications || validatedUser.smoking_status);
            const backendProfileCompleted = validatedUser.profile_completed === true || validatedUser.profile_completed === 1 || validatedUser.profile_completed === "1" || validatedUser.profile_completed === "true";
            
            // If backend says profile is completed but doesn't return extended fields,
            // use stored user data (which should have extended fields from previous successful validation)
            if (backendProfileCompleted && !hasExtendedFields && storedUser.birth_year) {
              // Use stored user with updated basic fields from validation
              const mergedUser = {
                ...storedUser,
                ...validatedUser,
                // Preserve extended fields from stored user
                birth_year: storedUser.birth_year,
                gender: storedUser.gender,
                city: storedUser.city,
                current_conditions: storedUser.current_conditions,
                current_medications: storedUser.current_medications,
                smoking_status: storedUser.smoking_status,
                profile_completed: true
              };
              saveAuthData(token, mergedUser);
              const updatedUser = getStoredUser();
              setUser(updatedUser);
              setIsAuthenticated(true);
            } else {
              // Normal case: backend returned complete data or profile is not completed
              saveAuthData(token, validatedUser);
              // Get updated user from localStorage
              const updatedUser = getStoredUser();
              setUser(updatedUser);
              setIsAuthenticated(true);
            }
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
            const userWithProfileStatus = {
              ...storedUser,
              profile_completed: isProfileCompleted(storedUser)
            };
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
            // saveAuthData with full user data
            saveAuthData(response.token, fullUserData);
            const userWithStatus = getStoredUser();
            setUser(userWithStatus);
            setIsAuthenticated(true);
            return { success: true, user: userWithStatus };
          }
        } catch (validationError) {
          // If validation fails, fall back to login response user
          console.warn('Failed to fetch full user data, using login response:', validationError);
          saveAuthData(response.token, response.user);
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
      
      if (response.token && response.user) {
        // Save token first
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.token);
        }
        
        // Fetch full user data via validateToken to get extended fields
        try {
          const fullUserData = await validateToken(response.token);
          if (fullUserData && (fullUserData.id || fullUserData.user_id)) {
            saveAuthData(response.token, fullUserData);
            const userWithStatus = getStoredUser();
            setUser(userWithStatus);
            setIsAuthenticated(true);
            return { success: true, user: userWithStatus };
          }
        } catch (validationError) {
          // If validation fails, fall back to register response user
          console.warn('Failed to fetch full user data, using register response:', validationError);
          saveAuthData(response.token, response.user);
          const userWithStatus = getStoredUser();
          setUser(userWithStatus);
          setIsAuthenticated(true);
          return { success: true, user: userWithStatus };
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const quickRegister = async (userData) => {
    try {
      const response = await apiQuickRegister(userData);

      if (response.token && response.user) {
        // Save token first
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.token);
        }
        
        // Fetch full user data via validateToken to get extended fields
        try {
          const fullUserData = await validateToken(response.token);
          if (fullUserData && (fullUserData.id || fullUserData.user_id)) {
            saveAuthData(response.token, fullUserData);
            const userWithStatus = getStoredUser();
            setUser(userWithStatus);
            setIsAuthenticated(true);
            return { success: true, user: userWithStatus };
          }
        } catch (validationError) {
          // If validation fails, fall back to quick register response user
          console.warn('Failed to fetch full user data, using quick register response:', validationError);
          saveAuthData(response.token, response.user);
          const userWithStatus = getStoredUser();
          setUser(userWithStatus);
          setIsAuthenticated(true);
          return { success: true, user: userWithStatus };
        }
      } else {
        throw new Error("Invalid response from server");
      }
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

      const response = await apiUpdateProfile(profileData, token);

      if (response.user) {
        // saveAuthData automatically adds profile_completed status
        saveAuthData(token, response.user);
        
        // Get updated user with profile_completed from localStorage
        const updatedUser = getStoredUser();
        setUser(updatedUser);
        return { success: true, user: updatedUser };
      }

      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
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






