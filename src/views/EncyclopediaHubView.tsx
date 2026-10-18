import React, { useState } from 'react';
import { ArrowRight, BookOpen, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CORE_GAMES, GameDossier } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface EncyclopediaHubViewProps {
  onNavigate: (path: string) => void;
}

export const EncyclopediaHubView: React.FC<EncyclopediaHubViewProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'video' | 'mechanical'>('all');

  const filteredGames = CORE_GAMES.filter((g) => {
    if (filter === 'video') return g.reelMechanism.includes('비디오') || g.reelMechanism.includes('가상');
    if (filter === 'mechanical') return g.reelMechanism.includes('기계식') || g.reelMechanism.includes('드럼');
    return true;
  });

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumb items={[{ name: '릴게임 백과', path: '/encyclopedia' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
          ENCYCLOPEDIA ARCHIVE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101B2A] leading-tight">
          대한민국 릴게임 {CORE_GAMES.length}대 대표 기종 백과
        </h1>
        <p className="text-base text-[#737780] leading-relaxed">
          2000년대 초중반 한국 아케이드 시장을 형성했던 대표적인 {CORE_GAMES.length}개 릴게임 기종의 하드웨어 스펙, 구동 메커니즘, 시대적 배경 및 규제 내력을 공적 사료를 바탕으로 정리한 공식 백과입니다.
        </p>
      </div>

      {/* Direct Answer & Classification Box */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2DFD9] shadow-2xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#101B2A] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#C5A46D]" />
          <span>기기 분류 및 공학적 구동 원리 요약</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#737780] leading-relaxed">
          <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E2DFD9]">
            <h3 className="font-semibold text-sm text-[#101B2A] mb-1">
              스크린 비디오 릴 (Screen Video Reel)
            </h3>
            <p>
              물리적 모터 회전체 없이 CRT/LCD 모니터 화면에 그래픽으로 릴 회전을 표현한 방식. 바다이야기, 손오공, 오션파라다이스 등이 대표적이며, 자유로운 애니메이션 컷신과 사운드 연출이 가능했습니다.
            </p>
          </div>
          <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E2DFD9]">
            <h3 className="font-semibold text-sm text-[#101B2A] mb-1">
              기계식 드럼 릴 (Mechanical Drum Reel)
            </h3>
            <p>
              스텝 모터에 의해 실제로 회전하는 원통형 물리 드럼을 채택한 기종. 야마토(하이브리드형), 초기 황금성 등이 있으며, 물리적 타격감과 상단 LCD 연동을 결합한 하이브리드 진화를 거쳤습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DFD9] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-medium rounded transition-colors min-h-[40px] ${
              filter === 'all'
                ? 'bg-[#101B2A] text-white'
                : 'bg-white text-[#737780] hover:text-[#101B2A] border border-[#E2DFD9]'
            }`}
          >
            전체 7대 기종 ({CORE_GAMES.length})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 text-xs font-medium rounded transition-colors min-h-[40px] ${
              filter === 'video'
                ? 'bg-[#101B2A] text-white'
                : 'bg-white text-[#737780] hover:text-[#101B2A] border border-[#E2DFD9]'
            }`}
          >
            비디오 스크린 릴
          </button>
          <button
            onClick={() => setFilter('mechanical')}
            className={`px-4 py-2 text-xs font-medium rounded transition-colors min-h-[40px] ${
              filter === 'mechanical'
                ? 'bg-[#101B2A] text-white'
                : 'bg-white text-[#737780] hover:text-[#101B2A] border border-[#E2DFD9]'
            }`}
          >
            기계식/하이브리드 릴
          </button>
        </div>

        <button
          onClick={() => onNavigate('/comparator')}
          className="text-xs text-[#101B2A] hover:text-[#C5A46D] font-medium flex items-center gap-1 self-start sm:self-auto"
        >
          <span>스펙 비교 매트릭스 보기</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Games List (Enhanced Poster Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGames.map((game) => (
          <article
            key={game.slug}
            className="bg-[#0c141f] text-white rounded-2xl border border-stone-800 hover:border-[#C5A46D] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Top Poster Image (Click links to reelkings.kr) */}
              <a
                href="https://reelkings.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square overflow-hidden bg-stone-950 cursor-pointer group/img"
                title={`${game.koreanName} - reelkings.kr 바로가기`}
              >
                <img
                  src={game.posterImage}
                  alt={game.koreanName}
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
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />

                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[11px] font-sans pointer-events-none">
                  <span className="bg-black/70 backdrop-blur-xs text-stone-200 px-2 py-0.5 rounded border border-white/10 font-medium">
                    {game.badgeCategory}
                  </span>
                  <span className="bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-semibold">
                    {game.badgeHighlight}
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <span>▶ reelkings.kr 바로가기</span>
                  </span>
                </div>
              </a>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      <button
                        onClick={() => onNavigate(`/games/${game.slug}`)}
                        className="text-left"
                      >
                        {game.koreanName}
                      </button>
                    </h2>
                    <p className="text-xs text-amber-400 font-medium mt-1">
                      {game.cardSubtitle}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded">
                    {game.rtpScore}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                  {game.shortSummary}
                </p>

                {/* Key Metrics */}
                <div className="bg-[#141f2e] rounded-xl p-3 border border-stone-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">릴 방식:</span>
                    <span className="text-stone-200 font-medium">{game.reelMechanism.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">누적 잭팟:</span>
                    <span className="text-amber-400 font-mono font-bold">{game.accumulatedPayout}</span>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {game.featureTags.map((tag, tIdx) => (
                    <div
                      key={tIdx}
                      className="bg-[#182333] text-stone-300 rounded px-2.5 py-1.5 border border-stone-700/60 flex items-center gap-1.5 truncate"
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
          </article>
        ))}
      </div>
    </div>
  );
};
