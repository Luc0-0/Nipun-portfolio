import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/Luc0-0' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nipun-sujesh' },
  { name: 'Instagram', url: 'https://instagram.com/nipun0__0' },
];

const NAV_LINKS = [
  { name: 'Work', path: '/work' },
  { name: 'Writing', path: '/writing' },
  { name: 'About', path: '/about' },
  { name: 'Timeline', path: '/timeline' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 bg-[var(--color-bg-primary)]">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-display font-medium text-[var(--color-text-primary)] mb-4 hover:text-[var(--color-accent)] transition-colors inline-block"
            >
              NIPUN SUJESH
            </Link>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm">
              AI Engineer building production-ready systems. Specializing in NLP, 
              computer vision, and full-stack deployment.
            </p>
            
            {/* Resume Download */}
            <motion.a
              href="/images/NIPUN SUJESH_compressed.pdf"
              download="Nipun_Sujesh_Resume.pdf"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors"
              whileHover={{ x: 5 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium text-[var(--color-text-muted)] tracking-wider mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-sm font-medium text-[var(--color-text-muted)] tracking-wider mb-4">
              CONNECT
            </h4>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:nipunsujesh28@gmail.com"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {currentYear} Nipun Sujesh. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a
              href="https://www.nipun.space"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              www.nipun.space
            </a>
            
            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="Back to top"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
