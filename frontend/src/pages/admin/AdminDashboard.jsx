import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-content">
      <p className="welcome-text">Welcome back — here's a quick overview of your portfolio content.</p>

      <div className="stat-grid">
        <div className="stat-card">
          <div>
            <div className="num">4</div>
            <div className="label">PROJECTS</div>
          </div>
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="num">16</div>
            <div className="label">SKILLS</div>
          </div>
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="num">2</div>
            <div className="label">NEW MESSAGES</div>
          </div>
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
      </div>

      <div className="quick-links">
        <Link to="/admin/projects" className="btn btn-primary">+ Add Project</Link>
        <Link to="/admin/skills" className="btn btn-secondary">+ Add Skill</Link>
        <Link to="/admin/messages" className="btn btn-secondary">View Messages</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
