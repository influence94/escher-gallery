import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, Globe, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', notes: '' });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Flowing section reveal animation
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

      // Form fields stagger reveal
      const formFields = content.querySelectorAll('.form-field');
      gsap.fromTo(formFields,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will respond within 2-3 business days.');
    setFormData({ name: '', email: '', notes: '' });
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-escher-bg-alt z-[70] min-h-screen"
      style={{ padding: '8vh 0 10vh' }}
    >
      <div 
        ref={contentRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-escher-text mb-6">
              Commission a piece
            </h2>
            <p className="text-escher-text-muted leading-relaxed mb-8">
              Available for limited collaborations, exhibition design, and bespoke geometric artwork.
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              <a 
                href="mailto:hello@escherslabyrinth.studio"
                className="flex items-center gap-3 text-escher-text hover:text-escher-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-mono text-sm">hello@escherslabyrinth.studio</span>
              </a>

              <div className="flex items-center gap-6 pt-4">
                <a 
                  href="#"
                  className="flex items-center gap-2 text-escher-text-muted hover:text-escher-accent transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="font-mono text-xs tracking-wide">Instagram</span>
                </a>
                <a 
                  href="#"
                  className="flex items-center gap-2 text-escher-text-muted hover:text-escher-accent transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-mono text-xs tracking-wide">Behance</span>
                </a>
                <a 
                  href="#"
                  className="flex items-center gap-2 text-escher-text-muted hover:text-escher-accent transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-mono text-xs tracking-wide">Are.na</span>
                </a>
              </div>
            </div>

            {/* Small Print */}
            <p className="mt-12 text-escher-text-muted text-sm">
              Typical response time: 2–3 business days.
            </p>
          </div>

          {/* Right Column - Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-field">
              <label className="block font-mono text-xs tracking-wide text-escher-text-muted mb-2">
                NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-escher-text-muted/30 py-3 text-escher-text focus:outline-none focus:border-escher-accent transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-field">
              <label className="block font-mono text-xs tracking-wide text-escher-text-muted mb-2">
                EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-escher-text-muted/30 py-3 text-escher-text focus:outline-none focus:border-escher-accent transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-field">
              <label className="block font-mono text-xs tracking-wide text-escher-text-muted mb-2">
                PROJECT NOTES
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-escher-text-muted/30 py-3 text-escher-text focus:outline-none focus:border-escher-accent transition-colors resize-none"
                placeholder="Tell us about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className="form-field btn-pill flex items-center gap-2 text-escher-text font-mono text-sm tracking-wide mt-8"
            >
              Send inquiry
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-escher-text-muted/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-display text-lg font-semibold text-escher-text">
              ESCHER'S LABYRINTH
            </span>
            <span className="font-mono text-xs text-escher-text-muted">
              © 2026 All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
