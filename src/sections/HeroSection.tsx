import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const frame1Ref = useRef<HTMLDivElement>(null);
  const frame2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const frame1 = frame1Ref.current;
    const frame2 = frame2Ref.current;

    if (!section || !image || !headline || !subhead || !cta || !frame1 || !frame2) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline();

      loadTl
        .fromTo(image,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo([frame1, frame2],
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', stagger: 0.1 },
          '-=0.8'
        )
        .fromTo(headline.children,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.04 },
          '-=0.6'
        )
        .fromTo(subhead,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(cta,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible state when scrolling back
            gsap.set([headline, subhead, cta], { opacity: 1, x: 0, y: 0 });
            gsap.set(image, { opacity: 1, scale: 1, x: 0 });
          }
        }
      });

      // ENTRANCE (0% - 30%): Hold state (already animated on load)
      // SETTLE (30% - 70%): Static viewing
      // EXIT (70% - 100%): Elements exit

      // Headline exit
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Subhead exit
      scrollTl.fromTo(subhead,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // CTA exit
      scrollTl.fromTo(cta,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Image exit
      scrollTl.fromTo(image,
        { scale: 1, x: 0 },
        { scale: 1.08, x: '6vw', ease: 'none' },
        0.70
      );

      // Frames exit
      scrollTl.fromTo([frame1, frame2],
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
      className="section-pinned bg-escher-primary z-10"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/staircase_hero.jpg"
        alt="Impossible Staircase"
        className="absolute inset-0 w-full h-full object-cover img-escher z-0"
      />

      {/* Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,12,15,0.4)_100%)]"
      />

      {/* Sketch Frames */}
      <div
        ref={frame1Ref}
        className="absolute sketch-frame pointer-events-none inset-[10vh_10vw] border border-escher-text/15 rounded z-20"
      />
      <div
        ref={frame2Ref}
        className="absolute sketch-frame pointer-events-none inset-[14vh_14vw] border border-escher-text/10 rounded z-20"
      />

      {/* Content Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-40"
      >
        {/* Micro Label */}
        <span className="font-mono text-xs tracking-[0.12em] uppercase text-escher-text-muted mb-6">
          Scroll to Explore
        </span>

        {/* Headline */}
        <div ref={headlineRef} className="text-center">
          <h1 className="font-display text-[clamp(44px,6vw,84px)] font-bold text-escher-text leading-[0.95] tracking-[-0.02em]">
            IMPOSSIBLE
          </h1>
          <h1 className="font-display text-[clamp(44px,6vw,84px)] font-bold text-escher-text leading-[0.95] tracking-[-0.02em]">
            ARCHITECTURE
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="mt-6 text-center text-escher-text-muted max-w-xl px-4 text-[clamp(14px,1.2vw,18px)]"
        >
          A digital exhibition of infinite staircases, recursive worlds, and tessellated dreams.
        </p>
      </div>

      {/* CTA Button */}
      <button
        ref={ctaRef}
        className="absolute btn-pill flex items-center gap-2 text-escher-text font-mono text-sm tracking-wide left-1/2 bottom-[7vh] -translate-x-1/2 z-50"
      >
        Enter the gallery
        <ArrowDown className="w-4 h-4" />
      </button>
    </section>
  );
}
