import React, { useState } from 'react';
import { Search, Menu, X, Shield, BookOpen, Layers, History, FileText, Info } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '홈', path: '/' },
    { label: '릴게임 백과', path: '/encyclopedia' },
    { label: '기기 비교', path: '/comparator' },
    { label: '추억 아카이브', path: '/archive' },
    { label: '안전 가이드', path: '/guide' },
    { label: '매거진', path: '/journal' },
    { label: '소개', path: '/about' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E2DFD9] transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark (Display Serif + Clean Subtext) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleLinkClick('/')}
              className="group flex flex-col text-left focus:outline-none"
              aria-label="SAFE TEAM 홈으로 이동"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#101B2A] transition-colors group-hover:text-[#C5A46D]">
                SAFE TEAM
              </span>
              <span className="text-[11px] font-sans tracking-widest text-[#737780] uppercase -mt-0.5">
                릴게임 안전지대 · 디지털 아카이브
              </span>
            </button>
          </div>

          {/* Zone 2: Primary Nav Links (Single-Line, 4-5 items, clean hover underline) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#161A20]" aria-label="메인 내비게이션">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#C5A46D] ${
                    isActive ? 'text-[#101B2A] font-semibold' : 'text-[#737780]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A46D]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (Archive Search Button) + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#101B2A] bg-white border border-[#E2DFD9] rounded hover:border-[#C5A46D] hover:bg-[#FBF9F5] transition-colors shadow-2xs whitespace-nowrap"
              aria-label="아카이브 검색창 열기"
            >
              <Search className="w-3.5 h-3.5 text-[#737780]" />
              <span className="hidden sm:inline">아카이브 검색</span>
              <span className="text-[10px] text-[#737780] bg-[#F7F5F0] px-1 py-0.5 rounded border border-[#E2DFD9] hidden md:inline">
                ⌘K
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#101B2A] rounded hover:bg-black/5 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2DFD9] bg-[#F7F5F0] px-4 pt-4 pb-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`flex items-center justify-between px-3 py-3 rounded text-left text-base min-h-[44px] ${
                    isActive
                      ? 'bg-[#101B2A] text-white font-medium'
                      : 'text-[#161A20] hover:bg-black/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2DFD9] text-xs text-[#737780] leading-relaxed">
            <p className="font-semibold text-[#101B2A] mb-1">릴게임 SAFE TEAM 안전지대</p>
            <p>본 사이트는 사행 행위 유도 및 베팅을 일체 배제한 순수 역사·문화 학술 아카이브입니다.</p>
          </div>
        </div>
      )}
    </header>
  );
};
