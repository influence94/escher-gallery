import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PortalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const portal = portalRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !portal || !headline || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(portal,
        { scale: 0.22, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(image,
        { scale: 1.12, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo([headline, cta],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none', stagger: 0.05 },
        0.10
      );

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(portal,
        { scale: 1, opacity: 1 },
        { scale: 3.2, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(image,
        { scale: 1, x: 0 },
        { scale: 1.10, x: '-8vw', ease: 'none' },
        0.70
      );

      scrollTl.fromTo([headline, cta],
        { opacity: 1, y: 0 },
        { opacity: 0, y: -12, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-escher-primary z-30"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/portal_sphere.jpg"
        alt="Recursive Portal"
        className="absolute inset-0 w-full h-full object-cover img-escher z-0"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,12,15,0.6)_100%)]"
      />

      {/* Portal Circle */}
      <div
        ref={portalRef}
        className="absolute rounded-full overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34vw] h-[34vw] max-w-[480px] max-h-[480px] z-30 border border-escher-accent/20 shadow-[0_0_80px_rgba(185,196,255,0.15),inset_0_0_60px_rgba(185,196,255,0.1)]"
      >
        <img
          src="/portal_sphere.jpg"
          alt="Portal"
          className="w-full h-full object-cover img-escher scale-110"
        />
      </div>

      {/* Center Headline */}
      <h2
        ref={headlineRef}
        className="absolute font-display font-bold text-escher-text text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(36px,5vw,72px)] tracking-[-0.02em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-40"
      >
        RECURSION
      </h2>

      {/* Bottom CTA */}
      <button
        ref={ctaRef}
        className="absolute btn-pill flex items-center gap-2 text-escher-text font-mono text-sm tracking-wide left-1/2 bottom-[10vh] -translate-x-1/2 z-50"
      >
        Step through
        <ArrowRight className="w-4 h-4" />
      </button>
    </section>
  );
}
