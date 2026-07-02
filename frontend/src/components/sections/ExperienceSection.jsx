import React from 'react';
import { Timeline } from '../ui/Timeline';
import { Link } from 'react-router-dom';
import { HoverBorderGradient } from '../ui/HoverBorderGradient';

const Pill = ({ children }) => (
  <HoverBorderGradient
    containerClassName="inline-block"
    className="px-3 py-1 font-mono text-[0.75rem] text-[var(--text-secondary)] rounded-full"
  >
    {children}
  </HoverBorderGradient>
);

const ExperienceSection = () => {
  const experienceData = [
    {
      title: "JUNE 2025 — PRESENT",
      content: (
        <div className="timeline-card mb-12">
          <h3>Fullstack Developer Intern</h3>
          <div className="timeline-org">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            TechSolutions Inc.
          </div>
          <p className="timeline-desc">Developed and maintained scalable web applications using React and Node.js. Optimized database queries in PostgreSQL, leading to a 30% improvement in load times. Collaborated with the UI/UX team to implement responsive designs.</p>
          <div className="timeline-tags"><Pill>React</Pill><Pill>Node.js</Pill><Pill>PostgreSQL</Pill></div>
        </div>
      )
    },
    {
      title: "JAN 2024 — MAY 2024",
      content: (
        <div className="timeline-card mb-12">
          <h3>Web Development Bootcamp</h3>
          <div className="timeline-org">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            Code Academy
          </div>
          <p className="timeline-desc">Completed an intensive 500+ hour program focused on modern frontend frameworks and backend architecture. Built 5+ full-stack projects using the MERN stack.</p>
          <div className="timeline-tags"><Pill>MERN Stack</Pill><Pill>Architecture</Pill><Pill>Full Stack</Pill></div>
        </div>
      )
    },
    {
      title: "SEPT 2022 — PRESENT",
      content: (
        <div className="timeline-card mb-12">
          <h3>Computer Science Student</h3>
          <div className="timeline-org">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>
            University of Technology
          </div>
          <p className="timeline-desc">Focusing on software engineering principles, algorithms, and data structures. Maintaining a strong academic record while actively participating in competitive programming.</p>
          <div className="timeline-tags"><Pill>Algorithms</Pill><Pill>Data Structures</Pill><Pill>Software Engineering</Pill></div>
          <span className="gpa-badge">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.8 5.5 21 7.5 13.5 2 9 9 9"/></svg>
            GPA: 4.9 / 5.0
          </span>
        </div>
      )
    }
  ];

  return (
    <>
      <section className="page-header" id="experience">
        <div className="page-header-inner">
          <h1>Experience</h1>
          <p>A chronological look at my professional growth, academic milestones, and the technical expertise I've built along the way.</p>
        </div>
      </section>

      <section className="timeline-section" style={{ padding: 0 }}>
        <Timeline data={experienceData} />
        
        <div className="closing-cta">
          <h3>Ready to build something great together?</h3>
          <p>Let's talk about how I can contribute to your team.</p>
          <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
        </div>
      </section>
    </>
  );
};

export default ExperienceSection;
