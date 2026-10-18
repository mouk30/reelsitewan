import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { CORE_GAMES, EDITORIAL_ARTICLES } from '../data/archiveData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate(window.location.pathname); // or open modal
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedGames = CORE_GAMES.filter(
    (g) =>
      !trimmed ||
      g.koreanName.toLowerCase().includes(trimmed) ||
      g.englishName.toLowerCase().includes(trimmed) ||
      g.developer.toLowerCase().includes(trimmed) ||
      g.shortSummary.toLowerCase().includes(trimmed) ||
      g.reelMechanism.toLowerCase().includes(trimmed)
  );

  const matchedArticles = EDITORIAL_ARTICLES.filter(
    (a) =>
      !trimmed ||
      a.title.toLowerCase().includes(trimmed) ||
      a.subtitle.toLowerCase().includes(trimmed) ||
      a.directAnswer.toLowerCase().includes(trimmed) ||
      a.summary.toLowerCase().includes(trimmed)
  );

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-[#F7F5F0] rounded-xl shadow-2xl border border-[#E2DFD9] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E2DFD9] bg-white">
          <Search className="w-5 h-5 text-[#737780] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="기기명, 역사적 사건, 규제 제도, 용어 검색 (예: 바다이야기, 상품권, 야마토)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#101B2A] placeholder-[#737780] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#737780] hover:text-[#101B2A] mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-[#737780] bg-[#F7F5F0] px-2 py-1 rounded border border-[#E2DFD9] hover:bg-stone-200"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Quick Suggestion Pills if query is empty */}
          {!trimmed && (
            <div>
              <p className="text-xs font-semibold text-[#737780] tracking-wider uppercase mb-2">
                추천 검색어
              </p>
              <div className="flex flex-wrap gap-2">
                {['바다이야기', '야마토', '상품권 환전', '기계식 릴 vs 비디오 릴', '게임법 개정', '오션파라다이스'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 text-xs bg-white border border-[#E2DFD9] rounded hover:border-[#C5A46D] text-[#161A20] transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Section: Games */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#737780] tracking-wider uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C5A46D]" />
                핵심 릴게임 기종 백과 ({matchedGames.length})
              </span>
            </div>
            {matchedGames.length > 0 ? (
              <div className="space-y-1.5">
                {matchedGames.map((game) => (
                  <button
                    key={game.slug}
                    onClick={() => handleSelect(`/games/${game.slug}`)}
                    className="w-full text-left p-3 rounded-lg bg-white border border-transparent hover:border-[#C5A46D] hover:bg-[#FBF9F5] transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#101B2A] group-hover:text-[#C5A46D]">
                          {game.koreanName}
                        </span>
                        <span className="text-xs text-[#737780]">
                          ({game.englishName}) · {game.releaseYear}년
                        </span>
                      </div>
                      <p className="text-xs text-[#737780] line-clamp-1 mt-0.5">
                        {game.shortSummary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#C5A46D] transition-colors shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#737780] py-2">일치하는 기종 정보가 없습니다.</p>
            )}
          </div>

          {/* Section: Articles & Reports */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#737780] tracking-wider uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#C5A46D]" />
                학술 저널 및 안전 가이드 ({matchedArticles.length})
              </span>
            </div>
            {matchedArticles.length > 0 ? (
              <div className="space-y-1.5">
                {matchedArticles.map((article) => (
                  <button
                    key={article.slug}
                    onClick={() => handleSelect(`/journal/${article.slug}`)}
                    className="w-full text-left p-3 rounded-lg bg-white border border-transparent hover:border-[#C5A46D] hover:bg-[#FBF9F5] transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-[#C5A46D]">
                          [{article.category}]
                        </span>
                        <span className="font-medium text-xs text-[#101B2A] group-hover:text-[#C5A46D] line-clamp-1">
                          {article.title}
                        </span>
                      </div>
                      <p className="text-xs text-[#737780] line-clamp-1 mt-0.5">
                        {article.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#C5A46D] transition-colors shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#737780] py-2">일치하는 학술 리포트가 없습니다.</p>
            )}
          </div>
        </div>

        {/* Footer info in modal */}
        <div className="px-4 py-2.5 bg-[#EFECE6] border-t border-[#E2DFD9] text-[11px] text-[#737780] flex items-center justify-between">
          <span>SAFE TEAM 지식 그래프 통합 검색</span>
          <span>총 {CORE_GAMES.length}대 기종 · 3대 학술보고서 수록</span>
        </div>
      </div>
    </div>
  );
};
