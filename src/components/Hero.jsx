import { useEffect, useRef } from 'react';
import { SITE } from '../data/site';
import { SERVICES } from '../data/services';
import SmartImage from './SmartImage';
import BookButton from './BookButton';
import { ArrowRight, MapPin, Sparkle } from './Icons';
import { useParallax, prefersReducedMotion } from '../hooks/useParallax';
import './Hero.css';

const HERO_IMAGE = {
  id: '1669040084821-097235fe53ff',
};

export default function Hero() {
  const heroRef = useRef(null);
  const mediaRef = useParallax(0.28);

  // Scroll-linked fade of the hero copy as the visitor moves on (--hero-p: 0 → 1).
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || prefersReducedMotion()) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(Math.max(window.scrollY / (hero.offsetHeight * 0.85), 0), 1);
      hero.style.setProperty('--hero-p', p.toFixed(3));
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

  return (
    <section id="home" ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__media" ref={mediaRef}>
        <SmartImage
          image={HERO_IMAGE}
          alt="Portrait of a woman with luminous, glowing skin and gold hoop earrings"
          widths={[640, 960, 1280, 1800, 2400]}
          sizes="(max-width: 860px) 100vw, 60vw"
          priority
          className="hero__img"
        />
        <div className="hero__veil" aria-hidden="true" />
      </div>
      <span className="grain" aria-hidden="true" />

      <div className="hero__vertical" aria-hidden="true">
        Cosmetics <span>·</span> Skincare <span>·</span> Aesthetics
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow eyebrow--light hero__eyebrow">
            {SITE.address.city}, {SITE.address.state}
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span className="hero__line-inner">Reveal Your Beauty.</span>
            </span>
            <span className="hero__line hero__line--accent">
              <span className="hero__line-inner">
                <em>Rediscover</em> Your Glow.
              </span>
            </span>
          </h1>
          <p className="hero__lede">
            Eliana&rsquo;s Cosmetics &amp; Aesthetics is a beauty and skincare destination in the heart of Asaba,
            where personalised treatments, expert lash artistry and carefully chosen cosmetics come together in one
            calm, elegant space.
          </p>
          <div className="hero__actions">
            <BookButton>Book an Appointment</BookButton>
            <a href="#services" className="btn btn--ghost-light">
              <span>Explore Our Services</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <div className="hero__footer">
        <div className="container hero__footer-inner">
          <p className="hero__location">
            <MapPin />
            <span>
              {SITE.address.line1}, {SITE.address.line2}
            </span>
          </p>
          <a href="#about" className="hero__scroll" aria-label="Scroll to About section">
            <span className="hero__scroll-line" aria-hidden="true" />
            <span>Scroll</span>
          </a>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((dup) => (
            <div className="marquee__group" key={dup}>
              {SERVICES.map((s) => (
                <span key={s.id} className="marquee__item">
                  {s.title}
                  <Sparkle />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
