'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** One owner for choreography, pointer geometry and accessible motion preferences. */
export default function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add({ full: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)', fine: '(hover: hover) and (pointer: fine)' }, (match) => {
      const container = root.current!;
      const query = gsap.utils.selector(container);
      const select = (selector: string) => query(selector).filter((element: HTMLElement) => element.getClientRects().length > 0);
      const cleanup: (() => void)[] = [];
      const context = gsap.context(() => {
        if (!match.conditions?.full || paused) {
          gsap.from(select('h1, .hero-copy > p, .page-intro > p, .contact-copy > p'), { opacity: .65, duration: .15, clearProps: 'opacity' });
          return;
        }
        const intro = gsap.timeline({ defaults: { duration: .8, ease: 'power4.out', clearProps: 'transform,opacity' } });
        const lines = select('.motion-line > span');
        intro.from(select('.hero-heading > .eyebrow, .hero-copy > .eyebrow, .page-intro .eyebrow, .contact-copy > .eyebrow'), { y: 8, opacity: 0, duration: .5 }, 0);
        if (lines.length) intro.from(lines, { yPercent: 108, rotation: 2, stagger: .09, duration: .95 }, .06);
        intro.from(select('.hero-copy > p, .page-intro > p, .contact-copy > p'), { y: 16, opacity: 0 }, .28);
        const actions = select('.button-row > *, .project-form');
        if (actions.length) intro.from(actions, { y: 12, opacity: 0, stagger: .06 }, .36);
        const art = select('.hero-art');
        if (art.length) intro.from(art, { opacity: 0, duration: 1.2 }, .14);

        select('.section-heading, .service-grid, .project-grid, .steps, .values-grid, .service-details, .concept-details, .about-story, .faq-section, .cta, .lab-layout, .expertise-index, .studio-principles, .story-main, .engagement-strip').forEach((group: HTMLElement) => {
          const items = Array.from(group.children).filter(item => !item.classList.contains('about-art'));
          gsap.from(items, { y: 24, opacity: .3, duration: .75, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 94%', once: true }, clearProps: 'transform,opacity' });
        });

        select('.spatial-stage').forEach((scene: HTMLElement) => {
          const q = gsap.utils.selector(scene);
          const ambient = gsap.timeline({ repeat: -1, paused: true });
          ambient.to(q('.torus-spin'), { rotationZ: 360, duration: 48, ease: 'none' }, 0);
          ambient.to(q('.satellite-cube'), { rotationY: '+=360', duration: 48, ease: 'none' }, 0);
          ambient.to(q('.chrome-sphere'), { y: -16, duration: 4, repeat: 11, yoyo: true, ease: 'sine.inOut' }, 0);
          let visible = false;
          const sync = () => { if (visible && !document.hidden) ambient.play(); else ambient.pause(); };
          const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
          observer.observe(scene);
          document.addEventListener('visibilitychange', sync);
          cleanup.push(() => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); });
        });

        select('.chart').forEach((chart: HTMLElement) => {
          gsap.from(chart.children, { scaleY: 0, transformOrigin: 'bottom', duration: .8, stagger: .045, ease: 'power2.out', scrollTrigger: { trigger: chart, start: 'top 94%', once: true } });
        });
        select('.chat-window').forEach((chat: HTMLElement) => {
          gsap.from(chat.querySelectorAll('.chat-message'), { y: 10, opacity: .3, duration: .55, stagger: .12, scrollTrigger: { trigger: chat, start: 'top 94%', once: true }, clearProps: 'transform,opacity' });
        });
        if (progress.current) gsap.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .15 } });

        if (match.conditions?.fine) {
          // Geometry is cached on entry and invalidated on scroll/resize, not read on every move.
          select('.spatial-stage, .project-art, .system-visual').forEach((surface: HTMLElement) => {
            const spatial = surface.classList.contains('spatial-stage');
            const content = surface.querySelector<HTMLElement>(spatial ? '.spatial-rig' : '.demo-window, .chat-window, .system-core');
            if (!content) return;
            let bounds: DOMRect | undefined;
            let inside = false;
            const baseline = { x: Number(gsap.getProperty(content, 'x')), y: Number(gsap.getProperty(content, 'y')), rx: Number(gsap.getProperty(content, 'rotationX')), ry: Number(gsap.getProperty(content, 'rotationY')) };
            const x = gsap.quickTo(content, 'x', { duration: .7, ease: 'power3.out' });
            const y = gsap.quickTo(content, 'y', { duration: .7, ease: 'power3.out' });
            const rx = gsap.quickTo(content, 'rotationX', { duration: .8, ease: 'power3.out' });
            const ry = gsap.quickTo(content, 'rotationY', { duration: .8, ease: 'power3.out' });
            const enter = () => { inside = true; bounds = surface.getBoundingClientRect(); };
            const move = (event: PointerEvent) => {
              if (!bounds) return;
              const px = gsap.utils.clamp(-.5, .5, (event.clientX - bounds.left) / bounds.width - .5);
              const py = gsap.utils.clamp(-.5, .5, (event.clientY - bounds.top) / bounds.height - .5);
              x(baseline.x + px * (spatial ? 32 : 12)); y(baseline.y + py * (spatial ? 24 : 8));
              rx(baseline.rx - py * (spatial ? 34 : 8)); ry(baseline.ry + px * (spatial ? 40 : 10));
            };
            const reset = () => { x(baseline.x); y(baseline.y); rx(baseline.rx); ry(baseline.ry); };
            const leave = () => { inside = false; reset(); };
            const refresh = () => { if (inside) { bounds = surface.getBoundingClientRect(); reset(); } };
            surface.addEventListener('pointerenter', enter);
            surface.addEventListener('pointermove', move);
            surface.addEventListener('pointerleave', leave);
            window.addEventListener('scroll', refresh, { passive: true });
            window.addEventListener('resize', refresh);
            cleanup.push(() => { surface.removeEventListener('pointerenter', enter); surface.removeEventListener('pointermove', move); surface.removeEventListener('pointerleave', leave); window.removeEventListener('scroll', refresh); window.removeEventListener('resize', refresh); });
          });
        }
      }, container);
      return () => { cleanup.forEach(dispose => dispose()); context.revert(); };
    });
    return () => media.revert();
  }, [pathname, paused]);

  return <div ref={root} className="motion-root" data-motion={paused ? 'reduced' : 'full'}>
    <div ref={progress} className="reading-progress" aria-hidden="true" />
    {children}
    <button className="motion-toggle" type="button" aria-label="Pause decorative motion" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused ? <path d="m5 3 8 5-8 5Z"/> : <path d="M4 3h3v10H4zm5 0h3v10H9z"/>}</svg>
      {paused ? 'Motion paused' : 'Pause motion'}
    </button>
  </div>;
}
