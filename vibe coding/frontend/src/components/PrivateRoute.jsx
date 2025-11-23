import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  
  // Jika tidak ada token, alihkan ke halaman login
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;