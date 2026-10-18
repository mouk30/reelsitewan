import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Calendar, User, Filter } from 'lucide-react';
import { EDITORIAL_ARTICLES, EditorialArticle } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface JournalViewProps {
  onNavigate: (path: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onNavigate }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['all', '문화', '제도분석', '안전가이드'];

  const filteredArticles = EDITORIAL_ARTICLES.filter(
    (a) => selectedCat === 'all' || a.category === selectedCat
  );

  return (
    <div className="space-y-12 pb-24">
      <Breadcrumb items={[{ name: '매거진', path: '/journal' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
          SAFE TEAM EDITORIAL JOURNAL
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101B2A] leading-tight">
          학술 탐사 매거진 및 기획 리포트
        </h1>
        <p className="text-base text-[#737780] leading-relaxed">
          한국 아케이드 산업의 법제사적 분기점, 골목 오락실의 공간 사회학, 그리고 현대 사이버 사기 메커니즘을 객관적 사료와 법령을 바탕으로 심층 분석합니다.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2DFD9] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 text-xs font-medium rounded transition-colors min-h-[40px] ${
              selectedCat === cat
                ? 'bg-[#101B2A] text-white'
                : 'bg-white text-[#737780] hover:text-[#101B2A] border border-[#E2DFD9]'
            }`}
          >
            {cat === 'all' ? '전체 리포트' : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="space-y-8">
        {filteredArticles.map((article, idx) => (
          <article
            key={article.slug}
            className="bg-white rounded-xl border border-[#E2DFD9] p-6 sm:p-8 hover:border-[#C5A46D] hover:shadow-md transition-all group"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#C5A46D] uppercase">
                  [{article.category}]
                </span>
                <div className="flex items-center gap-3 text-[#737780]">
                  <span>{article.author} ({article.authorRole})</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.dateModified}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101B2A] group-hover:text-[#C5A46D] transition-colors leading-snug">
                  <button
                    onClick={() => onNavigate(`/journal/${article.slug}`)}
                    className="text-left"
                  >
                    {article.title}
                  </button>
                </h2>
                <p className="text-sm text-[#737780] mt-1">
                  {article.subtitle}
                </p>
              </div>

              <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E2DFD9] text-xs sm:text-sm text-[#161A20] leading-relaxed">
                <strong className="text-[#101B2A] block mb-1">핵심 요약 (Direct Answer)</strong>
                {article.directAnswer}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#737780]">
                  공식 출처 인용 {article.sources.length}건
                </span>
                <button
                  onClick={() => onNavigate(`/journal/${article.slug}`)}
                  className="px-4 py-2 bg-[#101B2A] text-white text-xs font-semibold rounded hover:bg-[#162335] group-hover:bg-[#C5A46D] group-hover:text-[#101B2A] transition-colors flex items-center gap-1.5"
                >
                  <span>리포트 전문 읽기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
