import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    const userDataStr = localStorage.getItem('userData');
    
    if (token && userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        setUser({ token, ...userData });
      } catch (err) {
        // Clear corrupt storage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser({ token, ...userData });
  };

  // Async login helper: performs API call then stores token/data
  const loginWithCredentials = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, ...userData } = res.data.data;
    login(token, userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const currentToken = localStorage.getItem('userToken');
    const existingDataStr = localStorage.getItem('userData');
    if (existingDataStr) {
      const existingData = JSON.parse(existingDataStr);
      const newData = { ...existingData, ...updatedData };
      localStorage.setItem('userData', JSON.stringify(newData));
      setUser({ token: currentToken, ...newData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithCredentials, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
