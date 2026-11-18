import { SITE } from '../data/site';

/**
 * WhatsApp booking helpers — the single place that decides how a
 * booking message reaches the business.
 *
 *  • whatsappNumber set  → https://wa.me/<number>?text=<message>  (prefilled)
 *  • otherwise           → the QR chat link; the message is copied so the
 *                          customer can paste it.
 */
const digits = (SITE.whatsappNumber || '').replace(/\D/g, '');

export const canPrefill = digits.length >= 8;

export function whatsappHref(message) {
  if (canPrefill) {
    return message ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/${digits}`;
  }
  return SITE.whatsappUrl;
}

export function serviceMessage(serviceTitle) {
  return serviceTitle
    ? `Hello Eliana's Cosmetics & Aesthetics, I would like to book an appointment for ${serviceTitle}. Please let me know your available days and times.`
    : `Hello Eliana's Cosmetics & Aesthetics, I would like to book an appointment. Please let me know your available days and times.`;
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy copy */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/* --- Tiny event bus so any button can show the "message copied" notice --- */
const listeners = new Set();
export const onNotice = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const notify = (notice) => listeners.forEach((fn) => fn(notice));

/**
 * Click handler for links that open WhatsApp. When the message can't be
 * prefilled, copy it (while this page still has focus) and show a notice.
 * The link itself still opens WhatsApp normally.
 */
export function handleBookingClick(message) {
  if (canPrefill || !message) return;
  copyText(message).then((copied) => notify({ copied, message }));
}
