'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** A single, scoped motion owner. Route changes and preference changes revert everything. */
export default function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const container = root.current!;
      const select = gsap.utils.selector(container);
      const cleanup: (() => void)[] = [];
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { duration: .4, ease: 'power3.out' } });
        const heading = select('.hero-copy h1, .page-intro h1, .contact-copy h1');
        const kicker = select('.hero-copy > .eyebrow, .page-intro > .eyebrow, .contact-copy > .eyebrow');
        const copy = select('.hero-copy > p, .page-intro > p, .contact-copy > p');
        if (kicker.length) intro.from(kicker, { y: 8 }, 0);
        if (heading.length) intro.from(heading, { y: 20, duration: .45 }, .04);
        if (copy.length) intro.from(copy, { y: 12 }, .12);
        const actions = select('.button-row > *, .hero-note, .project-form');
        if (actions.length) intro.from(actions, { y: 10, stagger: .04 }, .18);
        const art = select('.hero-art');
        if (art.length) intro.from(art, { scale: .97, duration: .55 }, .06);

        // Native scroll stays native. Sections enter once, without pinning or hidden links.
        select('.section-heading, .service-grid, .project-grid, .steps, .values-grid, .service-details, .concept-details, .about-story, .faq-section, .cta').forEach((group: HTMLElement) => {
          const items = Array.from(group.children);
          gsap.from(items, {
            y: 16, duration: .4, stagger: .04, ease: 'power3.out',
            scrollTrigger: { trigger: group, start: 'top 92%', once: true },
            clearProps: 'transform,opacity',
          });
        });

        // Stop ambient work when its scene is off-screen or the document is hidden.
        select('.hero-art, .about-art').forEach((scene: HTMLElement) => {
          const q = gsap.utils.selector(scene);
          const ambient = gsap.timeline({ repeat: -1, paused: true });
          ambient.to(q('.sculpture'), { rotation: '+=360', duration: 48, ease: 'none' }, 0);
          ambient.to(q('.orbit-satellite'), { rotation: 360, svgOrigin: '240 240', duration: 24, repeat: 1, ease: 'none' }, 0);
          ambient.to(q('.orbit-satellite-secondary'), { rotation: -360, svgOrigin: '240 240', duration: 48, ease: 'none' }, 0);
          ambient.to(q('.orb-shadow'), { scaleX: .8, opacity: .45, duration: 4, repeat: 11, yoyo: true, ease: 'sine.inOut' }, 0);
          const labels = q('.floating-label');
          if (labels.length) ambient.to(labels, { y: -12, duration: 4, repeat: 11, yoyo: true, ease: 'sine.inOut' }, 0);
          let visible = false;
          const sync = () => {
            if (visible && !document.hidden) ambient.play();
            else ambient.pause();
          };
          const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
          observer.observe(scene);
          document.addEventListener('visibilitychange', sync);
          cleanup.push(() => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); });
        });

        select('.chart').forEach((chart: HTMLElement) => {
          gsap.from(chart.children, { scaleY: 0, transformOrigin: 'bottom', duration: .4, stagger: .02,
            ease: 'power2.out', scrollTrigger: { trigger: chart, start: 'top 92%', once: true } });
        });
        select('.chat-window').forEach((chat: HTMLElement) => {
          gsap.from(chat.querySelectorAll('.chat-message'), { y: 8, duration: .35, stagger: .06,
            scrollTrigger: { trigger: chat, start: 'top 85%', once: true }, clearProps: 'transform,opacity' });
        });
        if (progress.current) gsap.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: .15 } });

        // Cache pointer geometry on entry; no layout reads inside the move handler.
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          select('.project-art').forEach((card: HTMLElement) => {
            const content = card.querySelector<HTMLElement>('.demo-window, .chat-window');
            if (!content) return;
            let bounds: DOMRect;
            const x = gsap.quickTo(content, 'x', { duration: .55, ease: 'power3.out' });
            const y = gsap.quickTo(content, 'y', { duration: .55, ease: 'power3.out' });
            const enter = () => { bounds = card.getBoundingClientRect(); };
            const move = (event: PointerEvent) => {
              if (!bounds) return;
              x(((event.clientX - bounds.left) / bounds.width - .5) * 16);
              y(((event.clientY - bounds.top) / bounds.height - .5) * 12);
            };
            const leave = () => { x(0); y(0); };
            card.addEventListener('pointerenter', enter);
            card.addEventListener('pointermove', move);
            card.addEventListener('pointerleave', leave);
            cleanup.push(() => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); });
          });
        }
      }, container);
      return () => { cleanup.forEach(dispose => dispose()); context.revert(); };
    });
    return () => media.revert();
  }, [pathname]);

  return <div ref={root} className="motion-root">
    <div ref={progress} className="reading-progress" aria-hidden="true" />
    {children}
  </div>;
}
