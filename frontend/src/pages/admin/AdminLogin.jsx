import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminToast from '../../components/admin/AdminToast';
import api from '../../lib/axios';
import '../../styles/admin.css';

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
);

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required.';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required.';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      setToast({ show: true, type: 'error', message: 'Please fill in both fields.' });
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setToast({ show: true, type: 'error', message: err.response?.data?.message || 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root">
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-logo">DevPortfolio</div>
          <h1>Admin Login</h1>
          <p className="subtitle">Sign in to manage your portfolio content.</p>

          <form onSubmit={handleLogin} noValidate>
            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="admin@devportfolio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="field-error">{errors.email}</span>
            </div>
            <div className={`field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: '40px', width: '100%', boxSizing: 'border-box' }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <span className="field-error">{errors.password}</span>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <a href="/" className="back-link">&larr; Back to site</a>
        </div>
      </div>

      <AdminToast 
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default AdminLogin;
