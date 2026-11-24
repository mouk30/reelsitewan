import { getBaseDomain } from './schemaFactory';
import { DEFAULT_OG_IMAGE_PATH, SITE_BRAND_NAME } from './seoConfig';

export interface MetaConfig {
  title: string;
  description: string;
  canonicalPath: string | null;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  jsonLdSchema?: Record<string, any> | null;
  robots?: string;
}

export function updatePageMeta(config: MetaConfig) {
  if (typeof document === 'undefined') return;

  const domain = getBaseDomain();
  const fullCanonicalUrl = config.canonicalPath
    ? `${domain}${config.canonicalPath}`
    : null;

  // 1. Update Title
  document.title = config.title;

  // 2. Helper to set/create meta tag
  const setMeta = (nameOrProperty: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameOrProperty, key);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  // 3. Update Standard Meta
  setMeta('name', 'description', config.description);
  setMeta('name', 'robots', config.robots || 'index, follow');

  // 4. Update OpenGraph
  const rawImagePath = (config.ogImage || DEFAULT_OG_IMAGE_PATH).split('?')[0];
  const fullOgImage = rawImagePath.startsWith('http')
    ? rawImagePath
    : `${domain}${rawImagePath}`;

  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:site_name', SITE_BRAND_NAME);
  setMeta('property', 'og:image', fullOgImage);
  if (config.ogImageAlt) {
    setMeta('property', 'og:image:alt', config.ogImageAlt);
  }
  if (fullCanonicalUrl) {
    setMeta('property', 'og:url', fullCanonicalUrl);
  }

  // 5. Update Twitter
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);
  setMeta('name', 'twitter:image', fullOgImage);

  // 6. Update Canonical Link (remove on 404/noindex pages without canonical)
  const existingCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (fullCanonicalUrl) {
    if (existingCanonical) {
      existingCanonical.href = fullCanonicalUrl;
    } else {
      const canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      canonicalEl.href = fullCanonicalUrl;
      document.head.appendChild(canonicalEl);
    }
  } else if (existingCanonical) {
    existingCanonical.remove();
  }

  // 7. Update JSON-LD Script tag
  const existingScript = document.getElementById('schema-ld-json') as HTMLScriptElement | null;
  if (config.jsonLdSchema) {
    if (existingScript) {
      existingScript.textContent = JSON.stringify(config.jsonLdSchema, null, 2);
    } else {
      const scriptEl = document.createElement('script');
      scriptEl.id = 'schema-ld-json';
      scriptEl.type = 'application/ld+json';
      scriptEl.textContent = JSON.stringify(config.jsonLdSchema, null, 2);
      document.head.appendChild(scriptEl);
    }
  } else if (existingScript) {
    existingScript.remove();
  }
}
