import { GameDossier, EditorialArticle } from '../../data/archiveData';

export function getBaseDomain(): string {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return 'https://alliancegem.co.kr';
}

export function generateOrganizationSchema(domain: string = getBaseDomain()) {
  return {
    '@type': 'Organization',
    '@id': `${domain}/#organization`,
    name: '릴게임 SAFE TEAM',
    alternateName: '릴게임 안전지대',
    url: `${domain}/`,
    description: '1990~2000년대 한국 아케이드 및 릴게임 역사·문화·기기 구조 및 안전 정보를 기록하는 비영리 학술 디지털 아카이브',
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
    name: '릴게임 SAFE TEAM | 릴게임 안전지대',
    alternateName: 'SAFE TEAM',
    description: '릴게임 SAFE TEAM 안전지대. 바다이야기, 야마토, 손오공, 오션파라다이스, 황금성 등 릴게임의 역사와 특징, 관련 정보를 살펴보는 릴게임 정보 아카이브.',
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
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${domain}${item.path}`,
    })),
  };
}

export function generateGameDossierSchema(
  game: GameDossier,
  domain: string = getBaseDomain()
) {
  const pageUrl = `${domain}/games/${game.slug}`;
  return {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    isPartOf: {
      '@id': `${domain}/#website`,
    },
    author: {
      '@id': `${domain}/#organization`,
    },
    headline: `${game.koreanName} (${game.englishName}) - 기기 구조 및 역사 기록 백과`,
    description: game.directAnswer,
    datePublished: `${game.releaseYear}-01-01T00:00:00+09:00`,
    dateModified: '2026-10-17T00:00:00+09:00',
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
  games: GameDossier[],
  domain: string = getBaseDomain()
) {
  const pageUrl = `${domain}${path}`;
  return {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description: description,
    isPartOf: {
      '@id': `${domain}/#website`,
    },
    about: {
      '@id': `${domain}/#organization`,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: games.map((game, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: game.koreanName,
        url: `${domain}/games/${game.slug}`,
      })),
    },
  };
}

export function buildPageGraph(
  pageType: 'home' | 'game' | 'article' | 'collection' | 'about' | 'guide',
  data?: {
    game?: GameDossier;
    article?: EditorialArticle;
    collectionTitle?: string;
    collectionDesc?: string;
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
      name: '릴게임 SAFE TEAM | 릴게임 안전지대',
      description:
        '릴게임 SAFE TEAM 안전지대. 바다이야기, 야마토, 손오공, 오션파라다이스, 황금성 등 릴게임의 역사와 특징, 관련 정보를 살펴보는 릴게임 정보 아카이브.',
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
        '/encyclopedia',
        [],
        domain
      )
    );
  } else if (pageType === 'about') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${domain}/about#webpage`,
      url: `${domain}/about`,
      name: 'SAFE TEAM 소개 및 편집 가이드라인 | 릴게임 안전지대',
      description: 'SAFE TEAM의 설립 목적, 객관적 학술 아카이브 검증 기준, 사행성 불법 게임과의 엄격한 분리 정책 안내.',
      isPartOf: { '@id': `${domain}/#website` },
      about: { '@id': `${domain}/#organization` },
      inLanguage: 'ko-KR',
    });
  } else if (pageType === 'guide') {
    graph.push({
      '@type': 'WebPage',
      '@id': `${domain}/guide#webpage`,
      url: `${domain}/guide`,
      name: '릴게임 관련 제도 및 이용자 안전 가이드 | SAFE TEAM',
      description: '게임산업진흥에 관한 법률, 불법 온라인 사설 릴게임의 위험성 분석 및 피해 예방 안내.',
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
