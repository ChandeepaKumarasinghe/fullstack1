import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5555/admin/validate-token",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.admin.userType) {
        // Add check for userType
        setUser({
          id: response.data.admin.id,
          name: response.data.admin.name,
          userType: response.data.admin.userType,
        });
      } else {
        throw new Error("Invalid user type");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Token validation failed:", error);
      logout();
      setIsLoading(false);
    }
  };

  const login = async (name, password) => {
    try {
      const response = await axios.post("http://localhost:5555/admin/login", {
        name,
        password,
      });
      const { token, adminId, userType } = response.data;
      if (!userType) throw new Error("User type is required"); // Add validation
      localStorage.setItem("token", token);
      setUser({
        id: adminId,
        name,
        userType,
      });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (name, password, userType) => {
    try {
      if (!userType) throw new Error("User type is required"); // Add validation
      const response = await axios.post("http://localhost:5555/admin/signup", {
        name,
        password,
        userType,
      });
      const { token, adminId } = response.data;
      localStorage.setItem("token", token);
      setUser({
        id: adminId,
        name,
        userType,
      });
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
