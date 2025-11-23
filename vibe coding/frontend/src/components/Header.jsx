import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdLogout, MdOutlineAddBox, MdDashboard } from 'react-icons/md';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const primaryColor = '#003366'; 
  const accentColor = '#FFC300';
  
  const headerStyle = {
    backgroundColor: primaryColor,
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '5px 10px',
    transition: 'background-color 0.2s',
  };

  const userStyle = {
    marginRight: '15px',
    fontWeight: '300',
    fontSize: '14px',
  };

  const createButtonStyle = {
    backgroundColor: accentColor,
    color: primaryColor, 
    padding: '8px 15px',
    borderRadius: '4px',
    fontWeight: 'bold',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const logoutButtonStyle = {
      backgroundColor: 'transparent',
      color: 'white',
      border: '1px solid white',
      padding: '8px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
  };
  // -----------------------------------------------------------


  return (
    <header style={headerStyle}>
      <Link to="/" style={logoStyle}>
        🧭 Guide Hub
      </Link>
      
      <nav style={navStyle}>
        {user ? (
          <>
            <span style={userStyle}>Halo, **{user.name}**!</span>

            <Link to="/dashboard" style={navLinkStyle}>
              <MdDashboard size={20} style={{ marginRight: '5px' }} /> Dashboard
            </Link>
            
            <Link to="/activities/create" style={createButtonStyle}>
              <MdOutlineAddBox size={20} style={{ marginRight: '5px' }} /> Buat Kegiatan
            </Link>

            <button onClick={handleLogout} style={logoutButtonStyle}>
              <MdLogout size={20} style={{ marginRight: '5px' }} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={navLinkStyle}>Login</Link>
            <Link to="/register" style={navLinkStyle}>Daftar</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;