import React from 'react';
import { ArrowLeft, ArrowRight, ShieldAlert, Cpu, BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { CORE_GAMES, GameDossier } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface GameDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const GameDetailView: React.FC<GameDetailViewProps> = ({ slug, onNavigate }) => {
  const game = CORE_GAMES.find((g) => g.slug === slug) || CORE_GAMES[0];
  const currentIndex = CORE_GAMES.findIndex((g) => g.slug === game.slug);
  const prevGame = CORE_GAMES[(currentIndex - 1 + CORE_GAMES.length) % CORE_GAMES.length];
  const nextGame = CORE_GAMES[(currentIndex + 1) % CORE_GAMES.length];

  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { name: '릴게임 백과', path: '/encyclopedia' },
          { name: game.koreanName, path: `/games/${game.slug}` },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header & Meta with Poster Showcase */}
      <div className="bg-[#0c141f] text-white rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <a
            href="https://reelkings.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-stone-700 hover:border-amber-500 bg-stone-950 block cursor-pointer group/detailImg transition-colors"
            title={`${game.koreanName} - reelkings.kr 바로가기`}
          >
            <img
              src={game.posterImage}
              alt={`${game.koreanName} 대표 아케이드 포스터`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/detailImg:scale-105"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (game.fallbackImage && target.src !== game.fallbackImage) {
                  target.src = game.fallbackImage;
                }
              }}
            />
            <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[11px] font-sans pointer-events-none">
              <span className="bg-black/70 backdrop-blur-xs text-stone-200 px-2 py-0.5 rounded border border-white/10 font-medium">
                {game.badgeCategory}
              </span>
              <span className="bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-semibold">
                {game.badgeHighlight}
              </span>
            </div>

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/detailImg:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <span>▶ reelkings.kr 바로가기</span>
              </span>
            </div>
          </a>
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#C5A46D] font-semibold tracking-widest uppercase">
              <span>SAFE TEAM OFFICIAL DOSSIER</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span>ENTRY #{currentIndex + 1}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {game.koreanName}
              <span className="block text-base sm:text-lg font-normal text-stone-300 font-sans mt-1">
                {game.englishName} ({game.releaseYear})
              </span>
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed">
              {game.shortSummary}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-300 pt-1">
              <span className="bg-[#141f2e] px-2.5 py-1 rounded border border-stone-800">
                제작사: <strong className="text-white">{game.developer}</strong>
              </span>
              <span className="bg-[#141f2e] px-2.5 py-1 rounded border border-stone-800">
                캐비닛: <strong className="text-white">{game.cabinetType}</strong>
              </span>
              <span className="bg-[#141f2e] px-2.5 py-1 rounded border border-stone-800">
                전성기: <strong className="text-white">{game.peakEra}</strong>
              </span>
              <span className="bg-rose-950/60 text-rose-300 px-2.5 py-1 rounded border border-rose-800/40">
                {game.regulatoryStatus}
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://reelkings.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-[#0c141f] font-bold text-xs sm:text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer no-underline hover:brightness-105 active:scale-[0.98]"
              >
                <span>▶</span>
                <span>사이트바로가기</span>
              </a>

              <button
                onClick={() => onNavigate('/comparator')}
                className="py-3 px-4 bg-[#1e2a3a] hover:bg-[#28374a] text-stone-200 border border-stone-700 font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>기기 스펙 비교하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Answer Box (GEO / AEO Answer Engine Standard) */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2DFD9] shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>핵심 요약 (Direct Answer)</span>
        </div>
        <p className="text-base text-[#161A20] font-medium leading-relaxed">
          {game.directAnswer}
        </p>
        <p className="text-xs text-[#737780] border-t border-[#E2DFD9]/60 pt-3">
          본 기록은 2006년 문화관광부 및 게임물관리위원회 공공 조사 문헌을 근거로 작성되었습니다.
        </p>
      </section>

      {/* Key Hardware & Operating Specs Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#101B2A] tracking-wider uppercase">
          <Cpu className="w-4 h-4 text-[#C5A46D]" />
          <span>기기 공학 및 운영 사양 (Hardware Specifications)</span>
        </div>

        <div className="bg-white rounded-xl border border-[#E2DFD9] overflow-hidden">
          <table className="w-full text-xs text-left">
            <tbody className="divide-y divide-[#E2DFD9]">
              <tr className="bg-[#F7F5F0]/50">
                <th className="py-3 px-4 font-semibold text-[#101B2A] w-1/3">릴 구동 메커니즘</th>
                <td className="py-3 px-4 text-[#161A20]">{game.reelMechanism}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-semibold text-[#101B2A]">디스플레이 기술</th>
                <td className="py-3 px-4 text-[#161A20]">{game.displayTech}</td>
              </tr>
              <tr className="bg-[#F7F5F0]/50">
                <th className="py-3 px-4 font-semibold text-[#101B2A]">페이라인 구조</th>
                <td className="py-3 px-4 text-[#161A20]">{game.keySpecs.paylines}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-semibold text-[#101B2A]">베팅 규격 (공식)</th>
                <td className="py-3 px-4 text-[#161A20]">{game.keySpecs.maxBetPerSpin}</td>
              </tr>
              <tr className="bg-[#F7F5F0]/50">
                <th className="py-3 px-4 font-semibold text-[#101B2A]">보너스/연타 유형</th>
                <td className="py-3 px-4 text-[#161A20]">{game.keySpecs.jackpotType}</td>
              </tr>
              <tr>
                <th className="py-3 px-4 font-semibold text-[#101B2A]">경품 배출 수단</th>
                <td className="py-3 px-4 text-[#161A20]">{game.keySpecs.giftCertificateType}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* In-depth Sections */}
      <div className="space-y-10 pt-4 text-[#161A20]">
        {/* Section 1: Historical Context */}
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
            01. 탄생 배경과 시장 진입
          </h2>
          <p className="text-base text-[#161A20] leading-relaxed">
            {game.historicalContext}
          </p>
        </section>

        {/* Section 2: Mechanics */}
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
            02. 게임 진행 방식과 당첨 로직
          </h2>
          <p className="text-base text-[#161A20] leading-relaxed">
            {game.gameplayMechanics}
          </p>
        </section>

        {/* Section 3: Audio Visual */}
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
            03. 시각 및 음향 연출 기법
          </h2>
          <p className="text-base text-[#161A20] leading-relaxed">
            {game.soundVisualFeatures}
          </p>
        </section>

        {/* Section 4: Controversy & Legal Ban */}
        <section className="space-y-3 bg-rose-50/50 p-6 rounded-xl border border-rose-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 tracking-wider uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>04. 사회적 파장과 2006년 규제 퇴출 경위</span>
          </div>
          <p className="text-sm text-[#161A20] leading-relaxed">
            {game.controversyAndBanning}
          </p>
        </section>
      </div>

      {/* Timeline Milestones Table */}
      <section className="space-y-4 pt-6">
        <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
          기기 주요 연혁 (Chronological Milestones)
        </h2>
        <div className="bg-white rounded-xl border border-[#E2DFD9] divide-y divide-[#E2DFD9]">
          {game.timelineMilestones.map((m, i) => (
            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs">
              <span className="font-mono font-bold text-[#C5A46D] w-24 shrink-0">
                {m.year}
              </span>
              <span className="text-[#161A20]">{m.event}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sources & Citations */}
      <section className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
        <h3 className="font-serif text-base font-bold text-[#101B2A]">
          참고 문헌 및 공식 사료 (Evidence & Sources)
        </h3>
        <ul className="space-y-1.5 text-xs text-[#737780]">
          {game.sources.map((src, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-[#C5A46D] font-mono">[{i + 1}]</span>
              <span>{src.title} — {src.organization} ({src.year})</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Bottom Nav: Prev / Next Games */}
      <div className="pt-8 border-t border-[#E2DFD9] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate(`/games/${prevGame.slug}`)}
          className="p-4 rounded-xl bg-white border border-[#E2DFD9] hover:border-[#C5A46D] text-left transition-all group"
        >
          <span className="text-[11px] text-[#737780] flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3 h-3" /> 이전 기종
          </span>
          <span className="font-serif font-bold text-base text-[#101B2A] group-hover:text-[#C5A46D] block">
            {prevGame.koreanName}
          </span>
        </button>

        <button
          onClick={() => onNavigate(`/games/${nextGame.slug}`)}
          className="p-4 rounded-xl bg-white border border-[#E2DFD9] hover:border-[#C5A46D] text-right transition-all group"
        >
          <span className="text-[11px] text-[#737780] flex items-center justify-end gap-1 mb-1">
            다음 기종 <ArrowRight className="w-3 h-3" />
          </span>
          <span className="font-serif font-bold text-base text-[#101B2A] group-hover:text-[#C5A46D] block">
            {nextGame.koreanName}
          </span>
        </button>
      </div>
    </div>
  );
};
