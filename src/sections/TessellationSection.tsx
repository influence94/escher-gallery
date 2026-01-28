import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TessellationSection() {
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
        { x: '60vw', scale: 1.18, opacity: 0.6 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(card,
        { x: '50vw', opacity: 0, rotate: 2 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0.05
      );

      scrollTl.fromTo([label, caption],
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, ease: 'none' },
        0.10
      );

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(image,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
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
      className="section-pinned bg-escher-primary z-20"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/tessellation_field.jpg"
        alt="Tessellation Pattern"
        className="absolute inset-0 w-full h-full object-cover img-escher z-0"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-r from-escher-bg/70 via-transparent to-escher-bg/50"
      />

      {/* Top Left Label */}
      <span
        ref={labelRef}
        className="absolute font-mono text-xs tracking-[0.12em] uppercase text-escher-text-muted left-[4vw] top-[4vh] z-10"
      >
        TESSERAE
      </span>

      {/* Right Info Card */}
      <div
        ref={cardRef}
        className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-[min(38vw,520px)] z-10"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-escher-text mb-4">
          Tessellation
        </h2>
        <p className="text-escher-text-muted leading-relaxed mb-6">
          Interlocking creatures fill the plane without gaps or overlaps. What begins as geometry becomes life—fish become birds, darkness becomes light.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-escher-accent font-mono text-sm tracking-wide hover:gap-3 transition-all"
        >
          Explore the pattern
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Bottom Center Caption */}
      <span
        ref={captionRef}
        className="absolute font-mono text-xs tracking-wide text-escher-text-muted left-1/2 bottom-[6vh] -translate-x-1/2 z-10"
      >
        Sky & Water I — 1938
      </span>
    </section>
  );
}
