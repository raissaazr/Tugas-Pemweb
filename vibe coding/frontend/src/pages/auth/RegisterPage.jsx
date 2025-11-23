import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import { FaUserPlus } from 'react-icons/fa'; 

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const primaryColor = '#003366'; 
  const accentColor = '#FFC300'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      alert('Registrasi berhasil! Anda telah masuk.');
      navigate('/dashboard'); // Arahkan ke Dashboard setelah register & login sukses
    }
  };

  return (
    <div className="register-container">
      <Header />
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: primaryColor, borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px', marginBottom: '20px' }}>Daftar Akun Pemandu</h2>
        
        {error && <p style={{ color: 'white', backgroundColor: '#CC3333', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>Error: {error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nama Lengkap:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: loading ? '#ccc' : primaryColor, 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FaUserPlus style={{ marginRight: '8px' }} /> {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9em' }}>
          Sudah punya akun? <Link to="/login" style={{ color: primaryColor, fontWeight: 'bold', textDecoration: 'none' }}>Login di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;