import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import {
  CORE_GAMES,
  EDITORIAL_ARTICLES,
  LEGACY_REDIRECT_MAP,
} from './src/data/archiveData.ts';
import {
  DEFAULT_CANONICAL_URL,
  normalizeCanonicalOrigin,
} from './src/lib/seo/seoConfig.ts';
import {
  buildRobotsTxt,
  buildSitemapXml,
  getSitemapEntries,
} from './src/lib/seo/sitemapBuilder.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust standard reverse-proxy hops (Cloud Run, Nginx, Cloudflare, Vercel) without trusting arbitrary client spoofing
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.disable('x-powered-by');

const HOST_HEADER_REGEX = /^[a-z0-9.-]+(:\d{1,5})?$/i;

function getExtraAllowedHosts(): Set<string> {
  const allowed = new Set<string>(['alliancegem.co.kr', 'www.alliancegem.co.kr', 'localhost', '127.0.0.1']);
  const envUrls = [
    process.env.CANONICAL_URL,
    process.env.SITE_URL,
    process.env.APP_URL,
  ];
  for (const raw of envUrls) {
    if (!raw || raw === 'MY_APP_URL') continue;
    try {
      allowed.add(new URL(raw).hostname.toLowerCase());
    } catch {
      // Ignore malformed env value
    }
  }
  if (process.env.ALLOWED_HOSTS) {
    for (const host of process.env.ALLOWED_HOSTS.split(',')) {
      const cleaned = host.trim().toLowerCase();
      if (cleaned) allowed.add(cleaned);
    }
  }
  return allowed;
}

const ALLOWED_EXACT_HOSTS = getExtraAllowedHosts();

function isTrustedHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (ALLOWED_EXACT_HOSTS.has(lower)) return true;
  if (lower.endsWith('.run.app') || lower.endsWith('.vercel.app')) return true;
  return false;
}

function resolveRequestBaseUrl(req: Request): string {
  // 1. Explicit canonical domain env takes top priority when configured
  const explicitCanonical = process.env.CANONICAL_URL || process.env.SITE_URL;
  if (explicitCanonical && explicitCanonical !== 'MY_APP_URL') {
    return normalizeCanonicalOrigin(explicitCanonical);
  }

  // 2. Safely parse reverse-proxy headers (X-Forwarded-Host / Host & X-Forwarded-Proto)
  const rawForwardedHost = req.get('x-forwarded-host');
  const rawHost = rawForwardedHost
    ? rawForwardedHost.split(',')[0].trim()
    : (req.get('host') || '').trim();

  if (rawHost && HOST_HEADER_REGEX.test(rawHost)) {
    const hostname = rawHost.split(':')[0].toLowerCase();
    if (isTrustedHostname(hostname)) {
      const rawProto = req.get('x-forwarded-proto');
      const protoCandidate = rawProto
        ? rawProto.split(',')[0].trim().toLowerCase()
        : req.protocol;
      const protocol =
        protoCandidate === 'https' || protoCandidate === 'http'
          ? protoCandidate
          : 'https';
      return normalizeCanonicalOrigin(`${protocol}://${rawHost}`);
    }
  }

  // 3. Platform-injected APP_URL fallback
  if (process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL') {
    return normalizeCanonicalOrigin(process.env.APP_URL);
  }

  // 4. Safe canonical fallback (prevents Host-header spoofing)
  return DEFAULT_CANONICAL_URL;
}

// 1. Legacy 301 Redirect Middleware (Server-side 301 for crawlers & direct requests)
app.use((req, res, next) => {
  const reqPath = req.path.toLowerCase();
  const fullUrlWithQuery = req.originalUrl.toLowerCase();

  // Immediate 301 redirect for /pgi and its sub-routes
  if (reqPath === '/pgi' || reqPath.startsWith('/pgi/') || reqPath.startsWith('/pgi.')) {
    return res.redirect(301, '/');
  }

  const matchingRule = LEGACY_REDIRECT_MAP.find((rule) => {
    const legacyLower = rule.legacyUrl.toLowerCase();
    return legacyLower === reqPath || legacyLower === fullUrlWithQuery;
  });

  if (matchingRule) {
    return res.redirect(matchingRule.statusCode, matchingRule.canonicalSlug);
  }

  // Also catch legacy paths defined in older configs
  const extraLegacyMap: Record<string, string> = {
    '/intro': '/about',
    '/intro.html': '/about',
    '/index.php': '/',
    '/main.html': '/',
    '/board/free': '/journal',
    '/history': '/archive',
    '/safe-guide': '/guide',
  };
  if (extraLegacyMap[reqPath]) {
    return res.redirect(301, extraLegacyMap[reqPath]);
  }

  next();
});

// 2. Google Robots.txt Route (registered before static middleware to avoid conflicts)
app.get(['/robots.txt', '/robots.txt/'], (req: Request, res: Response) => {
  const baseUrl = resolveRequestBaseUrl(req);
  const robotsTxt = buildRobotsTxt(baseUrl);
  res.status(200);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.send(robotsTxt);
});

// 3. Google XML Sitemap + Image Sitemap Route (supports /sitemap.xml and /sitemap.xml/)
app.get(['/sitemap.xml', '/sitemap.xml/'], (req: Request, res: Response) => {
  const baseUrl = resolveRequestBaseUrl(req);
  const xml = buildSitemapXml(baseUrl, publicDir);
  res.status(200);
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.send(xml);
});

// 4. API for System Diagnostics & Verification
app.get('/api/seo-audit', (req: Request, res: Response) => {
  const baseUrl = resolveRequestBaseUrl(req);
  const stats = getSitemapEntries(baseUrl, publicDir);
  res.json({
    status: 'ok',
    appUrl: baseUrl,
    totalIndexedGames: CORE_GAMES.length,
    totalArticles: EDITORIAL_ARTICLES.length,
    totalSitemapUrls: stats.entries.length,
    totalSitemapImages: stats.totalImages,
    redirectsConfigured: LEGACY_REDIRECT_MAP.length,
    robotsStatus: 'Active - Serving Googlebot & Google-Extended directives',
    sitemapStatus: 'Active - Serving XML Sitemap 0.9 + Google Image Sitemap 1.1',
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
  app.use(express.static(publicDir, staticOptions));

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
    console.log(`[SAFE TEAM] Server running on port ${PORT} (Canonical fallback: ${DEFAULT_CANONICAL_URL})`);
  });
}

startServer();
