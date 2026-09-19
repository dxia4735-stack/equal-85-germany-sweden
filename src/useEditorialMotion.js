import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Every motion is an enhancement. Reduced motion and touch retain native scrolling.
export function useEditorialMotion(root) {
  useEffect(() => {
    const media = gsap.matchMedia();
    let refreshFrame;
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = window.matchMedia('(pointer: fine)').matches
        ? new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -90 } }) : null;
      const tick = (time) => lenis?.raf(time * 1000);
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
      }
      const context = gsap.context(() => {
        gsap.utils.toArray('.roll-title').forEach((heading) => {
          gsap.from(heading.querySelectorAll('.roll-inner'), {
            yPercent: 105, duration: 1.05, stagger: .08, ease: 'expo.out',
            scrollTrigger: { trigger: heading, start: 'top 94%', once: true },
          });
        });
        gsap.from('.arrow-window', {
          xPercent: 34, opacity: 0, duration: 1.25, stagger: .08, ease: 'power3.out',
          scrollTrigger: { trigger: '.arrow-ribbon', start: 'top 90%', once: true },
        });
        gsap.utils.toArray('.arrow-window img').forEach((image, i) => {
          gsap.fromTo(image, { xPercent: -5, scale: 1.18 }, {
            xPercent: 5 + i * 2, ease: 'none',
            scrollTrigger: { trigger: '.arrow-ribbon', start: 'top bottom', end: 'bottom top', scrub: .7 },
          });
        });
        gsap.utils.toArray('.policy').forEach((row) => {
          gsap.from(row.querySelector('.policy-word'), {
            x: 70, opacity: .2, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 93%', once: true },
          });
        });
        gsap.to('.tone-transition', {
          backgroundColor: '#151717', ease: 'none',
          scrollTrigger: { trigger: '.tone-transition', start: 'top bottom', end: 'bottom 45%', scrub: true },
        });
      }, root);
      let disposed = false;
      const refresh = () => { if (disposed) return; cancelAnimationFrame(refreshFrame); refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh()); };
      const observer = new ResizeObserver(refresh);
      observer.observe(root.current);
      document.fonts.ready.then(refresh);
      return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(refreshFrame); context.revert(); gsap.ticker.remove(tick); lenis?.destroy(); };
    });
    return () => { media.revert(); cancelAnimationFrame(refreshFrame); };
  }, [root]);
}
