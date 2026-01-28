import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const label = labelRef.current;
    const headline1 = headline1Ref.current;
    const headline2 = headline2Ref.current;
    const body = bodyRef.current;

    if (!section || !image || !label || !headline1 || !headline2 || !body) return;

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
      scrollTl.fromTo(image,
        { scale: 1.18, opacity: 0.6, rotate: -1.5 },
        { scale: 1, opacity: 1, rotate: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo([headline1, headline2],
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none', stagger: 0.03 },
        0.05
      );

      scrollTl.fromTo(body,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(label,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, ease: 'none' },
        0.10
      );

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(image,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 1.06, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo([headline1, headline2],
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.70
      );

      scrollTl.fromTo(body,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(label,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned bg-escher-primary z-50"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/wireframe_geometry.jpg"
        alt="Wireframe Geometry"
        className="absolute inset-0 w-full h-full object-cover img-escher"
        style={{ zIndex: 1 }}
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, rgba(11, 12, 15, 0.5) 0%, rgba(11, 12, 15, 0.8) 100%)'
        }}
      />

      {/* Top Left Label */}
      <span
        ref={labelRef}
        className="absolute font-mono text-xs tracking-[0.12em] uppercase text-escher-text-muted"
        style={{ left: '4vw', top: '4vh', zIndex: 6 }}
      >
        MANIFESTO
      </span>

      {/* Center Headline */}
      <div 
        className="absolute text-center"
        style={{ 
          left: '50%', 
          top: '52%', 
          transform: 'translate(-50%, -50%)',
          zIndex: 4 
        }}
      >
        <h2
          ref={headline1Ref}
          className="font-display font-bold text-escher-text"
          style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            textShadow: '0 4px 40px rgba(0, 0, 0, 0.8)'
          }}
        >
          GEOMETRY
        </h2>
        <h2
          ref={headline2Ref}
          className="font-display font-bold text-escher-text mt-2"
          style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            textShadow: '0 4px 40px rgba(0, 0, 0, 0.8)'
          }}
        >
          IS ETERNAL
        </h2>
      </div>

      {/* Bottom Paragraph */}
      <p
        ref={bodyRef}
        className="absolute text-center text-escher-text-muted max-w-2xl px-4"
        style={{ 
          left: '50%', 
          bottom: '10vh', 
          transform: 'translateX(-50%)',
          fontSize: 'clamp(14px, 1.2vw, 18px)',
          lineHeight: 1.7,
          zIndex: 5 
        }}
      >
        Mathematics and art are not opposites. They are two languages describing the same truth: structure, symmetry, and the infinite.
      </p>
    </section>
  );
}
