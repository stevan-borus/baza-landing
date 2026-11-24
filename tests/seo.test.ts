import { describe, expect, test } from 'bun:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  privatePackages,
  reformerSchedule,
} from '../domain/programmes/programmes';

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
    const title = titleOf(headOf(htmlPathFor(url)));
    expect(title).toContain('Novi Sad');
    expect(title).toEndWith('| Baza Pilates');
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

describe('home page copy', () => {
  const main = homeHtml.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '';
  const mainText = textOf(main);

  test('has enough copy about reformer pilates', () => {
    // Tags are word boundaries here: textOf joins `</h2><p>` neighbours.
    const words = decode(main.replace(/<[^>]*>/g, ' '))
      .split(/\s+/)
      .filter(word => /[\p{L}\p{N}]/u.test(word));
    expect(words.length).toBeGreaterThanOrEqual(450);
    const reformerMentions = mainText.match(/reformer/gi) ?? [];
    expect(reformerMentions.length).toBeGreaterThanOrEqual(8);
  });

  test('links to the instructors, the team and the FAQ', () => {
    for (const href of [
      '/nas-tim/snezana-kragovic',
      '/nas-tim/danica-piper',
      '/nas-tim',
      '/vasa-pitanja',
    ]) {
      expect(main).toContain(`href="${href}"`);
    }
  });

  test('has the reformer section heading and the free trial line', () => {
    const h2s = [...main.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(match =>
      textOf(match[1]),
    );
    expect(h2s).toContain('Reformer pilates u Bazi');
    expect(mainText).toContain('Prvi, probni trening je besplatan.');
  });
});

describe('map links', () => {
  test('point at the BAZA pilates studio place, not the bare street address', () => {
    const mapLinks = [
      ...homeHtml.matchAll(/href="(https:\/\/maps[^"]*)"/g),
    ].map(match => decode(match[1]));
    expect(mapLinks.length).toBeGreaterThan(0);
    for (const link of mapLinks) {
      expect(link).toBe('https://maps.google.com/?cid=11764108408070187275');
    }
    const gym = jsonLdOfType(homeHtml, 'ExerciseGym')[0] as { hasMap: string };
    expect(gym.hasMap).toBe(
      'https://maps.google.com/?cid=11764108408070187275',
    );
  });
});

describe('social links', () => {
  // The old Facebook URL opened an unrelated business ("Nail Studio NS"),
  // so no page may link it, visibly or in structured data.
  test.each(sitemapUrls)(
    '%s does not link the unrelated Facebook page',
    url => {
      const html = documentOf(htmlPathFor(url));
      expect(html).not.toContain('61584067745610');
      const gym = jsonLdOfType(html, 'ExerciseGym')[0] as { sameAs: string[] };
      expect(gym.sameAs).toEqual([
        'https://www.instagram.com/bazapilates/',
        'https://www.tiktok.com/@bazapilates',
      ]);
    },
  );
});

function mainOf(html: string) {
  return html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '';
}

function withoutScriptsAndStyles(html: string) {
  return html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ' ');
}

// Tags are word boundaries here, as in the home page copy count. Only text a
// reader sees counts, so JSON-LD and inline styles are dropped first.
function wordsOf(html: string) {
  return decode(withoutScriptsAndStyles(html).replace(/<[^>]*>/g, ' '))
    .split(/\s+/)
    .filter(word => /[\p{L}\p{N}]/u.test(word));
}

function h2sOf(html: string) {
  return [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(match =>
    textOf(match[1]),
  );
}

function hrefsOf(html: string) {
  return [...html.matchAll(/\bhref="([^"]*)"/g)].map(match => decode(match[1]));
}

function metaDescriptionOf(head: string) {
  const description = head.match(
    /<meta name="description" content="([^"]*)"/,
  )?.[1];
  return description === undefined ? undefined : decode(description);
}

