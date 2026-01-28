import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitScreenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightImageRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const leftCaptionRef = useRef<HTMLSpanElement>(null);
  const rightCaptionRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftImage = leftImageRef.current;
    const rightImage = rightImageRef.current;
    const label = labelRef.current;
    const leftCaption = leftCaptionRef.current;
    const rightCaption = rightCaptionRef.current;

    if (!section || !leftImage || !rightImage || !label || !leftCaption || !rightCaption) return;

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
      scrollTl.fromTo(leftImage,
        { x: '-60vw', opacity: 0.7 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(rightImage,
        { x: '60vw', opacity: 0.7 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(label,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, ease: 'none' },
        0.10
      );

      scrollTl.fromTo([leftCaption, rightCaption],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: 'none', stagger: 0.05 },
        0.12
      );

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(leftImage,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(rightImage,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo([label, leftCaption, rightCaption],
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
      className="section-pinned bg-escher-primary z-40"
    >
      {/* Left Panel Image */}
      <div 
        className="absolute overflow-hidden"
        style={{ left: 0, top: 0, width: '50vw', height: '100vh', zIndex: 1 }}
      >
        <img
          ref={leftImageRef}
          src="/day_night_left.jpg"
          alt="Day and Night"
          className="w-full h-full object-cover img-escher"
        />
      </div>

      {/* Right Panel Image */}
      <div 
        className="absolute overflow-hidden"
        style={{ left: '50vw', top: 0, width: '50vw', height: '100vh', zIndex: 1 }}
      >
        <img
          ref={rightImageRef}
          src="/relativity_right.jpg"
          alt="Relativity"
          className="w-full h-full object-cover img-escher"
        />
      </div>

      {/* Center Divider Line */}
      <div 
        className="absolute top-0 bottom-0 w-px"
        style={{ 
          left: '50%', 
          background: 'linear-gradient(to bottom, transparent, rgba(242, 245, 255, 0.2), transparent)',
          zIndex: 3 
        }}
      />

      {/* Top Right Label */}
      <span
        ref={labelRef}
        className="absolute font-mono text-xs tracking-[0.12em] uppercase text-escher-text-muted"
        style={{ right: '4vw', top: '4vh', zIndex: 6 }}
      >
        COLLECTION
      </span>

      {/* Bottom Left Caption */}
      <span
        ref={leftCaptionRef}
        className="absolute font-mono text-xs tracking-wide text-escher-text-muted"
        style={{ left: '4vw', bottom: '6vh', zIndex: 6 }}
      >
        Day and Night — 1938
      </span>

      {/* Bottom Right Caption */}
      <span
        ref={rightCaptionRef}
        className="absolute font-mono text-xs tracking-wide text-escher-text-muted"
        style={{ right: '4vw', bottom: '6vh', zIndex: 6 }}
      >
        Relativity — 1953
      </span>
    </section>
  );
}
