import fs from 'node:fs';
import path from 'node:path';
import { CORE_GAMES, EDITORIAL_ARTICLES } from '../../data/archiveData.ts';
import { DEFAULT_CANONICAL_URL, normalizeCanonicalOrigin } from './seoConfig.ts';

export interface SitemapImageEntry {
  loc: string;
  title: string;
}

export interface SitemapUrlEntry {
  path: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
  images?: SitemapImageEntry[];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripQueryAndHash(urlPath: string): string {
  return urlPath.split('?')[0].split('#')[0];
}

function isAccessiblePublicFile(cleanPath: string, publicDir?: string): boolean {
  if (!cleanPath.startsWith('/')) return false;
  if (!publicDir) return true;
  const resolved = path.resolve(publicDir, `.${cleanPath}`);
  if (!resolved.startsWith(path.resolve(publicDir))) {
    return false;
  }
  return fs.existsSync(resolved) && fs.statSync(resolved).isFile();
}

export function getSitemapEntries(
  rawBaseUrl: string = DEFAULT_CANONICAL_URL,
  publicDir?: string
): { baseUrl: string; entries: SitemapUrlEntry[]; totalImages: number } {
  const baseUrl = normalizeCanonicalOrigin(rawBaseUrl);
  const seenPaths = new Set<string>();
  const seenImages = new Set<string>();
  const entries: SitemapUrlEntry[] = [];
  let totalImages = 0;

  const registerEntry = (entry: SitemapUrlEntry) => {
    const normalizedPath =
      entry.path === '/' ? '/' : entry.path.replace(/\/+$/, '');
    if (seenPaths.has(normalizedPath)) return;
    seenPaths.add(normalizedPath);

    const uniqueImages: SitemapImageEntry[] = [];
    if (entry.images && entry.images.length > 0) {
      for (const img of entry.images) {
        const cleanImgPath = stripQueryAndHash(img.loc);
        if (
          !cleanImgPath.startsWith('data:') &&
          isAccessiblePublicFile(cleanImgPath, publicDir)
        ) {
          const fullImgLoc = `${baseUrl}${cleanImgPath}`;
          if (!seenImages.has(fullImgLoc)) {
            seenImages.add(fullImgLoc);
            uniqueImages.push({
              loc: fullImgLoc,
              title: img.title,
            });
            totalImages += 1;
          }
        }
      }
    }

    entries.push({
      ...entry,
      path: normalizedPath,
      images: uniqueImages.length > 0 ? uniqueImages : undefined,
    });
  };

  // 1. Core Static Pages (Excludes /audit [noindex], 404, redirects, /api/*)
  const staticPages: SitemapUrlEntry[] = [
    {
      path: '/',
      lastmod: '2026-11-24',
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      path: '/encyclopedia',
      lastmod: '2026-11-19',
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      path: '/comparator',
      lastmod: '2026-10-17',
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      path: '/archive',
      lastmod: '2026-10-17',
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        {
          loc: '/images/nostalgia.jpg',
          title: '1990년대 한국 골목 전자오락실 CRT 브라운관 추억 아카이브',
        },
      ],
    },
    {
      path: '/guide',
      lastmod: '2026-10-17',
      changefreq: 'monthly',
      priority: '0.9',
      images: [
        {
          loc: '/images/seal.jpg',
          title: 'SAFE TEAM 릴게임 안전지대 공식 피해 예방 및 검증 인장',
        },
      ],
    },
    {
      path: '/journal',
      lastmod: '2026-10-17',
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      path: '/about',
      lastmod: '2026-10-17',
      changefreq: 'monthly',
      priority: '0.7',
    },
  ];

  for (const page of staticPages) {
    registerEntry(page);
  }

  // 2. Dynamic Core Machine Dossiers from archiveData.ts (6 core machines + dedicated images)
  for (const game of CORE_GAMES) {
    const cleanPosterPath = stripQueryAndHash(game.posterImage);
    registerEntry({
      path: `/games/${game.slug}`,
      lastmod: game.dateModified || '2026-11-19',
      changefreq: 'monthly',
      priority: '0.85',
      images: [
        {
          loc: cleanPosterPath,
          title: `${game.koreanName} (${game.englishName}) 대표 아케이드 포스터`,
        },
      ],
    });
  }

  // 3. Editorial Journal Articles from archiveData.ts
  for (const article of EDITORIAL_ARTICLES) {
    registerEntry({
      path: `/journal/${article.slug}`,
      lastmod: article.dateModified || '2026-10-17',
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  return { baseUrl, entries, totalImages };
}

export function buildSitemapXml(
  rawBaseUrl: string = DEFAULT_CANONICAL_URL,
  publicDir?: string
): string {
  const { baseUrl, entries } = getSitemapEntries(rawBaseUrl, publicDir);

  const urlNodes = entries
    .map((entry) => {
      const loc = `${baseUrl}${entry.path === '/' ? '/' : entry.path}`;
      const imageXml = (entry.images || [])
        .map(
          (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`
        )
        .join('\n');

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${imageXml ? `\n${imageXml}` : ''}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlNodes}
</urlset>
`;
}

export function buildRobotsTxt(rawBaseUrl: string = DEFAULT_CANONICAL_URL): string {
  const baseUrl = normalizeCanonicalOrigin(rawBaseUrl);
  return `# ${baseUrl} - Google Search & Crawler Policy
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-agent: Google-Extended
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}
