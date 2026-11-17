# Eliana's Cosmetics & Aesthetics — Website

Premium single-page website for **Eliana's Cosmetics & Aesthetics**, Annie Supermarket, by Marble Hill, Asaba, Delta State, Nigeria.

Built with **React 18 + Vite**, plain CSS (design tokens and component-scoped stylesheets) and no backend.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Booking and enquiries (no backend)

There is **no database or booking backend**. Every booking and enquiry button opens the business WhatsApp link set in `src/data/site.js`:

```
https://wa.me/qr/I6QS3UZBKB4CA1
```

The **enquiry form** validates input and builds a formatted message. It copies the message to the clipboard and opens WhatsApp, and the visitor pastes and sends it. The form does not store or transmit any data itself. WhatsApp QR links cannot carry a pre-filled message. If you later want messages pre-filled, change `whatsappUrl` to `https://wa.me/234XXXXXXXXXX` and append `?text=` in `EnquiryForm.jsx`.

## Editing content

All business content lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `site.js` | Business name, WhatsApp link, address, map search, phone / email / hours / Instagram (empty = "coming soon") |
| `services.js` | The services: titles, descriptions, highlights, images. `price: null` shows "Price on request"; set e.g. `'₦25,000'` |
| `products.js` | Product catalogue and filter categories. **All current items are samples** (`sample: true` shows a "Sample" badge and the catalogue notice) |
| `gallery.js` | Gallery images and categories |
| `testimonials.js` | **Placeholder** review cards (`placeholder: true`). Replace with genuine reviews used with permission |

### Images

Images are currently illustrative stock photos served from the Unsplash CDN (free to use under the [Unsplash License](https://unsplash.com/license)), sized and compressed automatically through URL parameters.

To use your own photos, put them in `public/images/` and change an item's image from `{ id: '…' }` to `{ src: '/images/your-photo.jpg' }`.

### Logo

The temporary "EA" monogram is in `src/components/Logo.jsx`; the file's comment explains how to swap in a final logo. Also replace `public/favicon.svg`.

## Project structure

```
src/
  components/   One component per section (+ its CSS), plus shared pieces:
                BookButton, SmartImage, Reveal, SectionHeading, Lightbox, ErrorBoundary
  data/         Editable business content
  hooks/        useReveal (scroll animations), useActiveSection (nav highlight)
  lib/          Image URL helpers
  styles/       tokens.css (colours, type, spacing), base.css (reset, buttons, utilities)
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo. The settings come from `vercel.json` (Vite, `npm run build`, output `dist`).
3. Deploy. Add a custom domain under **Project → Settings → Domains**.

After you have a domain, add `<link rel="canonical">` and an absolute `og:url` in `index.html`.

## Before launch checklist

- [ ] Phone, email, opening hours and Instagram in `src/data/site.js`
- [ ] Real product range (set `sample: false`) or keep the sample notice
- [ ] Genuine testimonials (set `placeholder: false`)
- [ ] Studio photography for the gallery, especially "Transformations" (with client consent)
- [ ] Final logo and favicon
- [ ] Confirm the Google Maps pin location
