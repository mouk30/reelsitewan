import React from 'react';
import { ArrowRight, BookOpen, Clock, ShieldCheck, HelpCircle, Layers, Sparkles } from 'lucide-react';
import { CORE_GAMES, EDITORIAL_ARTICLES, HISTORICAL_TIMELINE, ARCHIVE_IMAGES } from '../data/archiveData';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const leadArticle = EDITORIAL_ARTICLES[1]; // Bada Story regulatory anatomy
  const secondaryArticles = [EDITORIAL_ARTICLES[0], EDITORIAL_ARTICLES[2]];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. 6-GAME ENCYCLOPEDIA SHOWCASE (릴게임 대표 기종 백과 - 6대 대표 기종) */}
      <section className="pt-4 sm:pt-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2DFD9] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
              CORE MACHINE DOSSIERS ({CORE_GAMES.length}대 대표 기종)
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101B2A] mt-1">
              릴게임 대표 기종 백과
            </h2>
            <p className="text-sm text-[#737780] mt-1">
              바다이야기 · 야마토 · 손오공 · 오션파라다이스 · 황금성 · 다빈치
            </p>
          </div>
          <button
            onClick={() => onNavigate('/comparator')}
            className="text-xs text-[#101B2A] hover:text-[#C5A46D] font-medium flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>전체 기기 스펙 비교하기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_GAMES.map((game) => (
            <div
              key={game.slug}
              className="bg-[#0c141f] text-white rounded-2xl border border-stone-800 hover:border-[#C5A46D] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Top Poster Image Matching Each Game (Click links to reelkings.kr) */}
                <a
                  href="https://reelkings.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-square overflow-hidden bg-stone-950 cursor-pointer group/img"
                  title={`${game.koreanName} - reelkings.kr 바로가기`}
                >
                  <img
                    src={game.posterImage}
                    alt={`${game.koreanName} 대표 아케이드 포스터`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (game.fallbackImage && target.src !== game.fallbackImage) {
                        target.src = game.fallbackImage;
                      }
                    }}
                  />
                  {/* Subtle Gradient for Badge Readability */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />

                  {/* Top Bar on Image: Category / Reader count / Status Tag */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[11px] font-sans pointer-events-none">
                    <span className="bg-black/70 backdrop-blur-xs text-stone-200 px-2 py-0.5 rounded border border-white/10 font-medium">
                      {game.badgeCategory}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-xs text-stone-300 px-2 py-0.5 rounded border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{game.readerCount}</span>
                    </span>
                    <span className="bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-semibold">
                      {game.badgeHighlight}
                    </span>
                  </div>

                  {/* Hover action overlay indicator */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <span>▶ reelkings.kr 바로가기</span>
                    </span>
                  </div>
                </a>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Title & RTP Score Pill */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        <button
                          onClick={() => onNavigate(`/games/${game.slug}`)}
                          className="text-left"
                        >
                          {game.koreanName}
                        </button>
                      </h3>
                      <p className="text-xs text-amber-400 font-medium mt-1">
                        {game.cardSubtitle}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded">
                      {game.rtpScore}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                    {game.shortSummary}
                  </p>

                  {/* Key Metrics Rows */}
                  <div className="bg-[#141f2e] rounded-xl p-3.5 border border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400 flex items-center gap-1.5">
                        <span className="text-amber-400">🔑</span> 누적 잭팟 한도:
                      </span>
                      <span className="font-mono font-bold text-amber-400 text-sm">
                        {game.accumulatedPayout}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400 flex items-center gap-1.5">
                        <span className="text-sky-400">📈</span> 기기 변동성 지수:
                      </span>
                      <span className="font-semibold text-sky-400">
                        {game.volatilityLevel}
                      </span>
                    </div>
                  </div>

                  {/* Feature Tags with Checkmarks */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {game.featureTags.map((tag, tIdx) => (
                      <div
                        key={tIdx}
                        className="bg-[#182333] text-stone-300 rounded px-2.5 py-1.5 border border-stone-700/60 flex items-center gap-1.5 line-clamp-1"
                      >
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span className="truncate">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-3">
                <a
                  href="https://reelkings.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-[#0c141f] font-bold text-xs sm:text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-center no-underline hover:brightness-105 active:scale-[0.98]"
                >
                  <span className="text-sm">▶</span>
                  <span>사이트바로가기</span>
                </a>

                <button
                  onClick={() => onNavigate(`/games/${game.slug}`)}
                  className="w-full py-3 px-3 bg-[#1e2a3a] hover:bg-[#28374a] text-stone-200 border border-stone-700 font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>ⓘ</span>
                  <span>상세 / 공학</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. HERO SECTION */}
      <section className="relative pt-2 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C5A46D] uppercase">
              <span>THE SAFE TEAM ARCHIVE</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>VOL. 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#101B2A] font-bold leading-[1.15] tracking-tight">
              그 시절의 추억, <br />
              <span className="italic font-normal">릴게임의 모든 이야기</span>
            </h1>

            <p className="text-base sm:text-lg text-[#737780] leading-relaxed max-w-xl">
              바다이야기부터 야마토, 손오공까지. 한 시대를 지나온 릴게임의 역사와 문화,
              그리고 기억 속 사실과 제도적 교훈을 엄밀한 사료와 함께 기록합니다.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/encyclopedia')}
                className="px-6 py-3.5 bg-[#101B2A] text-white rounded text-sm font-medium hover:bg-[#162335] transition-colors shadow-sm flex items-center gap-2 min-h-[44px]"
              >
                <span>릴게임 백과 살펴보기</span>
                <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
              </button>

              <button
                onClick={() => onNavigate('/guide')}
                className="px-5 py-3.5 bg-white border border-[#E2DFD9] text-[#101B2A] rounded text-sm font-medium hover:border-[#C5A46D] hover:bg-[#FBF9F5] transition-colors min-h-[44px]"
              >
                소비자 안전 가이드
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#737780] border-t border-[#E2DFD9]/80">
              <div>
                <span className="font-semibold text-[#101B2A] font-mono">{CORE_GAMES.length}대</span> 대표 기종 분석
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div>
                <span className="font-semibold text-[#101B2A] font-mono">2006</span> 법제 변천사 수록
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div>
                <span className="font-semibold text-[#101B2A]">100%</span> 비영리 공공 아카이브
              </div>
            </div>
          </div>

          {/* Hero Right: High-Resolution Archival Image Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-[#E2DFD9] bg-stone-900 shadow-xl group">
              <img
                src={ARCHIVE_IMAGES.bada}
                alt="바다이야기 공식 포스터 - 황금고래와 잠수함 연출"
                className="w-full h-[360px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (ARCHIVE_IMAGES.badaFallback && target.src !== ARCHIVE_IMAGES.badaFallback) {
                    target.src = ARCHIVE_IMAGES.badaFallback;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-[10px] tracking-widest uppercase text-[#C5A46D] block font-sans font-semibold">
                  REEL GAME ARCHIVE · 6대 대표 기종
                </span>
                <p className="font-serif text-lg font-bold leading-snug mt-1 text-amber-300">
                  바다이야기 · 야마토 · 손오공 · 오션파라다이스 · 황금성 · 다빈치
                </p>
                <p className="text-xs text-stone-300 mt-1">
                  공식 포스터 및 기종별 공학 스펙 아카이브 수록
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIRECT ANSWER (GEO / AEO DEFINITION BLOCK) */}
      <section className="bg-white rounded-xl p-8 sm:p-10 border border-[#E2DFD9] shadow-2xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] tracking-wider uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>DIRECT ANSWER · 핵심 개념 요약</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#101B2A] mb-4">
            릴게임이란 무엇인가?
          </h2>
          <p className="text-base text-[#161A20] leading-relaxed mb-4">
            <strong>릴게임(Reel Game)</strong>이란 원통형 회전체(릴) 또는 비디오 스크린 상에 구현된 가상의 릴이 회전하다 정지할 때, 동일한 심볼이 특정 규칙(페이라인)으로 정렬되면 점수나 경품을 획득하는 형태의 아케이드 게임을 의미합니다.
          </p>
          <p className="text-sm text-[#737780] leading-relaxed">
            1990년대 후반 기계식 드럼 릴머신으로 시작하여 2004~2006년 ‘바다이야기’, ‘야마토’ 등 화려한 애니메이션 연출을 탑재한 비디오 스크린 릴게임으로 진화하였습니다. 그러나 지정 문화상품권 환전소와 결합된 불법 사행성 문제로 인해 2006년 정부의 대대적인 법 개정을 통해 오프라인 영업이 전면 금지되었습니다.
          </p>
        </div>
      </section>

      {/* 4. FEATURED EDITORIAL STORIES (3-Tier Salience) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2DFD9] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
              CURATORIAL ESSAY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#101B2A] mt-1">
              기획 탐사 리포트
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/journal')}
            className="text-xs text-[#101B2A] hover:text-[#C5A46D] font-medium flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>전체 기사 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tier 1: Lead Story (Dominant Visual & Weight) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2DFD9] overflow-hidden group hover:border-[#C5A46D] transition-colors">
            <div className="relative h-64 sm:h-80 overflow-hidden bg-stone-900">
              <img
                src={ARCHIVE_IMAGES.bada}
                alt="바다이야기 캐비닛과 해양 생물 심볼 연출"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (ARCHIVE_IMAGES.badaFallback && target.src !== ARCHIVE_IMAGES.badaFallback) {
                    target.src = ARCHIVE_IMAGES.badaFallback;
                  }
                }}
              />
              <div className="absolute top-4 left-4 bg-[#101B2A]/90 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-xs">
                {leadArticle.category} 특집
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#737780]">
                <span>{leadArticle.author}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.dateModified}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.readTime}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#101B2A] group-hover:text-[#C5A46D] transition-colors leading-snug">
                <button
                  onClick={() => onNavigate(`/journal/${leadArticle.slug}`)}
                  className="text-left"
                >
                  {leadArticle.title}
                </button>
              </h3>
              <p className="text-sm text-[#737780] leading-relaxed line-clamp-3">
                {leadArticle.summary}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate(`/journal/${leadArticle.slug}`)}
                  className="text-xs font-semibold text-[#101B2A] group-hover:text-[#C5A46D] flex items-center gap-1.5"
                >
                  <span>기사 전문 읽기</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D]" />
                </button>
              </div>
            </div>
          </div>

          {/* Tier 2: Secondary Features (2 Stacked Cards) */}
          <div className="lg:col-span-5 space-y-6">
            {secondaryArticles.map((article) => (
              <div
                key={article.slug}
                className="bg-white rounded-xl p-6 border border-[#E2DFD9] hover:border-[#C5A46D] transition-colors group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#C5A46D]">
                      [{article.category}]
                    </span>
                    <span className="text-[#737780]">{article.readTime}</span>
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#101B2A] group-hover:text-[#C5A46D] transition-colors leading-snug">
                    <button
                      onClick={() => onNavigate(`/journal/${article.slug}`)}
                      className="text-left"
                    >
                      {article.title}
                    </button>
                  </h4>
                  <p className="text-xs text-[#737780] line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E2DFD9]/60 flex items-center justify-between text-xs text-[#737780]">
                  <span>{article.dateModified}</span>
                  <button
                    onClick={() => onNavigate(`/journal/${article.slug}`)}
                    className="text-[#101B2A] group-hover:text-[#C5A46D] font-medium flex items-center gap-1"
                  >
                    <span>열람</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HISTORICAL TIMELINE */}
      <section className="bg-white rounded-xl p-8 sm:p-12 border border-[#E2DFD9]">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
            CHRONOLOGY
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#101B2A] mt-1">
            한국 아케이드 릴게임사 연표
          </h2>
          <p className="text-sm text-[#737780] mt-2">
            1990년대 골목 전자오락실의 성황부터 2006년 바다이야기 전면 규제에 이르는 법제적·문화적 전개 과정.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#E2DFD9]">
          {HISTORICAL_TIMELINE.map((item, index) => (
            <div key={index} className="relative flex items-start gap-6 group">
              <div className="w-7 h-7 rounded-full bg-[#F7F5F0] border-2 border-[#101B2A] group-hover:border-[#C5A46D] flex items-center justify-center shrink-0 z-10 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#101B2A] group-hover:bg-[#C5A46D]" />
              </div>
              <div className="bg-[#F7F5F0] rounded-lg p-5 border border-[#E2DFD9] w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="font-serif font-bold text-base text-[#101B2A]">
                    {item.title}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#C5A46D] bg-white px-2 py-0.5 rounded border border-[#E2DFD9]">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. NOSTALGIA ARCHIVE SPOTLIGHT */}
      <section className="relative rounded-xl overflow-hidden bg-[#101B2A] text-white p-8 sm:p-12 border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
              NOSTALGIA ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              사라진 브라운관의 온기, <br />
              골목 오락실의 기억을 복원하다
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
              백 원짜리 동전을 조이스틱 옆에 수북이 쌓아두던 학창 시절의 추억부터,
              초고속 인터넷과 PC방의 등장 속에서 역사의 뒤안길로 사라진 오락실 기판들의 숨은 이야기를 전합니다.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/archive')}
                className="px-5 py-3 bg-[#C5A46D] text-[#101B2A] font-semibold text-xs rounded hover:bg-[#d6b785] transition-colors"
              >
                추억 아카이브 탐방하기
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-stone-700 shadow-xl">
              <img
                src={ARCHIVE_IMAGES.nostalgia}
                alt="1990년대 레트로 골목 오락실 전경"
                className="w-full h-64 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== ARCHIVE_IMAGES.bada) {
                    target.src = ARCHIVE_IMAGES.bada;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
