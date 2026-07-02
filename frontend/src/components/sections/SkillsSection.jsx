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

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data.data);
      } catch (error) {
        console.error("Failed to fetch skills");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const getSkillsByCategory = (category) => skills.filter(s => s.category.toLowerCase() === category.toLowerCase());

  return (
    <>
      <section className="page-header" id="skills">
        <div className="page-header-inner">
          <h1>Skills</h1>
          <p>The languages, frameworks, and tools I use to build reliable, scalable software.</p>
        </div>
      </section>

      <section className="skills-section">
        <div className="skills-inner">

          {isLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading skills...</div>
          ) : (
            <>
              <div className="grid-3">
                <div className="card">
                  <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
                  <h3>Frontend</h3>
                  <div className="pill-row">
                    {getSkillsByCategory('Frontend').length > 0 ? getSkillsByCategory('Frontend').map(s => (
                      <Pill key={s.id}>{s.name}</Pill>
                    )) : <span className="text-[var(--text-secondary)] text-sm">No frontend skills added yet.</span>}
                  </div>
                  <p className="card-caption">Building high-fidelity, motion-rich user interfaces.</p>
                </div>

                <div className="card">
                  <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div>
                  <h3>Backend</h3>
                  <div className="pill-row">
                    {getSkillsByCategory('Backend').length > 0 ? getSkillsByCategory('Backend').map(s => (
                      <Pill key={s.id}>{s.name}</Pill>
                    )) : <span className="text-[var(--text-secondary)] text-sm">No backend skills added yet.</span>}
                  </div>
                  <p className="card-caption">Architecting scalable APIs and distributed systems.</p>
                </div>

                <div className="card">
                  <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                  <h3>Database</h3>
                  <div className="pill-row">
                    {getSkillsByCategory('Database').length > 0 ? getSkillsByCategory('Database').map(s => (
                      <Pill key={s.id}>{s.name}</Pill>
                    )) : <span className="text-[var(--text-secondary)] text-sm">No database skills added yet.</span>}
                  </div>
                  <p className="card-caption">Designing robust schemas and optimizing query performance.</p>
                </div>
              </div>

              <div className="grid-2">
                <div className="card">
                  <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6M4.2 4.2l4.2 4.2m7.2 7.2 4.2 4.2M1 12h6m10 0h6M4.2 19.8l4.2-4.2m7.2-7.2 4.2-4.2"/></svg></div>
                  <h3>Tools & Other</h3>
                  <div className="pill-row">
                    {getSkillsByCategory('Tools').concat(getSkillsByCategory('Other')).length > 0 ? getSkillsByCategory('Tools').concat(getSkillsByCategory('Other')).map(s => (
                      <Pill key={s.id}>{s.name}</Pill>
                    )) : <span className="text-[var(--text-secondary)] text-sm">No other skills added yet.</span>}
                  </div>
                  <p className="card-caption">CI/CD pipelines, DevOps, and cloud-native workflows.</p>
                </div>

                <div className="card">
                  <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                  <h3>Core Qualities</h3>
                  <ul className="quality-list">
                    <li><span className="dot"></span>Problem Solving</li>
                    <li><span className="dot"></span>Clean Code & SOLID Principles</li>
                    <li><span className="dot"></span>Technical Writing</li>
                    <li><span className="dot"></span>System Design</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          <div className="banner">
            <div>
              <h3>Always Learning</h3>
              <p>Currently exploring the intersection of WebAssembly and edge computing — building on a philosophy of technical rigor and a commitment to code quality.</p>
            </div>
            <div className="stat-row">
              <div className="stat"><div className="num">12+</div><div className="label">PROJECTS BUILT</div></div>
              <div className="stat"><div className="num">{skills.length || '3'}</div><div className="label">CORE SKILLS</div></div>
              <div className="stat"><div className="num">4.9</div><div className="label">GPA</div></div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default SkillsSection;
