/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { EncyclopediaHubView } from './views/EncyclopediaHubView';
import { GameDetailView } from './views/GameDetailView';
import { ComparatorView } from './views/ComparatorView';
import { NostalgiaArchiveView } from './views/NostalgiaArchiveView';
import { SafetyGuideView } from './views/SafetyGuideView';
import { JournalView } from './views/JournalView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { AboutView } from './views/AboutView';
import { RedirectAuditView } from './views/RedirectAuditView';
import { CORE_GAMES, EDITORIAL_ARTICLES, LEGACY_REDIRECT_MAP } from './data/archiveData';
import { updatePageMeta } from './lib/seo/headManager';
import { buildPageGraph } from './lib/seo/schemaFactory';
import {
  DEFAULT_OG_IMAGE_PATH,
  HOME_META_DESCRIPTION,
  HOME_META_TITLE,
} from './lib/seo/seoConfig';
import { ArrowLeft } from 'lucide-react';

// Helper to resolve incoming legacy URLs, trailing slashes, or aliases
function resolvePath(rawPath: string): string {
  if (!rawPath) return '/';
  const path = rawPath.trim();
  const cleanPath = path.length > 1 ? path.replace(/\/+$/, '') : '/';
  const lowerPath = cleanPath.toLowerCase();

  // Redirect /pgi, /pgi/*, /pgi.html directly to root
  if (lowerPath === '/pgi' || lowerPath.startsWith('/pgi/') || lowerPath.startsWith('/pgi.')) {
    return '/';
  }

  // Match legacy 301 redirect map
  const redirectRule = LEGACY_REDIRECT_MAP.find(
    (r) =>
      r.legacyUrl.toLowerCase() === path.toLowerCase() ||
      r.legacyUrl.toLowerCase() === lowerPath
  );
  if (redirectRule) {
    return redirectRule.canonicalSlug;
  }

  return cleanPath || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const initialPath = window.location.pathname || '/';
      const resolved = resolvePath(initialPath);
      if (resolved !== initialPath) {
        window.history.replaceState({}, '', resolved);
      }
      return resolved;
    }
    return '/';
  });

  const [searchOpen, setSearchOpen] = useState(false);

  // Synchronize path and SEO metadata
  const navigateTo = (path: string, pushHistory = true) => {
    const targetPath = resolvePath(path);

    setCurrentPath(targetPath);
    if (pushHistory && typeof window !== 'undefined') {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Browser popstate listener (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolvePath(window.location.pathname || '/');
      setCurrentPath(resolved);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Page Title, Meta, Canonical, OpenGraph, and Schema.org JSON-LD dynamically
  useEffect(() => {
    const normalized = resolvePath(currentPath);

    if (normalized === '/') {
      updatePageMeta({
        title: HOME_META_TITLE,
        description: HOME_META_DESCRIPTION,
        canonicalPath: '/',
        ogImage: DEFAULT_OG_IMAGE_PATH,
        ogImageAlt: '릴게임 안전지대 SAFE TEAM 대표 아카이브 이미지',
        jsonLdSchema: buildPageGraph('home'),
      });
      return;
    }

    if (normalized === '/encyclopedia') {
      const desc =
        '바다이야기, 야마토, 손오공, 오션파라다이스, 황금성, 다빈치 등 한국 아케이드 릴게임 6대 기종의 하드웨어 제원, 구동 방식, 역사적 배경과 규제 내력을 한곳에서 살펴보세요.';
      updatePageMeta({
        title: '6대 대표 릴게임 기종 백과 | SAFE TEAM',
        description: desc,
        canonicalPath: '/encyclopedia',
        ogImage: DEFAULT_OG_IMAGE_PATH,
        jsonLdSchema: buildPageGraph('collection', {
          collectionTitle: '6대 대표 릴게임 기종 백과',
          collectionDesc: desc,
          collectionPath: '/encyclopedia',
          collectionItems: CORE_GAMES.map((g) => ({
            name: g.koreanName,
            url: `/games/${g.slug}`,
          })),
          breadcrumbs: [{ name: '릴게임 백과', path: '/encyclopedia' }],
        }),
      });
      return;
    }

    if (normalized.startsWith('/games/')) {
      const slug = normalized.replace('/games/', '');
      const game = CORE_GAMES.find((g) => g.slug === slug);
      if (game) {
        updatePageMeta({
          title: `${game.koreanName} (${game.englishName}) 스펙·역사 | SAFE TEAM`,
          description: game.directAnswer,
          canonicalPath: `/games/${game.slug}`,
          ogType: 'article',
          ogImage: game.posterImage,
          ogImageAlt: `${game.koreanName} 대표 아케이드 포스터`,
          jsonLdSchema: buildPageGraph('game', {
            game,
            breadcrumbs: [
              { name: '릴게임 백과', path: '/encyclopedia' },
              { name: game.koreanName, path: `/games/${game.slug}` },
            ],
          }),
        });
        return;
      }
    }

    if (normalized === '/comparator') {
      updatePageMeta({
        title: '릴게임 6대 기종 스펙 비교 매트릭스 | SAFE TEAM',
        description:
          '바다이야기, 야마토, 손오공, 오션파라다이스, 황금성, 다빈치의 릴 구동 메커니즘, 디스플레이, 페이라인, 보너스 구조와 법적 처분 내력을 표로 횡단 비교합니다.',
        canonicalPath: '/comparator',
        jsonLdSchema: buildPageGraph('comparator', {
          breadcrumbs: [{ name: '기기 비교', path: '/comparator' }],
        }),
      });
      return;
    }

    if (normalized === '/archive') {
      updatePageMeta({
        title: '1990~2000년대 오락실 추억 아카이브 | SAFE TEAM',
        description:
          '1990년대 골목 전자오락실의 동전 게임 문화부터 PC방 보급과 2000년대 성인 릴게임장으로의 공간 전이를 대중문화 사료와 함께 기록합니다.',
        canonicalPath: '/archive',
        ogImage: '/images/nostalgia.jpg',
        ogImageAlt: '1990년대 한국 골목 오락실과 CRT 브라운관 모니터들',
        jsonLdSchema: buildPageGraph('archive', {
          breadcrumbs: [{ name: '추억 아카이브', path: '/archive' }],
        }),
      });
      return;
    }

    if (normalized === '/guide') {
      updatePageMeta({
        title: '릴게임 관련 법령 및 피해 예방 가이드 | SAFE TEAM',
        description:
          '게임산업진흥에 관한 법률 처벌 기준과 온라인 불법 사설 릴게임의 3대 사기 수법(확률 조작·추가 입금·먹튀) 및 공식 신고 기관을 안내합니다.',
        canonicalPath: '/guide',
        ogImage: '/images/seal.jpg',
        ogImageAlt: 'SAFE TEAM 검증 인장',
        jsonLdSchema: buildPageGraph('guide', {
          breadcrumbs: [{ name: '안전 가이드', path: '/guide' }],
        }),
      });
      return;
    }

    if (normalized === '/journal') {
      const desc =
        '한국 전자오락실 공간 사회학, 2006년 바다이야기 사태와 경품용 상품권 제도 해부, 사이버 사기 예방 분석 등 SAFE TEAM 기획 리포트 모음입니다.';
      updatePageMeta({
        title: '아케이드 역사·제도 탐사 리포트 | SAFE TEAM 매거진',
        description: desc,
        canonicalPath: '/journal',
        jsonLdSchema: buildPageGraph('collection', {
          collectionTitle: 'SAFE TEAM 학술 탐사 매거진',
          collectionDesc: desc,
          collectionPath: '/journal',
          collectionItems: EDITORIAL_ARTICLES.map((a) => ({
            name: a.title,
            url: `/journal/${a.slug}`,
          })),
          breadcrumbs: [{ name: '매거진', path: '/journal' }],
        }),
      });
      return;
    }

    if (normalized.startsWith('/journal/')) {
      const slug = normalized.replace('/journal/', '');
      const article = EDITORIAL_ARTICLES.find((a) => a.slug === slug);
      if (article) {
        updatePageMeta({
          title: `${article.title} | SAFE TEAM 매거진`,
          description: article.directAnswer,
          canonicalPath: `/journal/${article.slug}`,
          ogType: 'article',
          jsonLdSchema: buildPageGraph('article', {
            article,
            breadcrumbs: [
              { name: '매거진', path: '/journal' },
              { name: article.title, path: `/journal/${article.slug}` },
            ],
          }),
        });
        return;
      }
    }

    if (normalized === '/about') {
      updatePageMeta({
        title: 'SAFE TEAM 소개 및 편집 윤리 원칙 | 릴게임 안전지대',
        description:
          '비영리 학술 아카이브 SAFE TEAM의 설립 목적, 절대적 무사행 원칙, 공공 1차 사료 기반 팩트체크 및 편집 가이드라인을 안내합니다.',
        canonicalPath: '/about',
        jsonLdSchema: buildPageGraph('about', {
          breadcrumbs: [{ name: '소개', path: '/about' }],
        }),
      });
      return;
    }

    if (normalized === '/audit') {
      updatePageMeta({
        title: '레거시 URL 리다이렉트 및 기술 SEO 감사 | SAFE TEAM',
        description:
          '구형 레거시 경로의 301 영구 이전 매핑 테이블과 크롤러 색인 상태를 점검하는 SAFE TEAM 내부 기술 검증 페이지입니다.',
        canonicalPath: '/audit',
        robots: 'noindex, follow',
        jsonLdSchema: null,
      });
      return;
    }

    // 404 Not Found SEO Metadata
    updatePageMeta({
      title: '페이지를 찾을 수 없습니다 (404) | SAFE TEAM',
      description:
        '요청하신 페이지가 존재하지 않거나 이전되었습니다. SAFE TEAM 릴게임 안전지대 아카이브의 공식 메뉴를 이용해 주세요.',
      canonicalPath: null,
      robots: 'noindex, nofollow',
      jsonLdSchema: null,
    });
  }, [currentPath]);

  // Route Renderer
  const renderCurrentView = () => {
    const normalized = resolvePath(currentPath);

    if (normalized === '/') {
      return <HomeView onNavigate={navigateTo} />;
    }
    if (normalized === '/encyclopedia') {
      return <EncyclopediaHubView onNavigate={navigateTo} />;
    }
    if (normalized.startsWith('/games/')) {
      const slug = normalized.replace('/games/', '');
      const game = CORE_GAMES.find((g) => g.slug === slug);
      if (game) {
        return <GameDetailView slug={slug} onNavigate={navigateTo} />;
      }
    }
    if (normalized === '/comparator') {
      return <ComparatorView onNavigate={navigateTo} />;
    }
    if (normalized === '/archive') {
      return <NostalgiaArchiveView onNavigate={navigateTo} />;
    }
    if (normalized === '/guide') {
      return <SafetyGuideView onNavigate={navigateTo} />;
    }
    if (normalized === '/journal') {
      return <JournalView onNavigate={navigateTo} />;
    }
    if (normalized.startsWith('/journal/')) {
      const slug = normalized.replace('/journal/', '');
      const article = EDITORIAL_ARTICLES.find((a) => a.slug === slug);
      if (article) {
        return <ArticleDetailView slug={slug} onNavigate={navigateTo} />;
      }
    }
    if (normalized === '/about') {
      return <AboutView onNavigate={navigateTo} />;
    }
    if (normalized === '/audit') {
      return <RedirectAuditView onNavigate={navigateTo} />;
    }

    // 404 Not Found Fallback
    return (
      <div className="py-24 max-w-xl mx-auto text-center space-y-6">
        <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
          ERROR 404
        </span>
        <h1 className="font-serif text-4xl font-bold text-[#101B2A]">
          요청하신 페이지를 찾을 수 없습니다
        </h1>
        <p className="text-sm text-[#737780] leading-relaxed">
          요청하신 경로는 존재하지 않거나 이전되었습니다. SAFE TEAM 아카이브의 공식 색인된 페이지를 확인해 주십시오.
        </p>
        <div className="pt-2">
          <a
            href="/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                navigateTo('/');
              }
            }}
            className="px-6 py-3 bg-[#101B2A] text-white rounded text-xs font-semibold hover:bg-[#162335] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A46D]" />
            <span>메인 아카이브로 돌아가기</span>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#161A20]">
      {/* Top Bar Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Container (1280px Max) */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderCurrentView()}
      </main>

      {/* Institutional Luxury Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigateTo}
      />
    </div>
  );
}
