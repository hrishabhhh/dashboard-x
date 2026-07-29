import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");

      const user = await getCurrentUser();

      setUser(user);
      setLoading(false);

      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(false);
    }
    checkAuth();
  }, []);

  function login(userData, token) {
    localStorage.setItem("token", token);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
