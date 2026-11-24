import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import {
  buildRobotsTxt,
  buildSitemapXml,
  getSitemapEntries,
} from '../src/lib/seo/sitemapBuilder.ts';
import { DEFAULT_CANONICAL_URL, normalizeCanonicalOrigin } from '../src/lib/seo/seoConfig.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

function resolveBuildCanonicalUrl(): string {
  const envUrl = process.env.CANONICAL_URL || process.env.SITE_URL;
  if (envUrl && envUrl !== 'MY_APP_URL') {
    return normalizeCanonicalOrigin(envUrl);
  }
  return DEFAULT_CANONICAL_URL;
}

const baseUrl = resolveBuildCanonicalUrl();
const sitemapXml = buildSitemapXml(baseUrl, publicDir);
const robotsTxt = buildRobotsTxt(baseUrl);
const stats = getSitemapEntries(baseUrl, publicDir);

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

console.log(
  `[SEO] Generated public/sitemap.xml (${stats.entries.length} URLs, ${stats.totalImages} images) & public/robots.txt for ${baseUrl}`
);
