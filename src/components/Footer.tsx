import React from 'react';
import { ShieldCheck, BookOpen, ExternalLink, ArrowUpRight } from 'lucide-react';
import { CORE_GAMES } from '../data/archiveData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#101B2A] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Disclaimer Banner */}
        <div className="bg-[#162335] rounded-lg p-6 mb-12 border border-stone-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[#C5A46D]/15 text-[#C5A46D] shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">
                SAFE TEAM 공공 정보 및 윤리 정책 (Zero-Gambling Policy)
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed max-w-3xl">
                본 아카이브는 1990~2000년대 한국 성인용 릴게임의 역사·문화적 변천과 제도적 폐해를 객관적으로 기록하는 공공 목적의 비영리 학술 자료실입니다.
                일체의 베팅, 환전, 게임 머니 충전, 불법 사설 도박 사이트의 실행이나 링크를 엄격히 금지하며, 그 어떠한 사행 행위도 보증하지 않습니다.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/guide')}
            className="shrink-0 text-xs text-[#C5A46D] hover:text-white font-medium flex items-center gap-1 transition-colors px-3 py-2 rounded border border-[#C5A46D]/30 hover:border-[#C5A46D]"
          >
            <span>안전 가이드 전문 읽기</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Grid Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Mission */}
          <div>
            <div className="mb-4">
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                SAFE TEAM
              </span>
              <span className="text-xs text-[#C5A46D] tracking-widest uppercase font-sans">
                릴게임 안전지대 아카이브
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              디지털 저널리즘과 아카이브 공학을 결합하여 한국 아케이드 게임사(史)의 격동기적 기록을 보존하고, 현대 온라인 사설 사기 피해로부터 이용자를 보호합니다.
            </p>
            <div className="text-[11px] text-stone-500 font-mono">
              Indexed for Googlebot · Schema.org Graph Enabled
            </div>
          </div>

          {/* Column 2: 7 Core Games */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold mb-4">
              핵심 대표 기종 백과
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              {CORE_GAMES.map((game) => (
                <li key={game.slug}>
                  <button
                    onClick={() => onNavigate(`/games/${game.slug}`)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {game.koreanName} ({game.englishName.split(' ')[0]})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Culture & Regulations */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold mb-4">
              역사·제도·문화 리포트
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('/journal/bada-story-regulatory-anatomy')}
                  className="hover:text-white transition-colors text-left"
                >
                  2006 바다이야기 사태의 제도적 해부
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/journal/arcade-culture-retrospective')}
                  className="hover:text-white transition-colors text-left"
                >
                  1990~2000년대 오락실 공간의 전이
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/journal/safety-fact-check-guide')}
                  className="hover:text-white transition-colors text-left"
                >
                  온라인 사설 릴게임 3대 사기 수법
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/comparator')}
                  className="hover:text-white transition-colors text-left"
                >
                  기종별 기술 스펙 비교기
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/archive')}
                  className="hover:text-white transition-colors text-left"
                >
                  오락실 추억 아카이브
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Technical SEO & Verification */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold mb-4">
              기술 구조 & 검증 도구
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors text-left"
                >
                  SAFE TEAM 편집 원칙 및 저널리즘 강령
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/audit')}
                  className="hover:text-white transition-colors text-left"
                >
                  301 영구 이전 & 캐노니컬 감사표
                </button>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Googlebot Robots.txt 검증</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>XML Sitemap 인덱스 확인</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 릴게임 SAFE TEAM (릴게임 안전지대). All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Google Search Essentials Compliant</span>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.1 AA Verified</span>
            <span aria-hidden="true">·</span>
            <span>Non-Commercial Archive</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
