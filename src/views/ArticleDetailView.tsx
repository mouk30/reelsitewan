import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Calendar, User, FileText, CheckCircle2 } from 'lucide-react';
import { EDITORIAL_ARTICLES, EditorialArticle } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface ArticleDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug, onNavigate }) => {
  const article =
    EDITORIAL_ARTICLES.find((a) => a.slug === slug) || EDITORIAL_ARTICLES[0];
  const currentIndex = EDITORIAL_ARTICLES.findIndex((a) => a.slug === article.slug);
  const prevArticle =
    EDITORIAL_ARTICLES[(currentIndex - 1 + EDITORIAL_ARTICLES.length) % EDITORIAL_ARTICLES.length];
  const nextArticle = EDITORIAL_ARTICLES[(currentIndex + 1) % EDITORIAL_ARTICLES.length];

  return (
    <article className="space-y-12 pb-24 max-w-3xl mx-auto">
      <Breadcrumb
        items={[
          { name: '매거진', path: '/journal' },
          { name: article.title, path: `/journal/${article.slug}` },
        ]}
        onNavigate={onNavigate}
      />

      {/* Article Header */}
      <header className="space-y-4 border-b border-[#E2DFD9] pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
          <span>SAFE TEAM EDITORIAL</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{article.category}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101B2A] leading-[1.2]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#737780] leading-relaxed">
          {article.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[#737780] pt-4 border-t border-[#E2DFD9]/80">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span className="font-semibold text-[#101B2A]">{article.author}</span>
            <span className="text-stone-400">({article.authorRole})</span>
          </div>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>최종 갱신: {article.dateModified}</span>
          </div>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Direct Answer Box (GEO / AI Overviews Grounding) */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2DFD9] shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>핵심 결론 (Direct Answer)</span>
        </div>
        <p className="text-base text-[#161A20] font-medium leading-relaxed">
          {article.directAnswer}
        </p>
      </section>

      {/* Table of Contents */}
      <nav aria-label="목차" className="bg-[#F7F5F0] rounded-xl p-5 border border-[#E2DFD9]">
        <h3 className="text-xs font-bold text-[#101B2A] uppercase tracking-wider mb-2.5">
          본문 목차 (Table of Contents)
        </h3>
        <ul className="space-y-1.5 text-xs text-[#737780]">
          {article.sections.map((sec, i) => (
            <li key={i}>
              <a
                href={`#sec-${i}`}
                className="hover:text-[#C5A46D] transition-colors flex items-center gap-2"
              >
                <span className="text-stone-400 font-mono">0{i + 1}.</span>
                <span>{sec.heading}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Body Sections */}
      <div className="space-y-12 text-[#161A20] leading-relaxed">
        {article.sections.map((section, idx) => (
          <section key={idx} id={`sec-${idx}`} className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101B2A] pt-4 border-t border-[#E2DFD9]/60">
              {section.heading}
            </h2>

            <div className={`text-base leading-[1.8] ${idx === 0 ? 'editorial-dropcap' : ''}`}>
              {section.content}
            </div>

            {/* Optional Structured Table */}
            {section.table && (
              <div className="my-6 bg-white rounded-xl border border-[#E2DFD9] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-[#101B2A] text-white">
                      {section.table.headers.map((h, i) => (
                        <th key={i} className="py-3 px-4 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2DFD9]">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-[#F7F5F0]/50' : ''}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3 px-4 ${cIdx === 0 ? 'font-semibold text-[#101B2A]' : 'text-[#737780]'}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Sources & Citations */}
      <section className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
        <h3 className="font-serif text-base font-bold text-[#101B2A]">
          인용 문헌 및 사료 출처 (References & Citations)
        </h3>
        <ul className="space-y-1.5 text-xs text-[#737780]">
          {article.sources.map((src: any, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-[#C5A46D] font-mono">[{i + 1}]</span>
              <span>
                {typeof src === 'string'
                  ? src
                  : `${src.title} — ${src.organization} (${src.year})`}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prev / Next Article Navigation */}
      <div className="pt-8 border-t border-[#E2DFD9] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate(`/journal/${prevArticle.slug}`)}
          className="p-4 rounded-xl bg-white border border-[#E2DFD9] hover:border-[#C5A46D] text-left transition-all group"
        >
          <span className="text-[11px] text-[#737780] flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3 h-3" /> 이전 리포트
          </span>
          <span className="font-serif font-bold text-base text-[#101B2A] group-hover:text-[#C5A46D] line-clamp-1">
            {prevArticle.title}
          </span>
        </button>

        <button
          onClick={() => onNavigate(`/journal/${nextArticle.slug}`)}
          className="p-4 rounded-xl bg-white border border-[#E2DFD9] hover:border-[#C5A46D] text-right transition-all group"
        >
          <span className="text-[11px] text-[#737780] flex items-center justify-end gap-1 mb-1">
            다음 리포트 <ArrowRight className="w-3 h-3" />
          </span>
          <span className="font-serif font-bold text-base text-[#101B2A] group-hover:text-[#C5A46D] line-clamp-1">
            {nextArticle.title}
          </span>
        </button>
      </div>
    </article>
  );
};
