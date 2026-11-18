import { useEffect, useMemo, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useParallax';
import { Monogram } from './Logo';
import './Manifesto.css';

/* Words wrapped in *asterisks* are set in gold italic. */
const STATEMENT =
  'Beauty is not about becoming someone new. It is about *revealing* the radiance that was always *yours*, with care, expertise and a touch of *luxury*.';

/**
 * Brand philosophy statement. Each word lights up as the section
 * scrolls through the viewport (scroll-linked, rAF-throttled).
 */
export default function Manifesto() {
  const sectionRef = useRef(null);
  const words = useMemo(
    () =>
      STATEMENT.split(' ').map((raw) => {
        const accent = raw.includes('*');
        return { text: raw.replace(/\*/g, ''), accent };
      }),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const spans = [...section.querySelectorAll('.manifesto__word')];
    if (prefersReducedMotion()) {
      spans.forEach((s) => s.classList.add('is-lit'));
      return undefined;
    }
    let frame = 0;
    let lit = -1;
    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section top reaches 80% of the screen, 1 when its centre passes 40%
      const start = vh * 0.8;
      const end = vh * 0.4 - r.height / 2;
      const p = Math.min(Math.max((start - r.top) / (start - end), 0), 1);
      const count = Math.round(p * spans.length);
      if (count === lit) return;
      lit = count;
      spans.forEach((s, i) => s.classList.toggle('is-lit', i < count));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="manifesto" aria-label="Our philosophy">
      <span className="grain" aria-hidden="true" />
      <div className="container manifesto__inner">
        <Monogram className="manifesto__mono" />
        <p className="eyebrow eyebrow--light manifesto__eyebrow">Our Philosophy</p>
        <p className="manifesto__text">
          {words.map((w, i) => (
            <span key={i} className={`manifesto__word ${w.accent ? 'manifesto__word--accent' : ''}`}>
              {w.text}{' '}
            </span>
          ))}
        </p>
        <p className="manifesto__sign">Eliana&rsquo;s Cosmetics &amp; Aesthetics</p>
      </div>
    </section>
  );
}
