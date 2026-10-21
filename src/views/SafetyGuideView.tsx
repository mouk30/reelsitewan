import React from 'react';
import { ShieldCheck, ShieldAlert, PhoneCall, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';
import { ARCHIVE_IMAGES } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface SafetyGuideViewProps {
  onNavigate: (path: string) => void;
}

export const SafetyGuideView: React.FC<SafetyGuideViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto">
      <Breadcrumb items={[{ name: '안전 가이드', path: '/guide' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="space-y-4 border-b border-[#E2DFD9] pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 tracking-widest uppercase">
          <ShieldAlert className="w-4 h-4" />
          <span>SAFE TEAM PUBLIC SAFETY ADVISORY</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101B2A] leading-tight">
          릴게임 안전 정보 및 법률·피해 예방 가이드
        </h1>
        <p className="text-base text-[#737780] leading-relaxed">
          과거 아케이드 릴게임의 법적 퇴출 배경과, 현재 인터넷 상에서 '바다이야기', '야마토' 명칭을 사칭하여 운영되는 불법 사설 도박 사이트의 사기 수법을 폭로하고 이용자 피해를 예방합니다.
        </p>
      </div>

      {/* Seal Banner */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-rose-200 shadow-2xs flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-[#E2DFD9]">
          <img
            src={ARCHIVE_IMAGES.seal}
            alt="SAFE TEAM 검증 인장"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== ARCHIVE_IMAGES.bada) {
                target.src = ARCHIVE_IMAGES.bada;
              }
            }}
          />
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="font-serif text-xl font-bold text-[#101B2A]">
            안전지대(SAFE TEAM)의 확고한 원칙: "안전한 불법 릴게임이란 없습니다"
          </h2>
          <p className="text-xs sm:text-sm text-[#737780] leading-relaxed">
            인터넷 사설 도박 업자들은 "본사 인증", "먹튀 없는 안전지대" 등의 문구로 이용자를 현혹하지만, 현행법상 온라인 릴게임은 100% 불법 범죄 행위입니다. SAFE TEAM은 오직 역사적 진실과 피해 방지 정보만을 제공합니다.
          </p>
        </div>
      </div>

      {/* 3 Major Scam Mechanisms */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
          불법 온라인 사설 릴게임의 3대 사기 메커니즘
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-[#101B2A]">
              관리자 백도어 확률 조작
            </h3>
            <p className="text-xs text-[#737780] leading-relaxed">
              사설 웹 릴게임은 브라우저 화면에만 연출을 띄울 뿐, 백엔드 관리자 패널에서 회원의 입금액, 게임 패턴에 따라 출현 확률을 0%로 실시간 임의 조작합니다.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-[#101B2A]">
              추가 입금 유도 (먹튀 빌드업)
            </h3>
            <p className="text-xs text-[#737780] leading-relaxed">
              가짜 고액 당첨금을 화면에 표시한 뒤, "출금을 위해서는 롤링 300% 충족", "환전 계좌 인증 보증금 30%" 등을 핑계로 추가 현금 송금을 요구하여 피해를 키웁니다.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-[#101B2A]">
              일방적 차단 및 도메인 교체
            </h3>
            <p className="text-xs text-[#737780] leading-relaxed">
              피해자가 추가 입금을 거절하거나 항의하면 즉시 아이디를 차단하고 텔레그램 연락처를 삭제한 뒤, 도메인을 변경하여 새로운 피해자를 물색합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Reference Table */}
      <section className="bg-white rounded-xl p-8 border border-[#E2DFD9] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
          대한민국 현행 법률상 처벌 기준
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E2DFD9]">
                <th className="py-3 px-4 font-semibold text-[#101B2A]">적용 법률</th>
                <th className="py-3 px-4 font-semibold text-[#101B2A]">위반 행위</th>
                <th className="py-3 px-4 font-semibold text-[#101B2A]">법정 형량</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFD9]">
              <tr>
                <td className="py-3 px-4 font-medium text-[#101B2A]">게임산업진흥에 관한 법률 제44조</td>
                <td className="py-3 px-4 text-[#737780]">등급을 받지 않은 불법 사행성 게임물의 유통 및 제공</td>
                <td className="py-3 px-4 font-semibold text-rose-700">5년 이하의 징역 또는 5천만원 이하의 벌금</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-[#101B2A]">형법 제247조 (도박개장죄)</td>
                <td className="py-3 px-4 text-[#737780]">영리의 목적으로 도박을 하는 장소나 공간을 개설한 자</td>
                <td className="py-3 px-4 font-semibold text-rose-700">5년 이하의 징역 또는 3천만원 이하의 벌금</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-[#101B2A]">형법 제246조 (도박죄)</td>
                <td className="py-3 px-4 text-[#737780]">불법 사설 게임 사이트에 접속하여 베팅을 진행한 행위</td>
                <td className="py-3 px-4 font-semibold text-rose-700">1천만원 이하의 벌금 (상습 시 3년 이하 징역)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Emergency Reporting Hotlines */}
      <section className="bg-[#101B2A] rounded-xl p-8 text-white space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
            REPORTING HOTLINE
          </span>
          <h2 className="font-serif text-2xl font-bold">
            불법 사행 사이트 피해 신고 및 구제 기관
          </h2>
          <p className="text-xs text-stone-300">
            의심 사이트를 발견하거나 금전 피해를 입은 경우 지체 없이 공적 기관에 신고하십시오.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-[#162335] border border-stone-700 space-y-1">
            <span className="text-[#C5A46D] font-bold block">경찰청 사이버수사국</span>
            <span className="text-white text-lg font-mono font-bold block">국번없이 182</span>
            <span className="text-stone-400 text-[11px]">사이버 사기 및 불법 도박 개설 신고</span>
          </div>

          <div className="p-4 rounded-lg bg-[#162335] border border-stone-700 space-y-1">
            <span className="text-[#C5A46D] font-bold block">사행산업통합감독위원회</span>
            <span className="text-white text-lg font-mono font-bold block">1855-0112</span>
            <span className="text-stone-400 text-[11px]">불법사행행위 감시 및 포상 신고센터</span>
          </div>

          <div className="p-4 rounded-lg bg-[#162335] border border-stone-700 space-y-1">
            <span className="text-[#C5A46D] font-bold block">한국도박문제예방치유원</span>
            <span className="text-white text-lg font-mono font-bold block">국번없이 1336</span>
            <span className="text-stone-400 text-[11px]">24시간 무료 전문 심리 치유 상담</span>
          </div>
        </div>
      </section>
    </div>
  );
};
