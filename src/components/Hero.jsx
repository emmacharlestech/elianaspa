import { SITE } from '../data/site';
import { SERVICES } from '../data/services';
import SmartImage from './SmartImage';
import BookButton from './BookButton';
import { ArrowRight, MapPin, Sparkle } from './Icons';
import './Hero.css';

const HERO_IMAGE = {
  id: '1531123897727-8f129e1688ce',
};

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <SmartImage
          image={HERO_IMAGE}
          alt="Close-up portrait of a woman with radiant, glowing skin"
          widths={[640, 960, 1280, 1800, 2400]}
          sizes="(max-width: 860px) 100vw, 60vw"
          priority
          className="hero__img"
        />
        <div className="hero__veil" aria-hidden="true" />
      </div>

      <div className="hero__vertical" aria-hidden="true">
        Cosmetics <span>·</span> Skincare <span>·</span> Aesthetics
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow eyebrow--light hero__eyebrow">
            {SITE.address.city}, {SITE.address.state}
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">Reveal Your Beauty.</span>
            <span className="hero__line hero__line--accent">
              <em>Rediscover</em> Your Glow.
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
