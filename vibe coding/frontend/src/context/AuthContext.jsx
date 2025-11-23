import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Ambil data dari localStorage saat load awal
const initialToken = localStorage.getItem('token');
const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      
      // Simpan di localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(newToken);
      setUser(userData);
      setLoading(false);
      return true;

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login gagal.';
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  // --- Fungsi Register ---
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.post('/api/auth/register', { name, email, password });
        
        const { token: newToken, user: userData } = response.data;
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setToken(newToken);
        setUser(userData);
        setLoading(false);
        return true;
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Registrasi gagal.';
        setError(errorMessage);
        setLoading(false);
        return false;
    }
  };

  // --- Fungsi Logout ---
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};