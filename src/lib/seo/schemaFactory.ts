import type { GameDossier, EditorialArticle } from '../../data/archiveData';
import {
  DEFAULT_CANONICAL_URL,
  HOME_META_DESCRIPTION,
  HOME_META_TITLE,
  SITE_BRAND_NAME,
  normalizeCanonicalOrigin,
} from './seoConfig';

export function getBaseDomain(): string {
  if (typeof window !== 'undefined' && window.location.origin) {
    return normalizeCanonicalOrigin(window.location.origin);
  }
  return DEFAULT_CANONICAL_URL;
}

export function generateOrganizationSchema(domain: string = getBaseDomain()) {
  return {
    '@type': 'Organization',
    '@id': `${domain}/#organization`,
    name: SITE_BRAND_NAME,
    alternateName: '릴게임 SAFE TEAM',
    url: `${domain}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${domain}/favicon-512x512.png`,
    },
    description:
      '1990~2000년대 한국 아케이드 및 릴게임 역사·문화·기기 구조 및 안전 정보를 기록하는 비영리 학술 디지털 아카이브',
    publishingPrinciples: `${domain}/about#editorial-policy`,
    knowsAbout: [
      '한국 아케이드 게임 역사',
      '바다이야기 사태',
      '기계식 릴머신 구조',
      '게임산업진흥에 관한 법률',
      '불법 사설 게임 피해 예방',
    ],
  };
}

export function generateWebsiteSchema(domain: string = getBaseDomain()) {
  return {
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    url: `${domain}/`,
    name: SITE_BRAND_NAME,
    alternateName: 'SAFE TEAM',
    description: HOME_META_DESCRIPTION,
    inLanguage: 'ko-KR',
    publisher: {
      '@id': `${domain}/#organization`,
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; path: string }[],
  domain: string = getBaseDomain()
) {
  const fullItems = [{ name: '홈', path: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http')
        ? item.path
        : `${domain}${item.path === '/' ? '/' : item.path}`,
    })),
  };
}

export function generateGameDossierSchema(
  game: GameDossier,
  domain: string = getBaseDomain()
) {
  const pageUrl = `${domain}/games/${game.slug}`;
  const cleanPoster = game.posterImage.split('?')[0];
  return {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    isPartOf: {
      '@id': `${domain}/#website`,
    },
    author: {
      '@id': `${domain}/#organization`,
    },
    headline: `${game.koreanName} (${game.englishName}) 스펙·역사 | SAFE TEAM`,
    description: game.directAnswer,
    image: `${domain}${cleanPoster}`,
    datePublished: `${game.releaseYear}-01-01T00:00:00+09:00`,
    dateModified: `${game.dateModified || '2026-11-19'}T00:00:00+09:00`,
    mainEntityOfPage: pageUrl,
    inLanguage: 'ko-KR',
    publisher: {
      '@id': `${domain}/#organization`,
    },
    about: {
      '@type': 'Thing',
      name: game.koreanName,
      alternateName: game.englishName,
      description: game.shortSummary,
    },
  };
}

export function generateEditorialArticleSchema(
  article: EditorialArticle,
  domain: string = getBaseDomain()
) {
  const pageUrl = `${domain}/journal/${article.slug}`;
  return {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    isPartOf: {
      '@id': `${domain}/#website`,
    },
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorRole,
    },
    headline: article.title,
    alternativeHeadline: article.subtitle,
    description: article.directAnswer,
    datePublished: `${article.datePublished}T09:00:00+09:00`,
    dateModified: `${article.dateModified}T09:00:00+09:00`,
    mainEntityOfPage: pageUrl,
    inLanguage: 'ko-KR',
    publisher: {
      '@id': `${domain}/#organization`,
    },
  };
}

