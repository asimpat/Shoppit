import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/profile/");
      setUser(response.data);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post("/login/", { username, password });
      const { access, refresh } = response.data.tokens;

      setToken(access);
      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);

      await fetchUserProfile(); // ✅ get and set the user here

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/register/", userData);
      const { access, refresh } = response.data.tokens;

      setToken(access);
      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);

      await fetchUserProfile();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const updateProfile = async (profileData) => {
   
    if (
      !profileData.profilePicture ||
      typeof profileData.profilePicture === "string"
    ) {
      const { profilePicture, ...rest } = profileData;
      profileData = rest;
    }
    try {
      const response = await api.put("/profile/", profileData);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data || "Update failed" };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
