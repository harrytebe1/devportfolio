import React, { useState, useEffect } from 'react';
import { HoverBorderGradient } from '../ui/HoverBorderGradient';
import api from '../../lib/axios';

const Pill = ({ children }) => (
  <HoverBorderGradient
    containerClassName="inline-block"
    className="px-3 py-1 font-mono text-[0.75rem] text-[var(--text-secondary)] rounded-full"
  >
    {children}
  </HoverBorderGradient>
);

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        // Only show featured projects on the public page
        const featuredProjects = res.data.data.filter(p => p.is_featured);
        setProjects(featuredProjects);
      } catch (error) {
        console.error("Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <section className="page-header" id="projects">
        <div className="page-header-inner">
          <h1>Projects</h1>
          <p>Every project I've built — from full-stack platforms to developer tooling, focused on performance and clean architecture.</p>
        </div>
      </section>

      <section className="projects-section">
        <div className="projects-grid">
          {isLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>Loading projects...</div>
          ) : projects.length > 0 ? (
            projects.map(project => (
              <article className="project-card" key={project.id}>
                <div className="thumb">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <svg viewBox="0 0 300 180" preserveAspectRatio="none">
                      <rect x="0" y="0" width="300" height="180" fill="#2A2A35" />
                    </svg>
                  )}
                </div>
                <div className="card-body">
                  <h3>{project.title}</h3>
                  <p className="desc">{project.description}</p>
                  <div className="tech-row">
                    {project.technologies && project.technologies.map((t, idx) => (
                      <Pill key={idx}>{t}</Pill>
                    ))}
                  </div>
                  <div className="card-actions">
                    {project.live_url && (
                      <a href={project.live_url} className="btn btn-primary" target="_blank" rel="noreferrer">View Demo</a>
                    )}
                    {project.repo_url && (
                      <a href={project.repo_url} className="btn btn-secondary" target="_blank" rel="noreferrer">Source Code</a>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>No featured projects found.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
