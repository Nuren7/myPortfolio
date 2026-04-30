import { useEffect, useState } from "react";
import { apiFetch } from "../../../config/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  /* LOGIN */
  const login = async (password) => {
    try {
      const data = await apiFetch("/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  /* VERIFY TOKEN */
  const verify = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const data = await apiFetch("/admin-check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAuthenticated(data.success);
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    verify();
  }, []);

  return { isAuthenticated, login, logout };
}