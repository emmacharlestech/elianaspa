import { NAV_LINKS, SITE } from '../data/site';
import { SERVICES } from '../data/services';
import Logo from './Logo';
import BookButton from './BookButton';
import { Instagram, MapPin, WhatsApp } from './Icons';
import { serviceMessage, whatsappHref } from '../lib/whatsapp';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta">
          <p className="footer__cta-title">
            Reveal your beauty. <em>Rediscover your glow.</em>
          </p>
          <BookButton>Book an Appointment</BookButton>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo tone="light" />
            <p>A beauty, cosmetics and skincare destination in Asaba, Delta State.</p>
            <p className="footer__addr">
              <MapPin />
              <span>
                {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}, {SITE.address.state}
              </span>
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer__heading">Explore</h2>
            <ul className="footer__list">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__heading">Services</h2>
            <ul className="footer__list">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__heading">Bookings</h2>
            <p className="footer__text">All appointments and enquiries are handled personally on WhatsApp.</p>
            <a className="footer__wa" href={whatsappHref(serviceMessage())} target="_blank" rel="noopener noreferrer">
              <WhatsApp />
              Message us
            </a>
            {SITE.contact.instagram && (
              <a className="footer__wa footer__social" href={SITE.contact.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram />
                Instagram
              </a>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; <span suppressHydrationWarning>{year}</span> {SITE.name}. All rights reserved.
          </p>
          <p>Photography shown is illustrative.</p>
          <a href="#home" className="footer__top">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
