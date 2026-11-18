import { useEffect, useState } from 'react';
import { serviceMessage, whatsappHref } from '../lib/whatsapp';
import { WhatsApp } from './Icons';
import './WhatsAppFloat.css';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappHref(serviceMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className={`wa-float ${visible ? 'is-visible' : ''}`}
      aria-label="Book an appointment on WhatsApp (opens in a new tab)"
      tabIndex={visible ? 0 : -1}
      data-booking-link=""
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <WhatsApp className="wa-float__icon" />
      <span className="wa-float__label">Book on WhatsApp</span>
    </a>
  );
}
