import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPagee';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/activities/DashboardPage';
import ActivityFormPage from './pages/activities/ActivityFormPage';
import ActivityDetailPage from './pages/activities/ActivityDetailPage';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        // --- Public Routes --- 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        // --- Protected Routes --- 
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/activities/create" element={<PrivateRoute><ActivityFormPage /></PrivateRoute>} />
        <Route path="/activities/edit/:id" element={<PrivateRoute><ActivityFormPage /></PrivateRoute>} />
        <Route path="/activities/:id" element={<PrivateRoute><ActivityDetailPage /></PrivateRoute>} />

        // --- Catch-all Route --- 
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;