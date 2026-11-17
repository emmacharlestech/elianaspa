/**
 * Image helpers.
 *
 * An image in the data files is either:
 *   { id: '<unsplash photo id>' }  – remote placeholder served by Unsplash's CDN
 *   { src: '/images/my-photo.jpg' } – your own photo placed in /public/images
 *
 * To swap in real business photography, replace `id` with `src`.
 */
const UNSPLASH = 'https://images.unsplash.com/photo-';

export function unsplashUrl(id, { w = 1200, ratio, q = 72 } = {}) {
  const h = ratio ? `&h=${Math.round(w * ratio)}` : '';
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}${h}&q=${q}`;
}

export function buildSources(image, { widths = [480, 768, 1080, 1440], ratio } = {}) {
  if (!image) return { src: '' };
  if (image.src) return { src: image.src };
  const sorted = [...widths].sort((a, b) => a - b);
  const fallbackW = sorted[Math.min(2, sorted.length - 1)];
  return {
    src: unsplashUrl(image.id, { w: fallbackW, ratio }),
    srcSet: sorted.map((w) => `${unsplashUrl(image.id, { w, ratio })} ${w}w`).join(', '),
  };
}
