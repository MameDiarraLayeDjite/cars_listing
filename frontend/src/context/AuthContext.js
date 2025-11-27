import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      try {
        const decoded = jwtDecode(token);
        setCurrentUser({
          email: decoded.sub || decoded.email,
          username: decoded.username || decoded.sub || 'Admin',
          role: decoded.role || 'admin'
        });
      } catch {
        setCurrentUser(null);
      }
    } else {
      localStorage.removeItem('token');
      setCurrentUser(null);
    }
  }, [token]);

  function isAuthenticated() {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return false;
      const expiry = decoded.exp * 1000;
      return Date.now() < expiry;
    } catch {
      return false;
    }
  }

  function login(newToken) {
    setToken(newToken);
  }

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, currentUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
