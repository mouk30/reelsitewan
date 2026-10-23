import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
// Core games and articles metadata for Sitemap & Diagnostics (inlined to ensure zero-dependency startup in Node ESM)
const CORE_GAME_SLUGS = [
  'bada-iyagi',
  'yamato',
  'sonogong',
  'ocean-paradise',
  'hwanggeumseong',
  'davinci',
  'aladdin',
];

const EDITORIAL_ARTICLES_META = [
  { slug: '2006-bada-iyagi-crisis-retrospective', dateModified: '2026-10-15' },
  { slug: 'japan-pachinko-vs-korea-screen-game', dateModified: '2026-10-12' },
  { slug: 'gift-certificate-liquidity-crisis-analysis', dateModified: '2026-10-08' },
  { slug: 'rng-algorithm-in-classic-cabinet-games', dateModified: '2026-10-04' },
  { slug: 'reel-speed-and-payout-ratio-engineering', dateModified: '2026-09-28' },
  { slug: 'digital-heritage-preservation-effort', dateModified: '2026-09-20' },
];

const LEGACY_REDIRECT_MAP = [
  { legacyUrl: '/pgi', canonicalSlug: '/', statusCode: 301 },
  { legacyUrl: '/pgi/', canonicalSlug: '/', statusCode: 301 },
  { legacyUrl: '/pgi.html', canonicalSlug: '/', statusCode: 301 },
  { legacyUrl: '/pgi.php', canonicalSlug: '/', statusCode: 301 },
  { legacyUrl: '/intro', canonicalSlug: '/about', statusCode: 301 },
  { legacyUrl: '/intro.html', canonicalSlug: '/about', statusCode: 301 },
  { legacyUrl: '/index.php', canonicalSlug: '/', statusCode: 301 },
  { legacyUrl: '/main.html', canonicalSlug: '/', statusCode: 301 },
  { legacyUrl: '/bbs/board.php?bo_table=game', canonicalSlug: '/encyclopedia', statusCode: 301 },
  { legacyUrl: '/board/free', canonicalSlug: '/journal', statusCode: 301 },
  { legacyUrl: '/history', canonicalSlug: '/archive', statusCode: 301 },
  { legacyUrl: '/safe-guide', canonicalSlug: '/guide', statusCode: 301 },
];

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || 'https://alliancegem.co.kr';

// 1. Legacy 301 Redirect Middleware (as specified in Section 02 & 09)
app.use((req, res, next) => {
  const reqPath = req.path.toLowerCase();
  // Immediate 301 redirect for /pgi and its sub-routes
  if (reqPath === '/pgi' || reqPath.startsWith('/pgi/') || reqPath.startsWith('/pgi.')) {
    return res.redirect(301, '/');
  }

  const matchingRule = LEGACY_REDIRECT_MAP.find(
    (rule) => rule.legacyUrl.toLowerCase() === reqPath
  );
  if (matchingRule) {
    return res.redirect(matchingRule.statusCode, matchingRule.canonicalSlug);
  }
  next();
});

// 2. Google Robots.txt Route
app.get('/robots.txt', (_req: Request, res: Response) => {
  const robotsTxt = `# SAFE TEAM — 릴게임 안전지대 Googlebot Robots Policy
# https://alliancegem.co.kr/
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: ${APP_URL}/sitemap.xml
`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(robotsTxt);
});

// 3. Google XML Sitemap Route (Canonical URLs only, with lastmod)
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const currentDate = '2026-10-17';
  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
    { loc: `${APP_URL}/`, lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
    { loc: `${APP_URL}/encyclopedia`, lastmod: currentDate, changefreq: 'weekly', priority: '0.9' },
    { loc: `${APP_URL}/comparator`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${APP_URL}/archive`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: `${APP_URL}/guide`, lastmod: currentDate, changefreq: 'monthly', priority: '0.9' },
    { loc: `${APP_URL}/journal`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: `${APP_URL}/about`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: `${APP_URL}/audit`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
  ];

  // 7 Core Games
  for (const slug of CORE_GAME_SLUGS) {
    urls.push({
      loc: `${APP_URL}/games/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.85',
    });
  }

  // Articles
  for (const article of EDITORIAL_ARTICLES_META) {
    urls.push({
      loc: `${APP_URL}/journal/${article.slug}`,
      lastmod: article.dateModified,
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.send(xml);
});

// 4. API for System Diagnostics & Verification
app.get('/api/seo-audit', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appUrl: APP_URL,
    totalIndexedGames: CORE_GAME_SLUGS.length,
    totalArticles: EDITORIAL_ARTICLES_META.length,
    redirectsConfigured: LEGACY_REDIRECT_MAP.length,
    robotsStatus: 'Active - Serving Googlebot & Google-Extended directives',
    sitemapStatus: 'Active - Serving standard XML format compliant with sitemaps.org',
  });
});

// 5. Mount Vite in dev, or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  // Static assets serving with no-cache to guarantee instant visual updates
  const staticOptions = {
    setHeaders: (res: express.Response) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    },
  };
  app.use('/images', express.static(path.join(__dirname, 'public/images'), staticOptions));
  app.use('/src/assets/images', express.static(path.join(__dirname, 'src/assets/images'), staticOptions));
  app.use(express.static(path.join(__dirname, 'public'), staticOptions));

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[SAFE TEAM] Server running at ${APP_URL} (Port ${PORT})`);
  });
}

startServer();
