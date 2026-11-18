import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_LINKS, SITE, fullAddress } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';
import Logo from './Logo';
import BookButton from './BookButton';
import { Close, MapPin } from './Icons';
import './Navbar.css';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const progressRef = useRef(null);

  // Solid background after scrolling, gold reading-progress line,
  // and hide-on-scroll-down / reveal-on-scroll-up behaviour.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 40);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > window.innerHeight * 0.6);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Lock scroll, handle Escape, trap focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('is-locked');
    const panel = panelRef.current;
    panel?.querySelector('a')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && panel) {
        const focusables = panel.querySelectorAll('a, button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth > 1080 && close(false);

    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={`nav ${solid ? 'nav--solid' : ''} ${open ? 'nav--open' : ''} ${hidden && !open ? 'nav--hidden' : ''}`}
      onFocusCapture={() => setHidden(false)}
    >
      <span className="nav__progress" ref={progressRef} aria-hidden="true" />
      <div className="container nav__bar">
        <a href="#home" className="nav__brand" aria-label={`${SITE.name}, back to top`} onClick={() => open && close(false)}>
          <Logo tone={solid && !open ? 'dark' : 'light'} />
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link ${active === link.id ? 'is-active' : ''}`}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__cta">
          <BookButton variant={solid ? 'dark' : 'ghost-light'} size="sm">
            Book Now
          </BookButton>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => (open ? close(false) : setOpen(true))}
        >
          <span className="nav__toggle-line" />
          <span className="nav__toggle-line" />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ol className="mobile-menu__list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id} style={{ '--i': i }}>
                <a href={`#${link.id}`} onClick={() => close(false)} className={active === link.id ? 'is-active' : ''}>
                  <span className="mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu__footer">
          <p className="mobile-menu__address">
            <MapPin />
            <span>{fullAddress()}</span>
          </p>
          <BookButton block>Book on WhatsApp</BookButton>
          <button type="button" className="mobile-menu__close" onClick={() => close()}>
            <Close /> Close menu
          </button>
        </div>
      </div>
    </header>
  );
}
