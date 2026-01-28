import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Collection', href: '#collection' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (about 100vh)
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollY > heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      {/* Wordmark - Always visible */}
      <div
        className="fixed top-0 left-0 right-0 z-nav pointer-events-none p-[4vh_4vw]"
      >
        <div className="flex justify-between items-start">
          {/* Logo */}
          <span
            className="font-display text-sm font-semibold tracking-wide text-escher-text pointer-events-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            ESCHER'S LABYRINTH
          </span>

          {/* Navigation Links */}
          <nav
            className={`flex items-center gap-6 pointer-events-auto transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`nav-link font-mono text-xs tracking-[0.08em] uppercase transition-colors ${activeSection === link.href.replace('#', '')
                    ? 'text-escher-accent'
                    : 'text-escher-text-muted hover:text-escher-text'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
