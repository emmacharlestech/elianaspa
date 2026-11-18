/**
 * Central business configuration.
 * Edit these values to update details everywhere on the site.
 * Empty strings render as a "coming soon" placeholder instead of fake data.
 */
export const SITE = {
  name: "Eliana's Cosmetics & Aesthetics",

  // Public address of the website (no trailing slash). Update this when a
  // custom domain is connected; canonical links, sitemap and structured
  // data are generated from it at build time.
  url: 'https://elianaspa.vercel.app',
  shortName: "Eliana's",
  descriptor: 'Cosmetics & Aesthetics',

  // Every booking / enquiry button on the site opens WhatsApp.
  //
  // whatsappNumber: the business WhatsApp number in international format,
  // digits only (e.g. '2348031234567'). When set, every Book button opens
  // WhatsApp with the appointment enquiry already typed in.
  //
  // whatsappUrl: the business QR chat link, used while whatsappNumber is
  // empty. QR links cannot carry a message, so the site copies the
  // enquiry to the clipboard and tells the customer to paste it.
  whatsappNumber: '',
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

// `desktop: false` keeps a link out of the (space-limited) desktop bar;
// every link appears in the mobile menu and the footer.
export const NAV_LINKS = [
  { id: 'home', label: 'Home', desktop: false },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Treatments' },
  { id: 'experience', label: 'Experience' },
  { id: 'products', label: 'Products' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'testimonials', label: 'Reviews', desktop: false },
  { id: 'booking', label: 'Book', desktop: false },
  { id: 'contact', label: 'Contact' },
];

export const fullAddress = (a = SITE.address) =>
  `${a.line1}, ${a.line2}, ${a.city}, ${a.state}, ${a.country}`;
