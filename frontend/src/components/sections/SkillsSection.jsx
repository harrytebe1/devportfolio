import React from 'react';
import { HoverBorderGradient } from '../ui/HoverBorderGradient';

const Pill = ({ children }) => (
  <HoverBorderGradient
    containerClassName="inline-block"
    className="px-3 py-1 font-mono text-[0.75rem] text-[var(--text-secondary)] rounded-full"
  >
    {children}
  </HoverBorderGradient>
);

const SkillsSection = () => {
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

          <div className="grid-3">
            <div className="card">
              <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <h3>Languages</h3>
              <div className="pill-row">
                <Pill>TypeScript</Pill>
                <Pill>JavaScript</Pill>
                <Pill>Python</Pill>
                <Pill>Rust</Pill>
                <Pill>SQL</Pill>
                <Pill>HTML/CSS</Pill>
              </div>
              <p className="card-caption">Primary focus on strongly typed and performance-oriented languages.</p>
            </div>

            <div className="card">
              <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div>
              <h3>Frameworks</h3>
              <div className="pill-row">
                <Pill>React</Pill>
                <Pill>Next.js</Pill>
                <Pill>Node.js</Pill>
                <Pill>Express</Pill>
                <Pill>Tailwind CSS</Pill>
                <Pill>Framer Motion</Pill>
              </div>
              <p className="card-caption">Building scalable backends and high-fidelity, motion-rich frontends.</p>
            </div>

            <div className="card">
              <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
              <h3>Tools & Infra</h3>
              <div className="pill-row">
                <Pill>Docker</Pill>
                <Pill>Git</Pill>
                <Pill>AWS</Pill>
                <Pill>PostgreSQL</Pill>
                <Pill>Redis</Pill>
                <Pill>Vercel</Pill>
              </div>
              <p className="card-caption">CI/CD pipelines and cloud-native deployment workflows.</p>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <div className="card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6M4.2 4.2l4.2 4.2m7.2 7.2 4.2 4.2M1 12h6m10 0h6M4.2 19.8l4.2-4.2m7.2-7.2 4.2-4.2"/></svg></div>
              <h3>Specialized Knowledge</h3>
              <div className="pill-row">
                <Pill>Machine Learning</Pill>
                <Pill>Distributed Systems</Pill>
                <Pill>Cryptography</Pill>
                <Pill>Computer Vision</Pill>
              </div>
              <p className="card-caption">Academic theory combined with hands-on implementation experience.</p>
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

          <div className="banner">
            <div>
              <h3>Always Learning</h3>
              <p>Currently exploring the intersection of WebAssembly and edge computing — building on a philosophy of technical rigor and a commitment to code quality.</p>
            </div>
            <div className="stat-row">
              <div className="stat"><div className="num">12+</div><div className="label">PROJECTS BUILT</div></div>
              <div className="stat"><div className="num">3</div><div className="label">OPEN SOURCE</div></div>
              <div className="stat"><div className="num">4.9</div><div className="label">GPA</div></div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default SkillsSection;
