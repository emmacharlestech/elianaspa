import { useEffect, useState } from 'react';
import './Preloader.css';

/**
 * Cinematic opening: the EA monogram draws itself, the name rises, then
 * the curtain splits to reveal the hero.
 *
 * The whole timeline is pure CSS. A tiny inline script in index.html
 * decides before first paint whether it plays (once per session, never
 * with reduced motion) by adding `intro-skip` or, after 1.45s,
 * `intro-done` to <html>. So the page can never get stuck behind the
 * intro, even if JavaScript is slow or fails. React only removes the
 * finished overlay from the DOM.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const skip = document.documentElement.classList.contains('intro-skip');
    const t = setTimeout(() => setGone(true), skip ? 0 : 2600);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" aria-hidden="true">
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