export function generateCollectionSchema(
  title: string,
  description: string,
  path: string,
  items: { name: string; url: string }[],
  domain: string = getBaseDomain()
) {
  const pageUrl = `${domain}${path}`;
  return {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: {
      '@id': `${domain}/#website`,
    },
    about: {
      '@id': `${domain}/#organization`,
    },
    inLanguage: 'ko-KR',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${domain}${item.url}`,
      })),
    },
  };
}

export function buildPageGraph(
  pageType:
    | 'home'
    | 'game'
    | 'article'
    | 'collection'
    | 'about'
    | 'guide'
    | 'comparator'
    | 'archive',
  data?: {
    game?: GameDossier;
    article?: EditorialArticle;
    collectionTitle?: string;
    collectionDesc?: string;
    collectionPath?: string;
    collectionItems?: { name: string; url: string }[];
    breadcrumbs?: { name: string; path: string }[];
  },
  domain: string = getBaseDomain()
) {
  const graph: any[] = [
    generateOrganizationSchema(domain),
    generateWebsiteSchema(domain),
  ];

  if (data?.breadcrumbs && data.breadcrumbs.length > 0) {
    graph.push(generateBreadcrumbSchema(data.breadcrumbs, domain));
  }

  if (pageType === 'home') {
    graph.push({
      '@type': 'WebPage',
      '@id': `${domain}/#webpage`,
      url: `${domain}/`,
      name: HOME_META_TITLE,
      description: HOME_META_DESCRIPTION,
      isPartOf: {
        '@id': `${domain}/#website`,
      },
      about: {
        '@id': `${domain}/#organization`,
      },
      inLanguage: 'ko-KR',
    });
  } else if (pageType === 'game' && data?.game) {
    graph.push(generateGameDossierSchema(data.game, domain));
  } else if (pageType === 'article' && data?.article) {
    graph.push(generateEditorialArticleSchema(data.article, domain));
  } else if (pageType === 'collection' && data?.collectionTitle) {
    graph.push(
      generateCollectionSchema(
        data.collectionTitle,
        data.collectionDesc || '',
        data.collectionPath || '/encyclopedia',
        data.collectionItems || [],
        domain
      )
    );
  } else if (pageType === 'about') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${domain}/about#webpage`,
      url: `${domain}/about`,
      name: 'SAFE TEAM 소개 및 편집 윤리 원칙 | 릴게임 안전지대',
      description:
        '비영리 학술 아카이브 SAFE TEAM의 설립 목적, 절대적 무사행 원칙, 공공 1차 사료 기반 팩트체크 및 편집 가이드라인을 안내합니다.',
      isPartOf: { '@id': `${domain}/#website` },
      about: { '@id': `${domain}/#organization` },
      inLanguage: 'ko-KR',
    });
  } else if (pageType === 'guide') {
    graph.push({
      '@type': 'WebPage',
      '@id': `${domain}/guide#webpage`,
      url: `${domain}/guide`,
      name: '릴게임 관련 법령 및 피해 예방 가이드 | SAFE TEAM',
      description:
        '게임산업진흥에 관한 법률 처벌 기준과 온라인 불법 사설 릴게임의 3대 사기 수법 및 공식 신고 기관을 안내합니다.',
      isPartOf: { '@id': `${domain}/#website` },
      about: { '@id': `${domain}/#organization` },
      inLanguage: 'ko-KR',
    });
  } else if (pageType === 'comparator') {
    graph.push({
      '@type': 'WebPage',
      '@id': `${domain}/comparator#webpage`,
      url: `${domain}/comparator`,
      name: '릴게임 6대 기종 스펙 비교 매트릭스 | SAFE TEAM',
      description:
        '바다이야기, 야마토, 손오공, 오션파라다이스, 황금성, 다빈치의 릴 구동 메커니즘, 디스플레이, 페이라인, 보너스 구조를 표로 비교합니다.',
      isPartOf: { '@id': `${domain}/#website` },
      about: { '@id': `${domain}/#organization` },
      inLanguage: 'ko-KR',
    });
  } else if (pageType === 'archive') {
    graph.push({
      '@type': 'WebPage',
      '@id': `${domain}/archive#webpage`,
      url: `${domain}/archive`,
      name: '1990~2000년대 오락실 추억 아카이브 | SAFE TEAM',
      description:
        '1990년대 골목 전자오락실의 동전 게임 문화부터 2000년대 성인 릴게임장으로의 공간 전이를 대중문화 사료와 함께 기록합니다.',
      isPartOf: { '@id': `${domain}/#website` },
      about: { '@id': `${domain}/#organization` },
      inLanguage: 'ko-KR',
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
