import { getBaseDomain } from './schemaFactory';

export interface MetaConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  jsonLdSchema?: Record<string, any>;
  robots?: string;
}

export function updatePageMeta(config: MetaConfig) {
  if (typeof document === 'undefined') return;

  const domain = getBaseDomain();
  const fullCanonicalUrl = `${domain}${config.canonicalPath}`;

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
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:url', fullCanonicalUrl);
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:site_name', '릴게임 SAFE TEAM | 릴게임 안전지대');

  // 5. Update Twitter
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);

  // 6. Update Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.rel = 'canonical';
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.href = fullCanonicalUrl;

  // 7. Update JSON-LD Script tag
  if (config.jsonLdSchema) {
    let scriptEl = document.getElementById('schema-ld-json') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'schema-ld-json';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(config.jsonLdSchema, null, 2);
  }
}
