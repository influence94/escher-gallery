import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PerspectiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const label = labelRef.current;
    const card = cardRef.current;
    const caption = captionRef.current;

    if (!section || !image || !label || !card || !caption) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(image,
        { x: '60vw', scale: 1.12, opacity: 0.7 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(card,
        { x: '40vw', scale: 0.86, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(label,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, ease: 'none' },
        0.10
      );

      scrollTl.fromTo(caption,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: 'none' },
        0.12
      );

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(image,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo([label, caption],
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
      className="section-pinned bg-escher-primary z-[60]"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/perspective_grid_room.jpg"
        alt="Perspective Grid"
        className="absolute inset-0 w-full h-full object-cover img-escher"
        style={{ zIndex: 1 }}
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(11, 12, 15, 0.6) 100%)'
        }}
      />

      {/* Top Left Label */}
      <span
        ref={labelRef}
        className="absolute font-mono text-xs tracking-[0.12em] uppercase text-escher-text-muted"
        style={{ left: '4vw', top: '4vh', zIndex: 6 }}
      >
        PERSPECTIVE
      </span>

      {/* Center Framed Card */}
      <div
        ref={cardRef}
        className="absolute rounded-lg overflow-hidden"
        style={{
          left: '50%',
          top: '52%',
          transform: 'translate(-50%, -50%)',
          width: 'min(44vw, 640px)',
          aspectRatio: '4/3',
          zIndex: 4,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(242, 245, 255, 0.15)'
        }}
      >
        <img
          src="/convex_concave_focus.jpg"
          alt="Convex and Concave"
          className="w-full h-full object-cover img-escher"
        />
      </div>

      {/* Bottom Center Caption */}
      <span
        ref={captionRef}
        className="absolute font-mono text-xs tracking-wide text-escher-text-muted"
        style={{ 
          left: '50%', 
          bottom: '6vh', 
          transform: 'translateX(-50%)',
          zIndex: 6 
        }}
      >
        Convex and Concave — 1955
      </span>
    </section>
  );
}
