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

const ProjectsSection = () => {
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

          {/* Card 1 */}
          <article className="project-card">
            <div className="thumb">
              <svg viewBox="0 0 300 180" preserveAspectRatio="none">
                <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#A855F7"/></linearGradient></defs>
                <polyline points="20,140 60,110 100,125 140,80 180,95 220,55 260,70" fill="none" stroke="url(#g1)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
                <circle cx="220" cy="55" r="4" fill="#A855F7"/>
                <circle cx="100" cy="125" r="4" fill="#6366F1"/>
                <line x1="20" y1="150" x2="280" y2="150" stroke="#2A2A35" strokeWidth="1"/>
              </svg>
            </div>
            <div className="card-body">
              <h3>Nexus Analytics</h3>
              <p className="desc">Real-time data visualization dashboard processing millions of events daily with sub-second latency.</p>
              <div className="tech-row"><Pill>React</Pill><Pill>TypeScript</Pill><Pill>WebGL</Pill></div>
              <div className="card-actions">
                <a href="#" className="btn btn-primary">View Demo</a>
                <a href="#" className="btn btn-secondary">Source Code</a>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="project-card">
            <div className="thumb">
              <svg viewBox="0 0 300 180" preserveAspectRatio="none">
                <defs><radialGradient id="g2"><stop offset="0%" stopColor="#A855F7" stopOpacity="0.9"/><stop offset="100%" stopColor="#6366F1" stopOpacity="0.2"/></radialGradient></defs>
                <circle cx="150" cy="90" r="6" fill="url(#g2)"/>
                <circle cx="100" cy="60" r="3" fill="#6366F1"/>
                <circle cx="200" cy="60" r="3" fill="#6366F1"/>
                <circle cx="90" cy="120" r="3" fill="#A855F7"/>
                <circle cx="210" cy="120" r="3" fill="#A855F7"/>
                <circle cx="150" cy="140" r="3" fill="#6366F1"/>
                <g stroke="#A855F7" strokeWidth="1" opacity="0.6">
                  <line x1="150" y1="90" x2="100" y2="60"/>
                  <line x1="150" y1="90" x2="200" y2="60"/>
                  <line x1="150" y1="90" x2="90" y2="120"/>
                  <line x1="150" y1="90" x2="210" y2="120"/>
                  <line x1="150" y1="90" x2="150" y2="140"/>
                </g>
              </svg>
            </div>
            <div className="card-body">
              <h3>CloudSync API</h3>
              <p className="desc">A distributed microservices architecture for seamless file synchronization across multiple edge nodes.</p>
              <div className="tech-row"><Pill>Node.js</Pill><Pill>Go</Pill><Pill>Docker</Pill></div>
              <div className="card-actions">
                <a href="#" className="btn btn-primary">View Demo</a>
                <a href="#" className="btn btn-secondary">Source Code</a>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="project-card">
            <div className="thumb">
              <svg viewBox="0 0 300 180" preserveAspectRatio="none">
                <rect x="30" y="40" width="60" height="44" rx="6" fill="none" stroke="#6366F1" strokeWidth="2"/>
                <rect x="100" y="60" width="60" height="60" rx="6" fill="none" stroke="#A855F7" strokeWidth="2"/>
                <rect x="170" y="35" width="60" height="50" rx="6" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.7"/>
                <rect x="105" y="68" width="20" height="6" rx="3" fill="#A855F7"/>
                <rect x="105" y="80" width="40" height="6" rx="3" fill="#2A2A35"/>
              </svg>
            </div>
            <div className="card-body">
              <h3>Aura Commerce</h3>
              <p className="desc">Headless e-commerce storefront focusing on extreme performance and highly optimized conversion funnels.</p>
              <div className="tech-row"><Pill>Next.js</Pill><Pill>Supabase</Pill><Pill>Stripe</Pill></div>
              <div className="card-actions">
                <a href="#" className="btn btn-primary">View Demo</a>
                <a href="#" className="btn btn-secondary">Source Code</a>
              </div>
            </div>
          </article>

          {/* Card 4 */}
          <article className="project-card">
            <div className="thumb">
              <svg viewBox="0 0 300 180" preserveAspectRatio="none">
                <rect x="40" y="50" width="220" height="90" rx="8" fill="#0B0B0F" stroke="#2A2A35"/>
                <circle cx="55" cy="62" r="3" fill="#EF4444"/>
                <circle cx="65" cy="62" r="3" fill="#F59E0B"/>
                <circle cx="75" cy="62" r="3" fill="#22C55E"/>
                <text x="50" y="90" fontFamily="monospace" fontSize="11" fill="#A855F7">$ devenv init</text>
                <text x="50" y="106" fontFamily="monospace" fontSize="11" fill="#6366F1">✓ environment ready</text>
                <rect x="50" y="116" width="8" height="12" fill="#6366F1" opacity="0.8"/>
              </svg>
            </div>
            <div className="card-body">
              <h3>DevEnvironment CLI</h3>
              <p className="desc">A robust command-line tool designed to standardize and accelerate local development environment setups across teams.</p>
              <div className="tech-row"><Pill>Rust</Pill><Pill>Bash</Pill><Pill>WASM</Pill></div>
              <div className="card-actions">
                <a href="#" className="btn btn-primary">View Docs</a>
                <a href="#" className="btn btn-secondary">Source Code</a>
              </div>
            </div>
          </article>

        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
