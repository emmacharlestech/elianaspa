import { handleBookingClick, serviceMessage, whatsappHref } from '../lib/whatsapp';
import { ArrowRight, WhatsApp } from './Icons';

/**
 * Every booking / enquiry call-to-action uses this component, so they all
 * open the business WhatsApp in a new tab.
 *
 * `service`  – treatment name; builds an appointment enquiry for it.
 * `message`  – custom message (overrides `service`).
 * `label`    – extra screen-reader context, e.g. "for Waxing".
 * With a WhatsApp number configured the message is prefilled; otherwise it
 * is copied and a notice tells the customer to paste it.
 */
export default function BookButton({
  children = 'Book an Appointment',
  variant = 'gold',
  size,
  block = false,
  icon = 'whatsapp',
  className = '',
  label,
  service,
  message,
}) {
  const text = message ?? serviceMessage(service);
  const classes = ['btn', `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classes}
      href={whatsappHref(text)}
      target="_blank"
      rel="noopener noreferrer"
      data-booking-link=""
      onClick={() => handleBookingClick(text)}
    >
      {icon === 'whatsapp' && <WhatsApp />}
      <span>{children}</span>
      {/* Extra context for screen readers, appended after the visible text */}
      <span className="visually-hidden">{label ? ` ${label}` : ''}, opens WhatsApp in a new tab</span>
      {icon === 'arrow' && <ArrowRight />}
    </a>
  );
}
