import React from 'react';
import { Clock, BookOpen, ArrowRight, Disc, Monitor, Sparkles } from 'lucide-react';
import { ARCHIVE_IMAGES, EDITORIAL_ARTICLES } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface NostalgiaArchiveViewProps {
  onNavigate: (path: string) => void;
}

export const NostalgiaArchiveView: React.FC<NostalgiaArchiveViewProps> = ({ onNavigate }) => {
  const nostalgiaArticle = EDITORIAL_ARTICLES[0];

  return (
    <div className="space-y-12 pb-24">
      <Breadcrumb items={[{ name: '추억 아카이브', path: '/archive' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
          NOSTALGIA & SPATIAL MEMORY
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101B2A] leading-tight">
          1990~2000년대 오락실과 대중 놀이 문화의 기억
        </h1>
        <p className="text-base text-[#737780] leading-relaxed">
          동네 어귀 브라운관 불빛 아래서 청소년기를 보냈던 세대의 기억과, 기술과 공간이 급변하던 세기말의 대중오락 풍경을 기록하는 구술·문화 아카이브입니다.
        </p>
      </div>

      {/* Hero Documentary Showcase */}
      <div className="bg-[#101B2A] rounded-xl overflow-hidden border border-stone-800 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
            <span className="text-xs text-[#C5A46D] uppercase tracking-widest font-mono">
              CURATORIAL FOCUS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              동전 한 닢의 낭만과 어스름: 골목 오락실의 흥망성쇠
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              1990년대 초중반, 동네마다 있었던 전자오락실은 100원짜리 동전 하나로 친구들과 실력을 겨루던 순수한 공간이었습니다. 스타크래프트와 초고속 인터넷의 보급으로 그 공간이 해체되고 성인용 릴게임장으로 전이되어 가는 문화적 궤적을 심층적으로 추적합니다.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate(`/journal/${nostalgiaArticle.slug}`)}
                className="px-5 py-3 bg-[#C5A46D] text-[#101B2A] rounded font-semibold text-xs hover:bg-[#d6b785] transition-colors flex items-center gap-2"
              >
                <span>문화사 기획 리포트 전문 읽기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 h-72 sm:h-96">
            <img
              src={ARCHIVE_IMAGES.nostalgia}
              alt="1990년대 한국 골목 오락실과 CRT 브라운관 모니터들"
              className="w-full h-full object-cover"
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

      {/* 3 Pillars of Arcade Memory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#F7F5F0] flex items-center justify-center text-[#101B2A] border border-[#E2DFD9]">
            <Disc className="w-5 h-5 text-[#C5A46D]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#101B2A]">
            01. 백 원짜리 동전의 경제학
          </h3>
          <p className="text-xs text-[#737780] leading-relaxed">
            동전 교환기에서 쏟아져 나오던 딸깍거림, 조이스틱과 버튼 상단에 올려놓던 대기 코인. 그 시절 청소년들에게 100원은 몰입의 시간이자 또래 집단의 연대감이었습니다.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#F7F5F0] flex items-center justify-center text-[#101B2A] border border-[#E2DFD9]">
            <Monitor className="w-5 h-5 text-[#C5A46D]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#101B2A]">
            02. CRT 브라운관의 스캔라인
          </h3>
          <p className="text-xs text-[#737780] leading-relaxed">
            20인치 볼록 브라운관에서 뿜어져 나오던 미세한 정전기와 특유의 잔상. 현대의 고주사율 OLED 패널에서는 결코 재현할 수 없는 아날로그 형광체의 시각적 질감이었습니다.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#F7F5F0] flex items-center justify-center text-[#101B2A] border border-[#E2DFD9]">
            <Sparkles className="w-5 h-5 text-[#C5A46D]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#101B2A]">
            03. 공간의 단절과 성인화의 그림자
          </h3>
          <p className="text-xs text-[#737780] leading-relaxed">
            1998년 PC방의 출현은 청소년들을 대거 흡수했고, 영세 오락실들은 활로를 찾기 위해 창문을 가리고 어두운 성인용 릴게임장으로 변모하며 공간의 낭만을 잃어버렸습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
