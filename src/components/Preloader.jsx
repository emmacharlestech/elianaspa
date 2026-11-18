import { useEffect, useState } from 'react';
import './Preloader.css';

const SEEN_KEY = 'ea-intro-seen';

/** Should the intro play? Once per browser session, never with reduced motion. */
export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !window.sessionStorage.getItem(SEEN_KEY);
  } catch {
    return false;
  }
}

/** Signals the hero (via <html class="intro-done">) that it can start animating. */
export function markIntroDone() {
  document.documentElement.classList.add('intro-done');
  try {
    window.sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable — fine */
  }
}

/**
 * Cinematic opening: the EA monogram draws itself, the name fades up,
 * then the curtain splits to reveal the hero. ~2s, decorative only.
 */
export default function Preloader() {
  const [phase, setPhase] = useState('in'); // in → out → gone

  useEffect(() => {
    document.body.classList.add('is-locked');
    const toOut = setTimeout(() => {
      setPhase('out');
      document.body.classList.remove('is-locked');
      markIntroDone();
    }, 1450);
    const toGone = setTimeout(() => setPhase('gone'), 2400);
    return () => {
      clearTimeout(toOut);
      clearTimeout(toGone);
      document.body.classList.remove('is-locked');
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className={`preloader preloader--${phase}`} aria-hidden="true">
      <div className="preloader__panel preloader__panel--top" />
      <div className="preloader__panel preloader__panel--bottom" />
      <div className="preloader__inner">
        <svg className="preloader__mark" viewBox="0 0 64 64">
          <circle className="preloader__ring" cx="32" cy="32" r="30.5" />
          <circle className="preloader__ring preloader__ring--inner" cx="32" cy="32" r="27" />
          <text x="32" y="40" textAnchor="middle" className="preloader__letters">
            EA
          </text>
        </svg>
        <p className="preloader__name">Eliana&rsquo;s</p>
        <p className="preloader__tag">Cosmetics &amp; Aesthetics</p>
        <span className="preloader__line" />
      </div>
    </div>
  );
}
