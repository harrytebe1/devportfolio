import React, { useState } from 'react';
import AdminToast from '../../components/admin/AdminToast';
import api from '../../lib/axios';

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
);

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const showToast = (message, type = 'success') => setToast({ show: true, message, type });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific error
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = 'Required';
    if (!formData.newPassword) newErrors.newPassword = 'Required';
    else if (formData.newPassword.length < 6) newErrors.newPassword = 'Must be at least 6 characters';
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await api.put('/auth/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      showToast('Password updated successfully!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account settings and security.</p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Change Password</h3>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className={`field ${errors.currentPassword ? 'has-error' : ''}`}>
            <label htmlFor="currentPassword">Current Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showCurrent ? "text" : "password"}
                id="currentPassword" 
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                style={{ paddingRight: '40px', width: '100%', boxSizing: 'border-box' }}
              />
              <button 
                type="button" 
                onClick={() => setShowCurrent(!showCurrent)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <span className="field-error">{errors.currentPassword}</span>
          </div>

          <div className={`field ${errors.newPassword ? 'has-error' : ''}`}>
            <label htmlFor="newPassword">New Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showNew ? "text" : "password"}
                id="newPassword" 
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                style={{ paddingRight: '40px', width: '100%', boxSizing: 'border-box' }}
              />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <span className="field-error">{errors.newPassword}</span>
          </div>

          <div className={`field ${errors.confirmPassword ? 'has-error' : ''}`}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showConfirm ? "text" : "password"}
                id="confirmPassword" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ paddingRight: '40px', width: '100%', boxSizing: 'border-box' }}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <span className="field-error">{errors.confirmPassword}</span>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      <AdminToast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast({...toast, show: false})} />
    </div>
  );
};

export default AdminSettings;
