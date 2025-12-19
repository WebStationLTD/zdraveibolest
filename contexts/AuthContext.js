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

      // Ако имаме token и user в localStorage, веднага ги използваме
      if (token && storedUser) {
        // Първо задаваме user-а от localStorage за незабавен достъп
        setUser(storedUser);
        setIsAuthenticated(true);

        // Валидираме токена на заден план (опционално)
        try {
          const validatedUser = await validateToken(token);
          // Ако валидацията е успешна, обновяваме user данните
          if (validatedUser && (validatedUser.id || validatedUser.user_id)) {
            setUser(validatedUser);
            saveAuthData(token, validatedUser);
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
          }
          // За всички други грешки оставяме user-а логнат с localStorage данните
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
        saveAuthData(response.token, response.user);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData);

      if (response.token && response.user) {
        saveAuthData(response.token, response.user);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    }
  };

  const quickRegister = async (userData) => {
    try {
      const response = await apiQuickRegister(userData);

      if (response.token && response.user) {
        saveAuthData(response.token, response.user);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
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
        // Update local user data
        saveAuthData(token, response.user);
        setUser(response.user);
        return { success: true, user: response.user };
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
