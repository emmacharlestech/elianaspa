import { SITE } from '../data/site';
import { ArrowRight, WhatsApp } from './Icons';

/**
 * Every booking / enquiry call-to-action uses this component,
 * so they all open the same WhatsApp link in a new tab.
 */
export default function BookButton({
  children = 'Book an Appointment',
  variant = 'gold',
  size,
  block = false,
  icon = 'whatsapp',
  className = '',
  label,
}) {
  const classes = ['btn', `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classes}
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `${label} (opens WhatsApp in a new tab)` : undefined}
      data-booking-link=""
    >
      {icon === 'whatsapp' && <WhatsApp />}
      <span>{children}</span>
      {icon === 'arrow' && <ArrowRight />}
    </a>
  );
}
