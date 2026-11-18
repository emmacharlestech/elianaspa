/**
 * Post-build step: inject the server-rendered page, preload hints and
 * structured data into dist/index.html, and write sitemap.xml + robots.txt.
 * Run by `npm run build` after the client and SSR builds.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, heroPreload, structuredData, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const indexPath = path.join(dist, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Preload the hero photo and the fonts used above the fold.
const assets = fs.readdirSync(path.join(dist, 'assets'));
const fontPreloads = [
  /^cormorant-garamond-latin-400-normal-.*\.woff2$/,
  /^cormorant-garamond-latin-400-italic-.*\.woff2$/,
  /^jost-latin-300-normal-.*\.woff2$/,
]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);

const preloads = [heroPreload(), ...fontPreloads].join('\n    ');

const jsonLd = structuredData()
  .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
  .join('\n    ');

const appHtml = render();

const checks = { '<!--app-html-->': appHtml, '<!--app-preload-->': preloads, '<!--app-jsonld-->': jsonLd };
for (const [marker, value] of Object.entries(checks)) {
  if (!html.includes(marker)) throw new Error(`prerender: marker ${marker} not found in index.html`);
  html = html.replace(marker, value);
}
html = html.replaceAll('__SITE_URL__', SITE_URL);
fs.writeFileSync(indexPath, html);

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(
  `prerender: ${Math.round(appHtml.length / 1024)} KB of HTML, ${fontPreloads.length} font preloads, ${structuredData().length} JSON-LD blocks, sitemap + robots written for ${SITE_URL}`,
);
