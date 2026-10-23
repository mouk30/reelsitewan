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
import { ArrowLeft, BookOpen } from 'lucide-react';

// Helper to resolve incoming legacy URLs or aliases (e.g. /pgi from former domain index)
function resolvePath(rawPath: string): string {
  if (!rawPath) return '/';
  const path = rawPath.trim();
  const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
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

  return path;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const initialPath = window.location.pathname || '/';
      const resolved = resolvePath(initialPath);
      // If legacy path or /pgi, quietly normalize browser URL without full reload
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

  // Update Page Title, Meta, Canonical, and Schema.org JSON-LD dynamically
  useEffect(() => {
    if (currentPath === '/') {
      updatePageMeta({
        title: '릴게임 SAFE TEAM | 릴게임 안전지대',
        description:
          '릴게임 SAFE TEAM 안전지대. 바다이야기, 야마토, 손오공, 오션파라다이스, 황금성 등 릴게임의 역사와 특징, 관련 정보를 살펴보는 릴게임 정보 아카이브.',
        canonicalPath: '/',
        jsonLdSchema: buildPageGraph('home'),
      });
    } else if (currentPath === '/encyclopedia') {
      updatePageMeta({
        title: '릴게임 대표 기종 백과 | SAFE TEAM 안전지대',
        description:
          '바다이야기, 야마토, 손오공, 오션파라다이스, 황금성 등 대한민국 아케이드 릴게임 대표 기종의 제원, 역사, 구동 방식 백과사전.',
        canonicalPath: '/encyclopedia',
        jsonLdSchema: buildPageGraph('collection', {
          collectionTitle: '릴게임 대표 기종 백과',
          collectionDesc: '대한민국 아케이드 릴게임 대표 기종의 공식 사료 및 제원 백과',
          breadcrumbs: [{ name: '릴게임 백과', path: '/encyclopedia' }],
        }),
      });
    } else if (currentPath.startsWith('/games/')) {
      const slug = currentPath.replace('/games/', '');
      const game = CORE_GAMES.find((g) => g.slug === slug);
      if (game) {
        updatePageMeta({
          title: `${game.koreanName} (${game.englishName}) - 기기 구조 및 역사 기록 | SAFE TEAM`,
          description: game.directAnswer,
          canonicalPath: `/games/${game.slug}`,
          jsonLdSchema: buildPageGraph('game', {
            game,
            breadcrumbs: [
              { name: '릴게임 백과', path: '/encyclopedia' },
              { name: game.koreanName, path: `/games/${game.slug}` },
            ],
          }),
        });
      }
    } else if (currentPath === '/comparator') {
      updatePageMeta({
        title: '릴게임 기기 스펙 횡단 비교 매트릭스 | SAFE TEAM',
        description:
          '바다이야기, 야마토 등 7대 기종의 하드웨어 스펙, 릴 구동 방식, 페이라인, 당첨 메커니즘을 한눈에 비교하는 공식 매트릭스.',
        canonicalPath: '/comparator',
        jsonLdSchema: buildPageGraph('guide', {
          breadcrumbs: [{ name: '기기 비교', path: '/comparator' }],
        }),
      });
    } else if (currentPath === '/archive') {
      updatePageMeta({
        title: '1990~2000년대 오락실 추억 아카이브 | SAFE TEAM',
        description:
          '동전 한 닢의 낭만이 있던 1990년대 골목 전자오락실부터 2000년대 성인 릴게임장으로의 공간적 전이를 기록한 문화 아카이브.',
        canonicalPath: '/archive',
        jsonLdSchema: buildPageGraph('guide', {
          breadcrumbs: [{ name: '추억 아카이브', path: '/archive' }],
        }),
      });
    } else if (currentPath === '/guide') {
      updatePageMeta({
        title: '릴게임 관련 제도 및 이용자 안전 가이드 | SAFE TEAM 안전지대',
        description:
          '게임산업진흥에 관한 법률, 불법 온라인 사설 릴게임 3대 사기 수법 및 피해 예방 공식 가이드라인.',
        canonicalPath: '/guide',
        jsonLdSchema: buildPageGraph('guide', {
          breadcrumbs: [{ name: '안전 가이드', path: '/guide' }],
        }),
      });
    } else if (currentPath === '/journal') {
      updatePageMeta({
        title: 'SAFE TEAM 학술 탐사 매거진 및 기획 리포트',
        description:
          '한국 아케이드 산업의 법제사적 분기점, 2006 바다이야기 사태의 심층 해부, 대중문화 비평 리포트 모음.',
        canonicalPath: '/journal',
        jsonLdSchema: buildPageGraph('collection', {
          collectionTitle: 'SAFE TEAM 학술 매거진',
          collectionDesc: '아케이드 역사 및 제도 분석 심층 저널',
          breadcrumbs: [{ name: '매거진', path: '/journal' }],
        }),
      });
    } else if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '');
      const article = EDITORIAL_ARTICLES.find((a) => a.slug === slug);
      if (article) {
        updatePageMeta({
          title: `${article.title} | SAFE TEAM 매거진`,
          description: article.directAnswer,
          canonicalPath: `/journal/${article.slug}`,
          jsonLdSchema: buildPageGraph('article', {
            article,
            breadcrumbs: [
              { name: '매거진', path: '/journal' },
              { name: article.title, path: `/journal/${article.slug}` },
            ],
          }),
        });
      }
    } else if (currentPath === '/about') {
      updatePageMeta({
        title: 'SAFE TEAM 소개 및 편집 윤리 정책 | 릴게임 안전지대',
        description:
          'SAFE TEAM의 설립 목적, 사료 검증 기준, 비영리 학술 원칙 및 Google Technical SEO 가이드 준수 선언.',
        canonicalPath: '/about',
        jsonLdSchema: buildPageGraph('about', {
          breadcrumbs: [{ name: '소개', path: '/about' }],
        }),
      });
    } else if (currentPath === '/audit') {
      updatePageMeta({
        title: '레거시 URL 301 리다이렉트 & Google 색인 감사 | SAFE TEAM',
        description:
          '과거 구형 웹사이트 분석 기반 301 Redirect 매핑 테이블, XML Sitemap, Robots.txt 크롤러 검증 현황.',
        canonicalPath: '/audit',
        jsonLdSchema: buildPageGraph('guide', {
          breadcrumbs: [{ name: 'SEO 감사', path: '/audit' }],
        }),
      });
    }
  }, [currentPath]);

  // Route Renderer
  const renderCurrentView = () => {
    const normalized = resolvePath(currentPath);

    if (normalized === '/' || normalized.toLowerCase().startsWith('/pgi')) {
      return <HomeView onNavigate={navigateTo} />;
    }
    if (normalized === '/encyclopedia') {
      return <EncyclopediaHubView onNavigate={navigateTo} />;
    }
    if (normalized.startsWith('/games/')) {
      const slug = normalized.replace('/games/', '');
      return <GameDetailView slug={slug} onNavigate={navigateTo} />;
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
      return <ArticleDetailView slug={slug} onNavigate={navigateTo} />;
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
          <button
            onClick={() => navigateTo('/')}
            className="px-6 py-3 bg-[#101B2A] text-white rounded text-xs font-semibold hover:bg-[#162335] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A46D]" />
            <span>메인 아카이브로 돌아가기</span>
          </button>
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
