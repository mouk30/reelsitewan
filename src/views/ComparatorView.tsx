import React, { useState } from 'react';
import { Layers, ArrowRight, Check, X, Filter } from 'lucide-react';
import { CORE_GAMES, GameDossier } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface ComparatorViewProps {
  onNavigate: (path: string) => void;
}

export const ComparatorView: React.FC<ComparatorViewProps> = ({ onNavigate }) => {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    'bada-story',
    'yamato',
    'sonogong',
  ]);

  const toggleSelect = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      if (selectedSlugs.length > 2) {
        setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
      }
    } else {
      if (selectedSlugs.length < 4) {
        setSelectedSlugs([...selectedSlugs, slug]);
      } else {
        setSelectedSlugs([...selectedSlugs.slice(1), slug]);
      }
    }
  };

  const selectedGames = selectedSlugs
    .map((s) => CORE_GAMES.find((g) => g.slug === s))
    .filter(Boolean) as GameDossier[];

  return (
    <div className="space-y-12 pb-24">
      <Breadcrumb items={[{ name: '기기 비교 매트릭스', path: '/comparator' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
          SPECIFICATION COMPARATOR
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101B2A] leading-tight">
          주요 릴게임 아케이드 기기 비교 매트릭스
        </h1>
        <p className="text-base text-[#737780] leading-relaxed">
          하드웨어 아키텍처, 릴 회전 기구, 디스플레이 해상도, 페이라인, 당첨 메커니즘을 횡단 분석하여 당대 아케이드 기술의 분기점과 사행화 경로를 비교 검증합니다.
        </p>
      </div>

      {/* Selection Control Bar */}
      <div className="bg-white rounded-xl p-5 border border-[#E2DFD9] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#101B2A] flex items-center gap-1.5 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#C5A46D]" />
            비교 대상 기종 선택 (2~4개 선택)
          </span>
          <span className="text-xs text-[#737780]">
            선택됨: {selectedSlugs.length}/4
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CORE_GAMES.map((game) => {
            const isSelected = selectedSlugs.includes(game.slug);
            return (
              <button
                key={game.slug}
                onClick={() => toggleSelect(game.slug)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all min-h-[40px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#101B2A] text-white shadow-2xs'
                    : 'bg-[#F7F5F0] text-[#737780] hover:text-[#101B2A] border border-[#E2DFD9]'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5 text-[#C5A46D]" /> : null}
                <span>{game.koreanName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Comparison Table */}
      <div className="bg-white rounded-xl border border-[#E2DFD9] overflow-x-auto shadow-2xs">
        <table className="w-full text-xs text-left min-w-[700px]">
          <thead>
            <tr className="bg-[#101B2A] text-white divide-x divide-stone-800">
              <th className="py-4 px-5 font-medium text-stone-400 w-44 uppercase tracking-wider">
                비교 항목
              </th>
              {selectedGames.map((g) => (
                <th key={g.slug} className="py-4 px-5">
                  <div className="font-serif text-lg font-bold text-white">
                    {g.koreanName}
                  </div>
                  <div className="text-[11px] text-[#C5A46D] font-normal">
                    {g.englishName.split(' ')[0]} ({g.releaseYear})
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2DFD9]">
            {/* Developer */}
            <tr className="divide-x divide-[#E2DFD9] bg-[#F7F5F0]/40">
              <th className="py-3 px-5 font-semibold text-[#101B2A]">제작/유통사</th>
              {selectedGames.map((g) => (
                <td key={g.slug} className="py-3 px-5 text-[#161A20]">{g.developer}</td>
              ))}
            </tr>

            {/* Reel Mechanism */}
            <tr className="divide-x divide-[#E2DFD9]">
              <th className="py-3 px-5 font-semibold text-[#101B2A]">릴 메커니즘</th>
              {selectedGames.map((g) => (
                <td key={g.slug} className="py-3 px-5 text-[#161A20] font-medium">{g.reelMechanism}</td>
              ))}
            </tr>

            {/* Display Tech */}
            <tr className="divide-x divide-[#E2DFD9] bg-[#F7F5F0]/40">
              <th className="py-3 px-5 font-semibold text-[#101B2A]">디스플레이</th>
              {selectedGames.map((g) => (
                <td key={g.slug} className="py-3 px-5 text-[#161A20]">{g.displayTech}</td>
              ))}
            </tr>

            {/* Paylines */}
            <tr className="divide-x divide-[#E2DFD9]">
              <th className="py-3 px-5 font-semibold text-[#101B2A]">페이라인 & 릴 수</th>
              {selectedGames.map((g) => (
                <td key={g.slug} className="py-3 px-5 text-[#161A20] tabular-nums font-mono">
                  {g.keySpecs.reels} / {g.keySpecs.paylines}
                </td>
              ))}
            </tr>

            {/* Bonus Jackpot */}
            <tr className="divide-x divide-[#E2DFD9] bg-[#F7F5F0]/40">
              <th className="py-3 px-5 font-semibold text-[#101B2A]">보너스/연타 기믹</th>
              {selectedGames.map((g) => (
                <td key={g.slug} className="py-3 px-5 text-[#161A20]">{g.keySpecs.jackpotType}</td>
              ))}
            </tr>

            {/* Regulatory Status */}
            <tr className="divide-x divide-[#E2DFD9]">
              <th className="py-3 px-5 font-semibold text-[#101B2A]">법적 처분 내력</th>
              {selectedGames.map((g) => (
                <td key={g.slug} className="py-3 px-5 text-rose-700 font-medium">
                  {g.regulatoryStatus}
                </td>
              ))}
            </tr>

            {/* Link to Dossier */}
            <tr className="divide-x divide-[#E2DFD9] bg-[#F7F5F0]">
              <th className="py-3.5 px-5 font-semibold text-[#101B2A]">백과 바로가기</th>
              {selectedGames.map((g) => (
                <td key={g.slug} className="py-3.5 px-5">
                  <button
                    onClick={() => onNavigate(`/games/${g.slug}`)}
                    className="text-xs font-semibold text-[#101B2A] hover:text-[#C5A46D] flex items-center gap-1"
                  >
                    <span>기록 상세</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Comparative Analytical Summary */}
      <div className="bg-white rounded-xl p-8 border border-[#E2DFD9] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
          기술 진화와 사행화의 3대 상관관계
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#737780] leading-relaxed">
          <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E2DFD9]">
            <span className="font-mono text-[#C5A46D] text-sm block mb-1">01. 시각적 연출의 스크린화</span>
            <p>
              물리적 릴에서 비디오 스크린으로의 전환은 고래·상어 등 대형 컷신 애니메이션을 가능케 하여 이용자에게 연속 당첨에 대한 높은 기대감을 심어주었습니다.
            </p>
          </div>
          <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E2DFD9]">
            <span className="font-mono text-[#C5A46D] text-sm block mb-1">02. 메모리 변조의 용이성</span>
            <p>
              전자 기판 롬(ROM) 칩의 조작을 통해 심의 버전에서는 제한되었던 수천 배의 누적 잭팟과 외부 리모컨 연동 확률 조작이 만연했습니다.
            </p>
          </div>
          <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E2DFD9]">
            <span className="font-mono text-[#C5A46D] text-sm block mb-1">03. 환전 인프라와의 결합</span>
            <p>
              기기의 자체 매력보다는 오락실 바로 옆 사설 환전소에서 상품권을 현금으로 즉시 교환해 주는 유통망이 기형적 열풍을 지탱했습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
