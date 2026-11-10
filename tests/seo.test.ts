import { describe, expect, test } from 'bun:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Integration test over the prerendered build output. Every route is
// force-static, so `next build` writes each page's final HTML to disk.
const appDir = join(import.meta.dir, '..', '.next', 'server', 'app');
const sitemapPath = join(appDir, 'sitemap.xml.body');
const baseUrl = 'https://bazapilates.com';

if (!existsSync(sitemapPath)) {
  throw new Error(
    `Build output not found at ${sitemapPath}. Run \`bun run build\` first (or \`bun run test\`, which builds and then tests).`,
  );
}

const sitemap = readFileSync(sitemapPath, 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  match => match[1],
);

function htmlPathFor(url: string) {
  const path = url.slice(baseUrl.length);
  return join(appDir, path === '' ? 'index.html' : `${path}.html`);
}

// Only the document head: the body has inline SVG icons with their own <title>.
function headOf(htmlPath: string) {
  const html = readFileSync(htmlPath, 'utf8');
  const end = html.indexOf('</head>');
  if (end === -1) throw new Error(`No </head> in ${htmlPath}`);
  return html.slice(0, end);
}

function decode(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function canonicalsOf(head: string) {
  return [...head.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(
    match => decode(match[1]),
  );
}

function ogUrlOf(head: string) {
  return head.match(/<meta property="og:url" content="([^"]*)"/)?.[1];
}

function titleOf(head: string) {
  const title = head.match(/<title>([^<]*)<\/title>/)?.[1];
  return title === undefined ? undefined : decode(title);
}

function robotsMetaOf(head: string, name: string) {
  return head.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1];
}

const galleryDir = join(appDir, 'galerija');
const galleryPages = readdirSync(galleryDir)
  .filter(file => /^gallery-\d+\.html$/.test(file))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

describe('sitemap', () => {
  test('lists no gallery image pages', () => {
    expect(sitemap).not.toContain('/galerija/gallery-');
  });

  test('declares no lastmod', () => {
    expect(sitemap).not.toContain('<lastmod>');
  });

  test('still lists the gallery, contact and detail pages', () => {
    const paths = sitemapUrls.map(url => url.slice(baseUrl.length));
    expect(paths).toContain('/galerija');
    expect(paths).toContain('/kontakt');
    for (const section of ['programi', 'nas-tim', 'novosti', 'blog']) {
      expect(paths.some(path => path.startsWith(`/${section}/`))).toBe(true);
    }
  });
});

describe('sitemap pages', () => {
  test.each(sitemapUrls)('%s has one self-referencing canonical', url => {
    expect(canonicalsOf(headOf(htmlPathFor(url)))).toEqual([url]);
  });

  test.each(sitemapUrls.filter(url => url !== baseUrl))(
    '%s does not claim the homepage as og:url',
    url => {
      expect(ogUrlOf(headOf(htmlPathFor(url)))).not.toBe(baseUrl);
    },
  );

  test('titles are unique', () => {
    const titles = sitemapUrls.map(url => titleOf(headOf(htmlPathFor(url))));
    const seen = new Map<string | undefined, string>();
    const duplicates: string[] = [];
    sitemapUrls.forEach((url, index) => {
      const title = titles[index];
      const first = seen.get(title);
      if (first) duplicates.push(`${url} repeats "${title}" from ${first}`);
      else seen.set(title, url);
    });
    expect(duplicates).toEqual([]);
  });

  test('gallery and contact have their own titles', () => {
    expect(titleOf(headOf(htmlPathFor(`${baseUrl}/galerija`)))).toBe(
      'Galerija | Baza Pilates',
    );
    expect(titleOf(headOf(htmlPathFor(`${baseUrl}/kontakt`)))).toBe(
      'Kontakt | Baza Pilates',
    );
  });
});

describe('gallery image pages', () => {
  test('were prerendered', () => {
    expect(galleryPages.length).toBeGreaterThan(0);
  });

  test.each(galleryPages)('%s is noindex with no canonical', file => {
    const head = headOf(join(galleryDir, file));
    expect(robotsMetaOf(head, 'robots')).toContain('noindex');
    expect(robotsMetaOf(head, 'googlebot')).toContain('noindex');
    expect(canonicalsOf(head)).toEqual([]);
  });
});
