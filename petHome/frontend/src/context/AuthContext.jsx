import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Clear token on every app start (no auto-login)
  useEffect(() => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  // Update axios header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = (userData, newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  // ✅ Fixed: This function updates the user data after profile edit
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout,
      updateUser          // ← This must be here
    }}>
      {children}
    </AuthContext.Provider>
  );
};