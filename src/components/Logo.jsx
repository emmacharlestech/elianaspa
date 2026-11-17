import './Logo.css';

/**
 * TEMPORARY LOGO — typographic "EA" monogram + wordmark.
 *
 * To replace with the final logo:
 *   1. Save the logo file in /public (e.g. /public/logo.svg)
 *   2. Replace <Monogram /> below with:
 *        <img src="/logo.svg" alt="" className="logo__mark" width="44" height="44" />
 */
export function Monogram({ className = '' }) {
  return (
    <svg className={`monogram ${className}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30.5" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="23"
        fontWeight="500"
        letterSpacing="0.5"
        fill="currentColor"
      >
        EA
      </text>
      <path d="M24 45.5h16" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export default function Logo({ tone = 'dark', showDescriptor = true, className = '' }) {
  return (
    <span className={`logo logo--${tone} ${className}`}>
      <Monogram className="logo__mark" />
      <span className="logo__text">
        <span className="logo__name">Eliana&rsquo;s</span>
        {showDescriptor && <span className="logo__descriptor">Cosmetics &amp; Aesthetics</span>}
      </span>
    </span>
  );
}
