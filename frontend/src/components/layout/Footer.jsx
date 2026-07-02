import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  const handleSecretClick = () => {
    clickCount.current += 1;
    
    if (clickCount.current === 3) {
      navigate('/admin/login');
      clickCount.current = 0;
    }

    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 500); // 500ms time window for 3 clicks
  };

  return (
    <footer>
      <div className="footer-inner">
        <span className="logo" style={{ fontSize: '1.05rem' }}>DevPortfolio</span>
        <div className="footer-links">
          <a href="#">Github</a>
          <a href="#">LinkedIn</a>
          <a href="#">Source Code</a>
        </div>
        <span 
          className="footer-copy cursor-default select-none" 
          onClick={handleSecretClick}
          title="© DevPortfolio"
        >
          © {new Date().getFullYear()} DevPortfolio. Built with precision.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
