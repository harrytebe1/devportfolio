import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminToast from '../../components/admin/AdminToast';
import '../../styles/admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
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

    // Dummy logic for Epic 4 (Frontend Only)
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('adminToken', 'demo-token');
      navigate('/admin/dashboard');
    }, 900);
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
                placeholder="admin@devportfolio.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="field-error">{errors.email}</span>
            </div>
            <div className={`field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