// The data writes some prices as "15.000RSD" and others as "23.000 RSD", and
// prose may space them either way, so prices are compared without spaces.
function withoutSpaces(value: string) {
  return value.replace(/\s/g, '');
}

function priceValue(price: string) {
  return Number(price.replace(/\D/g, ''));
}

// Each FAQ question renders as an accordion trigger button.
function faqQuestionsOf(main: string) {
  return [
    ...main.matchAll(
      /<button\b[^>]*aria-expanded="[^"]*"[^>]*>([\s\S]*?)<\/button>/g,
    ),
  ].map(match => textOf(match[1]));
}

describe('reformer pilates page', () => {
  const url = `${baseUrl}/programi/reformer-pilates`;
  const html = documentOf(htmlPathFor(url));
  const head = headOf(htmlPathFor(url));
  const main = mainOf(html);
  const lowestGroupPrice = [...reformerSchedule].sort(
    (a, b) => priceValue(a.price) - priceValue(b.price),
  )[0].price;

  test('title targets reformer pilates prices in Novi Sad', () => {
    const title = titleOf(head);
    expect(title).toStartWith('Reformer pilates Novi Sad');
    expect(title).toMatch(/cene/i);
  });

  test('meta description names Novi Sad and the lowest group price', () => {
    const description = metaDescriptionOf(head) ?? '';
    expect(description).toContain('Novom Sadu');
    expect(withoutSpaces(description)).toContain(
      withoutSpaces(lowestGroupPrice),
    );
    expect(description.length).toBeLessThanOrEqual(160);
  });

  test('lists every package with its terms and price in the price section', () => {
    // Only the guide's price section counts: the timetable and the duo and
    // personal cards elsewhere on the page show the same prices.
    const start = main.search(
      /<h2\b[^>]*>Koliko košta reformer pilates u Novom Sadu<\/h2>/,
    );
    expect(start).toBeGreaterThan(-1);
    const end = main.indexOf('<h2', start + 1);
    const section = withoutSpaces(
      textOf(main.slice(start, end === -1 ? undefined : end)),
    );
    const packages = [
      ...reformerSchedule,
      privatePackages.duo,
      privatePackages.personal,
    ];
    for (const { terms, price } of packages) {
      expect(section).toContain(withoutSpaces(`${terms} termina za ${price}`));
    }
  });

  test('has the guide headings', () => {
    const h2s = h2sOf(main);
    for (const heading of [
      'Šta je reformer pilates',
      'Kome odgovara reformer pilates',
      'Koliko košta reformer pilates u Novom Sadu',
    ]) {
      expect(h2s).toContain(heading);
    }
  });

  test('has at least 1000 words of copy', () => {
    expect(wordsOf(main).length).toBeGreaterThanOrEqual(1000);
  });

  test('links to the article, the FAQ, the physiotherapist, Golden age and contact', () => {
    const hrefs = hrefsOf(main);
    for (const href of [
      '/blog/sta-je-reformer-pilates',
      '/vasa-pitanja',
      '/nas-tim/snezana-kragovic',
      '/programi/golden-age-pilates',
      '/kontakt',
    ]) {
      expect(hrefs).toContain(href);
    }
  });

  test('describes every FAQ question it shows', () => {
    const questions = faqQuestionsOf(main);
    expect(questions.length).toBeGreaterThan(0);

    const pages = jsonLdOfType(html, 'FAQPage') as {
      mainEntity: {
        '@type': string;
        name: string;
        acceptedAnswer: { '@type': string; text: string };
      }[];
    }[];
    expect(pages).toHaveLength(1);
    expect(pages[0].mainEntity.map(entity => entity.name)).toEqual(questions);
    for (const entity of pages[0].mainEntity) {
      expect(entity['@type']).toBe('Question');
      expect(entity.acceptedAnswer['@type']).toBe('Answer');
      expect(entity.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });
});

describe('other programme pages', () => {
  test.each(
    programmeUrls.filter(url => url !== `${baseUrl}/programi/reformer-pilates`),
  )('%s has no FAQPage block and names Novi Sad in its title', url => {
    const path = htmlPathFor(url);
    expect(jsonLdOfType(documentOf(path), 'FAQPage')).toEqual([]);
    expect(titleOf(headOf(path))).toContain('Novi Sad');
  });
});

describe('reformer pilates article', () => {
  const url = `${baseUrl}/blog/sta-je-reformer-pilates`;
  // Read lazily so a missing page fails these tests, not the whole file.
  const page = () => {
    const path = htmlPathFor(url);
    return { head: headOf(path), main: mainOf(documentOf(path)) };
  };

  test('is in the sitemap', () => {
    expect(sitemapUrls).toContain(url);
  });

  test('title asks what reformer pilates is', () => {
    expect(titleOf(page().head)).toStartWith('Šta je reformer pilates');
  });

  test('has a real meta description', () => {
    const { head } = page();
    const description = metaDescriptionOf(head) ?? '';
    expect(description.length).toBeGreaterThanOrEqual(100);
    expect(description).not.toBe(titleOf(head));
  });

  test('has at least 800 words of copy', () => {
    expect(wordsOf(page().main).length).toBeGreaterThanOrEqual(800);
  });

  test('links to the reformer pilates programme', () => {
    expect(hrefsOf(page().main)).toContain('/programi/reformer-pilates');
  });

  test('is listed on the blog page', () => {
    const blog = mainOf(documentOf(htmlPathFor(`${baseUrl}/blog`)));
    expect(hrefsOf(blog)).toContain('/blog/sta-je-reformer-pilates');
  });
});

describe('FAQ answers', () => {
  // Structured data may only describe answers the page itself carries, so
  // every answer must be in the HTML even while its accordion item is closed.
  test.each([
    `${baseUrl}/vasa-pitanja`,
    `${baseUrl}/programi/reformer-pilates`,
  ])('%s renders every FAQ answer outside its JSON-LD', url => {
    const html = documentOf(htmlPathFor(url));
    const visible = decode(withoutScriptsAndStyles(html));
    const pages = jsonLdOfType(html, 'FAQPage') as {
      mainEntity: { acceptedAnswer: { text: string } }[];
    }[];
    expect(pages).toHaveLength(1);
    for (const entity of pages[0].mainEntity) {
      expect(visible).toContain(entity.acceptedAnswer.text);
    }
  });
});

describe('reformer pilates article headings', () => {
  const html = () =>
    mainOf(documentOf(htmlPathFor(`${baseUrl}/blog/sta-je-reformer-pilates`)));

  test('section titles are h2 headings', () => {
    const h2s = h2sOf(html());
    for (const heading of [
      'Kako izgleda i kako radi reformer',
      'Kratka istorija',
      'Reformer ili mat pilates',
    ]) {
      expect(h2s).toContain(heading);
    }
  });

  test('no paragraph contains a heading', () => {
    // A <p> cannot hold an <h2>; the browser would close the paragraph early.
    expect(html()).not.toMatch(/<p\b[^>]*>(?:(?!<\/p>)[\s\S])*?<h2\b/);
  });
});

describe('physiotherapists', () => {
  // Snežana, Isidora and Suzana are all physiotherapists; copy that names
  // only one of them undersells the team.
  const physiotherapists = [
    '/nas-tim/snezana-kragovic',
    '/nas-tim/isidora-nikolic',
    '/nas-tim/suzana-bosnjakovic',
  ];

  test.each([
    `${baseUrl}/programi/reformer-pilates`,
    `${baseUrl}/blog/sta-je-reformer-pilates`,
  ])('%s links to every physiotherapist', url => {
    const hrefs = hrefsOf(mainOf(documentOf(htmlPathFor(url))));
    for (const href of physiotherapists) {
      expect(hrefs).toContain(href);
    }
  });
});
