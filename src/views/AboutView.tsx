import React from 'react';
import { ShieldCheck, BookOpen, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { ARCHIVE_IMAGES } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto">
      <Breadcrumb items={[{ name: '소개', path: '/about' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="space-y-4 border-b border-[#E2DFD9] pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
          <span>ABOUT SAFE TEAM</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>EDITORIAL PRINCIPLES</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101B2A] leading-tight">
          릴게임 SAFE TEAM | 릴게임 안전지대 소개
        </h1>
        <p className="text-base text-[#737780] leading-relaxed">
          SAFE TEAM은 대한민국 아케이드 게임 역사 속 격동의 시기를 객관적으로 기록하고, 현대의 변종 온라인 사행 사기 피해를 예방하기 위해 설립된 독립 디지털 학술 아카이브입니다.
        </p>
      </div>

      {/* Mission & Identity */}
      <div className="bg-white rounded-xl p-8 border border-[#E2DFD9] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
          설립 목적 및 운영 철학
        </h2>
        <p className="text-sm text-[#161A20] leading-relaxed">
          2000년대 중반 한국 사회를 뒤흔들었던 릴게임 열풍과 바다이야기 사태는 오늘날까지도 게임 산업 규제와 문화 정책에 깊은 영향을 미치고 있습니다. 그러나 온라인 상에는 잘못된 무분별한 찌라시와 도박 광고, 또는 이용자를 유인하는 허위 사설 사이트들이 난립해 있습니다.
        </p>
        <p className="text-sm text-[#737780] leading-relaxed">
          SAFE TEAM은 이를 바로잡고, 국회 국정조사 결과보고서, 법원 판결문, 학술 논문 및 문화관광부 정책 자료를 바탕으로 "있는 그대로의 역사적 사실과 공학적 구조"를 디지털 지식 그래프로 영구 보존합니다.
        </p>
      </div>

      {/* 4 Core Editorial Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="w-8 h-8 rounded-full bg-[#101B2A] text-[#C5A46D] flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h3 className="font-serif text-lg font-bold text-[#101B2A]">
            절대적 무사행 원칙 (Zero-Gambling Policy)
          </h3>
          <p className="text-xs text-[#737780] leading-relaxed">
            본 사이트는 일체의 베팅, 환전, 입금 유도, 사설 게임 홍보를 철저히 배제합니다. 불법 게임을 중개하거나 금전적 이득을 취하지 않는 100% 비영리 정보 제공을 고수합니다.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="w-8 h-8 rounded-full bg-[#101B2A] text-[#C5A46D] flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h3 className="font-serif text-lg font-bold text-[#101B2A]">
            공공 사료 중심의 팩트체크
          </h3>
          <p className="text-xs text-[#737780] leading-relaxed">
            모든 기종의 제원과 역사적 사건은 국립과학수사연구원 분석연보, 한국콘텐츠진흥원 백서, 대한민국 국회 회의록 등 검증된 공공 1차 사료에 기반하여 기술합니다.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="w-8 h-8 rounded-full bg-[#101B2A] text-[#C5A46D] flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h3 className="font-serif text-lg font-bold text-[#101B2A]">
            투명한 Google Technical SEO
          </h3>
          <p className="text-xs text-[#737780] leading-relaxed">
            Google Search Central 가이드라인을 100% 준수하여, 스팸이나 조작적 어뷰징 없이 Schema.org 정식 표준 어휘와 Semantic HTML5 구조로 지식 그래프를 구성합니다.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="w-8 h-8 rounded-full bg-[#101B2A] text-[#C5A46D] flex items-center justify-center font-bold text-xs">
            04
          </div>
          <h3 className="font-serif text-lg font-bold text-[#101B2A]">
            사이버 범죄 피해 예방 공조
          </h3>
          <p className="text-xs text-[#737780] leading-relaxed">
            온라인 사칭 불법 릴게임 사이트의 사기 수법을 분석·공개하여 일반 시민들의 금전적 피해를 방지하고, 경찰청 및 사감위 신고 절차를 상시 안내합니다.
          </p>
        </div>
      </div>

      {/* Inquiry & Citation Guide */}
      <section className="bg-[#101B2A] rounded-xl p-8 text-white space-y-4">
        <h2 className="font-serif text-2xl font-bold">
          학술 인용 및 자료 기증 문의
        </h2>
        <p className="text-xs text-stone-300 leading-relaxed">
          SAFE TEAM의 사료와 통계 자료는 게임학, 미디어학, 법학 연구자 및 언론 보도에 자유롭게 출처를 명시하고 인용하실 수 있습니다. 과거 아케이드 관련 인쇄물, 사진 사료 기증 및 오류 수정 제보는 아래 정책에 따라 접수합니다.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
          <div className="p-3 bg-[#162335] rounded border border-stone-700">
            <span className="text-stone-400 block text-[11px]">학술 인용 표기</span>
            <span className="font-mono text-[#C5A46D]">릴게임 SAFE TEAM 디지털 아카이브 (safeteam.archive.org)</span>
          </div>
        </div>
      </section>
    </div>
  );
};
