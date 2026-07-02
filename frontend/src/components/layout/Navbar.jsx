import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Handle hash scrolling from other pages
  useEffect(() => {
    if (location.hash === '#about') {
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const currentPath = location.pathname;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about', isScroll: true },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="logo">DevPortfolio</Link>
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => {
                  if (link.name === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  if (link.isScroll && currentPath === '/') {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                aria-current={currentPath === (link.href === '/#about' ? '/#about' : link.href) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="nav-right">
            <Link to="/contact" className="btn btn-primary" style={{ display: 'none' }} id="desktopHire">Hire Me</Link>
            <button 
              className="hamburger" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open menu" 
              aria-expanded={isOpen}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <nav className="mobile-menu-links" aria-label="Mobile primary">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => {
                  if (link.name === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  if (link.isScroll && currentPath === '/') {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsOpen(false);
                }}
                aria-current={currentPath === (link.href === '/#about' ? '/#about' : link.href) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-cta">
            <Link to="/contact" className="btn btn-primary" onClick={() => setIsOpen(false)}>Hire Me</Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
