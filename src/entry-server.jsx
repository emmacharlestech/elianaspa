/**
 * Build-time entry: renders the page to static HTML (see scripts/prerender.mjs)
 * so content appears before JavaScript loads and is fully readable by
 * search engines and link-preview crawlers. The browser then hydrates it.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { SITE, fullAddress } from './data/site';
import { SERVICES } from './data/services';
import { buildSources, unsplashUrl } from './lib/images';
import { whatsappHref } from './lib/whatsapp';
import { HERO_IMAGE, HERO_SIZES, HERO_WIDTHS } from './components/Hero';

export const SITE_URL = SITE.url.replace(/\/$/, '');

export function render() {
  return renderToString(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}

/** <link rel=preload> for the hero photo, matching the <img> srcset exactly. */
export function heroPreload() {
  const { src, srcSet } = buildSources(HERO_IMAGE, { widths: HERO_WIDTHS });
  return `<link rel="preload" as="image" href="${src}" imagesrcset="${srcSet}" imagesizes="${HERO_SIZES}" fetchpriority="high" />`;
}

/** schema.org data generated from the same business data the page uses. */
export function structuredData() {
  const { phone, email, instagram } = SITE.contact;
  const business = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${SITE_URL}/#business`,
    name: SITE.name,
    url: `${SITE_URL}/`,
    image: unsplashUrl(HERO_IMAGE.id, { w: 1200, ratio: 0.525 }),
    description:
      'Beauty, cosmetics and skincare destination in Asaba, Delta State, offering facials and massage, body treatments, stretch mark treatments, skin tightening, waxing, lash extensions and teeth whitening.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      addressCountry: 'NG',
    },
    areaServed: { '@type': 'City', name: SITE.address.city },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Signature Treatments',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.description },
      })),
    },
    potentialAction: {
      '@type': 'ReserveAction',
      name: 'Book an appointment on WhatsApp',
      target: whatsappHref(),
    },
  };
  if (phone) business.telephone = phone;
  if (email) business.email = email;
  if (instagram) business.sameAs = [instagram];

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE.name,
    url: `${SITE_URL}/`,
    inLanguage: 'en-NG',
    publisher: { '@id': `${SITE_URL}/#business` },
  };

  return [business, website];
}

export const ADDRESS = fullAddress();
