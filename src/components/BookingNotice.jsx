import { useEffect, useRef, useState } from 'react';
import { onNotice } from '../lib/whatsapp';
import { Check, Close } from './Icons';
import './BookingNotice.css';

/**
 * Shown after a Book button opens WhatsApp without a prefilled message:
 * tells the customer their enquiry was copied and to paste it.
 */
export default function BookingNotice() {
  const [notice, setNotice] = useState(null);
  const timer = useRef(0);

  useEffect(
    () =>
      onNotice((n) => {
        setNotice(n);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setNotice(null), 9000);
      }),
    [],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="booking-notice" role="status" aria-live="polite">
      {notice && (
        <div className="booking-notice__card">
          <span className="booking-notice__icon" aria-hidden="true">
            <Check />
          </span>
          <div className="booking-notice__body">
            <p className="booking-notice__title">
              {notice.copied ? 'Your message is copied' : 'WhatsApp is opening'}
            </p>
            <p className="booking-notice__text">
              {notice.copied
                ? 'Paste it into the WhatsApp chat and press send. We’ll reply to confirm your appointment.'
                : 'Tell us the treatment you’d like and your preferred day. We’ll reply to confirm your appointment.'}
            </p>
          </div>
          <button type="button" className="booking-notice__close" onClick={() => setNotice(null)} aria-label="Dismiss">
            <Close />
          </button>
        </div>
      )}
    </div>
  );
}
