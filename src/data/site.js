/**
 * Central business configuration.
 * Edit these values to update details everywhere on the site.
 * Empty strings render as a "coming soon" placeholder instead of fake data.
 */
export const SITE = {
  name: "Eliana's Cosmetics & Aesthetics",
  shortName: "Eliana's",
  descriptor: 'Cosmetics & Aesthetics',

  // Every booking / enquiry button on the site points here.
  // Note: WhatsApp QR links (wa.me/qr/...) cannot carry a pre-filled message.
  whatsappUrl: 'https://wa.me/qr/I6QS3UZBKB4CA1',

  address: {
    line1: 'Annie Supermarket',
    line2: 'by Marble Hill',
    city: 'Asaba',
    state: 'Delta State',
    country: 'Nigeria',
  },
  mapQuery: 'Annie Supermarket, Marble Hill, Asaba, Delta State, Nigeria',

  // TODO: fill in confirmed details. Leave '' to show a placeholder.
  contact: {
    phone: '', // e.g. '+234 803 000 0000'
    email: '', // e.g. 'hello@elianas.ng'
    hours: '', // e.g. 'Mon – Sat · 9:00am – 7:00pm'
    instagram: '', // full URL, e.g. 'https://instagram.com/elianas'
  },
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'products', label: 'Products' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

export const fullAddress = (a = SITE.address) =>
  `${a.line1}, ${a.line2}, ${a.city}, ${a.state}, ${a.country}`;
