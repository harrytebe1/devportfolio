import React from 'react';
import { Link } from 'react-router-dom';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import { HoverBorderGradient } from '../ui/HoverBorderGradient';
import { motion } from 'framer-motion';
import { SparklesCore } from '../ui/Sparkles';
import { BackgroundGradient } from '../ui/BackgroundGradient';

const Pill = ({ children }) => (
  <HoverBorderGradient
    containerClassName="inline-block"
    className="px-3 py-1 font-mono text-[0.75rem] text-[var(--text-secondary)] rounded-full"
  >
    {children}
  </HoverBorderGradient>
);

const HeroSection = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-text">
            <span className="badge-available"><span className="dot" aria-hidden="true"></span>Available for work</span>
            <h1>
              <TextGenerateEffect words="Fullstack Developer" />
              <br />
              <span className="accent">
                <TextGenerateEffect words="in Progress" />
              </span>
            </h1>
            <p className="lead">Crafting functional, scalable, and aesthetically pleasing web applications. Bridging the gap between robust backend architecture and intuitive frontend experiences.</p>
            <div className="hero-ctas">
              <Link to="/projects" className="btn btn-primary">View Projects</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Me</Link>
            </div>
            <div className="hero-divider"></div>
            <div className="tech-badges">
              <Pill>React</Pill>
              <Pill>Node.js</Pill>
              <Pill>TypeScript</Pill>
              <Pill>Tailwind</Pill>
            </div>
          </div>

          <div className="code-panel">
            <div className="code-panel-glow" aria-hidden="true"></div>
            <div className="traffic-lights"><span className="red"></span><span className="yellow"></span><span className="green"></span></div>
            <pre dangerouslySetInnerHTML={{
              __html: `<span class="kw">const</span> developer = {
  name: <span class="str">'John Doe'</span>,
  role: <span class="str">'Fullstack Engineer'</span>,
  focus: [<span class="str">'UX/UI'</span>, <span class="str">'Scalability'</span>],
  status: <span class="lit">true</span>
};

<span class="kw">function</span> <span class="fn">buildFuture</span>() {
  return developer.focus.map(f =&gt; create(f));
}` }}></pre>
          </div>
        </div>

        <motion.div 
          className="scroll-indicator" 
          aria-hidden="true"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </section>

      <section className="about relative overflow-hidden" id="about">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#A855F7"
          />
        </div>
        <div className="about-inner relative z-10">
          <motion.div 
            className="avatar-container" 
            role="img" 
            aria-label="Profile photo placeholder"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <BackgroundGradient className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] flex items-center justify-center bg-[#0B0B0F]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#6366F1'}}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </BackgroundGradient>
          </motion.div>
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2><TextGenerateEffect words="About Me" /></h2>
            <p>As a Computer Science student, I am driven by a deep sense of technical rigor and a passion for building high-performance systems that solve real-world problems. My academic journey has equipped me with the foundational knowledge to navigate complex architectures while maintaining a user-centric perspective. I thrive in environments where performance and precision meet, constantly pushing the boundaries of what modern web technology can achieve.</p>
            <a href="#" className="btn btn-gradient-outline flex items-center gap-2">
              Download CV
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
