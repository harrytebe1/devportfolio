import React, { useEffect } from 'react';

const AdminToast = ({ show, type = 'success', message, onClose, duration = 3000 }) => {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show, duration, onClose]);

  return (
    <div className="toast-wrap" aria-live="polite">
      <div className={`toast ${type} ${show ? 'show' : ''}`}>
        {type === 'success' ? (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AdminToast;
