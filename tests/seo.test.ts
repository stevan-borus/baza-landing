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

// Everything below parses the whole document: structured data and visible copy
// live in the body, not the head.
function documentOf(htmlPath: string) {
  return readFileSync(htmlPath, 'utf8');
}

function textOf(html: string) {
  return decode(html.replace(/<[^>]*>/g, '')).trim();
}

function jsonLdBlocksOf(html: string) {
  return [
    ...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map(match => match[1]);
}

function jsonLdOfType(html: string, type: string) {
  return jsonLdBlocksOf(html)
    .map(block => JSON.parse(block) as Record<string, unknown>)
    .filter(data => data['@type'] === type);
}

function imgAltsOf(html: string) {
  return [...html.matchAll(/<img\b[^>]*\balt="([^"]*)"/g)].map(match =>
    decode(match[1]),
  );
}

const homeHtml = documentOf(htmlPathFor(baseUrl));
const programmeUrls = sitemapUrls.filter(url =>
  url.startsWith(`${baseUrl}/programi/`),
);

describe('home page', () => {
  test('targets reformer pilates in Novi Sad in its title', () => {
    expect(titleOf(headOf(htmlPathFor(baseUrl)))).toBe(
      'Reformer pilates Novi Sad | Baza Pilates studio',
    );
  });

  test('has one H1 naming reformer pilates in Novi Sad', () => {
    const h1s = [...homeHtml.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(
      match => textOf(match[1]),
    );
    expect(h1s).toEqual(['Reformer pilates u Novom Sadu']);
  });

  test('links to every programme in the sitemap', () => {
    expect(programmeUrls.length).toBeGreaterThan(0);
    for (const url of programmeUrls) {
      expect(homeHtml).toContain(`href="${url.slice(baseUrl.length)}"`);
    }
  });

  test('states the studio address', () => {
    const main = homeHtml.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '';
    expect(textOf(main)).toContain('Futoška 33');
  });

  test('has no placeholder image alts', () => {
    const alts = imgAltsOf(homeHtml);
    expect(alts).not.toContain('Naslovna slika');
    expect(alts).not.toContain('Donja slika');
  });
});

describe('structured data', () => {
  test.each(sitemapUrls)('%s has one ExerciseGym block', url => {
    const html = documentOf(htmlPathFor(url));
    const gyms = jsonLdOfType(html, 'ExerciseGym');
    expect(gyms).toHaveLength(1);

    const gym = gyms[0] as {
      address: { streetAddress: string; addressLocality: string };
      geo: { latitude: unknown; longitude: unknown };
      telephone: unknown;
      openingHoursSpecification: unknown;
    };
    expect(gym.address.streetAddress).toBe('Futoška 33');
    expect(gym.address.addressLocality).toBe('Novi Sad');
    expect(typeof gym.geo.latitude).toBe('number');
    expect(typeof gym.geo.longitude).toBe('number');
    expect(typeof gym.telephone).toBe('string');
    expect(gym.openingHoursSpecification).toBeDefined();
  });

  test('FAQ page describes every question it shows', () => {
    const html = documentOf(htmlPathFor(`${baseUrl}/vasa-pitanja`));
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '';
    // Each question renders as an accordion trigger button.
    const questions = [
      ...main.matchAll(
        /<button\b[^>]*aria-expanded="[^"]*"[^>]*>([\s\S]*?)<\/button>/g,
      ),
    ].map(match => textOf(match[1]));
    expect(questions.length).toBeGreaterThan(0);

    const pages = jsonLdOfType(html, 'FAQPage') as {
      mainEntity: {
        '@type': string;
        name: string;
        acceptedAnswer: { '@type': string; text: string };
      }[];
    }[];
    expect(pages).toHaveLength(1);
    expect(pages[0].mainEntity).toHaveLength(questions.length);
    expect(pages[0].mainEntity.map(entity => entity.name)).toEqual(questions);
    for (const entity of pages[0].mainEntity) {
      expect(entity['@type']).toBe('Question');
      expect(entity.acceptedAnswer['@type']).toBe('Answer');
      expect(entity.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });
});

describe('programme pages', () => {
  test.each(programmeUrls)('%s title names Novi Sad', url => {
    expect(titleOf(headOf(htmlPathFor(url)))).toEndWith(
      'Novi Sad | Baza Pilates',
    );
  });
});

describe('gallery', () => {
  test('image alts describe the studio, not a bare index', () => {
    const html = documentOf(htmlPathFor(`${baseUrl}/galerija`));
    const galleryAlts = [
      ...html.matchAll(/<img\b[^>]*\bsrc="[^"]*\/gal\/[^"]*"[^>]*>/g),
    ].map(match => decode(match[0].match(/\balt="([^"]*)"/)?.[1] ?? ''));
    expect(galleryAlts.length).toBeGreaterThan(0);
    for (const alt of galleryAlts) {
      expect(alt).not.toMatch(/^Galerija \d+$/);
    }
  });
});

describe('gallery photo descriptions', () => {
  const html = documentOf(htmlPathFor(`${baseUrl}/galerija`));
  const galleryAlts = [
    ...html.matchAll(/<img\b[^>]*\bsrc="[^"]*\/gal\/[^"]*"[^>]*>/g),
  ].map(match => decode(match[0].match(/\balt="([^"]*)"/)?.[1] ?? ''));

  test('every photo has its own description', () => {
    expect(galleryAlts).toHaveLength(galleryPages.length);
    expect(new Set(galleryAlts).size).toBe(galleryAlts.length);
  });

  test('no description is a numbered placeholder', () => {
    for (const alt of galleryAlts) {
      expect(alt).not.toMatch(/\d+$/);
    }
  });
});
