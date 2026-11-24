export const DEFAULT_CANONICAL_URL = 'https://alliancegem.co.kr';
export const SITE_BRAND_NAME = '릴게임 안전지대 SAFE TEAM';

/**
 * Main page title: EXACTLY 22 characters including spaces (공백 포함 22자)
 * "릴게임 안전지대 SAFE TEAM 자료실" -> length = 22
 */
export const HOME_META_TITLE = '릴게임 안전지대 SAFE TEAM 자료실';

/**
 * Main page meta description: 128 characters including spaces (최대 150자 이내)
 */
export const HOME_META_DESCRIPTION =
  '바다이야기, 야마토, 손오공, 오션파라다이스, 황금성, 다빈치 등 6대 릴게임 대표 기종의 제원과 역사, 법제 변천사 및 불법 사이트 피해 예방 가이드를 공적 사료로 정리한 SAFE TEAM 아카이브에서 지금 바로 확인해 보세요.';

export const DEFAULT_OG_IMAGE_PATH = '/images/bada.webp';

export function normalizeCanonicalOrigin(rawUrl?: string): string {
  const fallback = DEFAULT_CANONICAL_URL;
  if (!rawUrl) return fallback;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return fallback;
    }
    // Unify www.alliancegem.co.kr -> alliancegem.co.kr to avoid duplicate canonicals
    const hostname =
      parsed.hostname.toLowerCase() === 'www.alliancegem.co.kr'
        ? 'alliancegem.co.kr'
        : parsed.hostname;
    const port = parsed.port ? `:${parsed.port}` : '';
    const protocol =
      hostname === 'alliancegem.co.kr' ? 'https:' : parsed.protocol;
    return `${protocol}//${hostname}${port}`;
  } catch {
    return fallback;
  }
}
