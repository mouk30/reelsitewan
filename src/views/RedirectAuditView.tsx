import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, FileCode, Search, ExternalLink } from 'lucide-react';
import { LEGACY_REDIRECT_MAP, LegacyRedirectRule, CORE_GAMES } from '../data/archiveData';
import { Breadcrumb } from '../components/Breadcrumb';

interface RedirectAuditViewProps {
  onNavigate: (path: string) => void;
}

export const RedirectAuditView: React.FC<RedirectAuditViewProps> = ({ onNavigate }) => {
  const [testInput, setTestInput] = useState('/bada.html');
  const [testResult, setTestResult] = useState<LegacyRedirectRule | null>(
    LEGACY_REDIRECT_MAP[0]
  );

  const handleTestRedirect = (url: string) => {
    setTestInput(url);
    const matched = LEGACY_REDIRECT_MAP.find(
      (r) => r.legacyUrl.toLowerCase() === url.trim().toLowerCase()
    );
    setTestResult(matched || null);
  };

  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto">
      <Breadcrumb items={[{ name: '301 이전 & 기술 SEO 감사', path: '/audit' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="space-y-4 border-b border-[#E2DFD9] pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A46D] tracking-widest uppercase">
          <span>TECHNICAL SEO AUDIT & URL MIGRATION</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101B2A] leading-tight">
          레거시 URL 301 리다이렉트 및 구글 색인 감사
        </h1>
        <p className="text-base text-[#737780] leading-relaxed">
          과거 사이트 분석 자료를 기반으로 한 구형 URL의 정규화(Canonicalization), 301 영구 이전 매핑, XML 사이트맵 및 Googlebot 크롤러 지침 검증 현황을 실시간 제공합니다.
        </p>
      </div>

      {/* Live Interactive Redirect Tester */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2DFD9] shadow-2xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#101B2A] flex items-center gap-2">
          <Search className="w-5 h-5 text-[#C5A46D]" />
          <span>301 영구 리다이렉트 실시간 검증기 (Live Redirect Simulator)</span>
        </h2>
        <p className="text-xs text-[#737780]">
          과거 구형 웹사이트의 비표준 URL(.html, .php, 쿼리 스트링)을 입력하여 SAFE TEAM의 표준 캐노니컬 슬러그로 정상 리다이렉트되는지 검사합니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="text"
            value={testInput}
            onChange={(e) => handleTestRedirect(e.target.value)}
            placeholder="예: /bada.html, /yamato/, /sonogong.php"
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-mono border border-[#E2DFD9] rounded-lg bg-[#F7F5F0] focus:outline-none focus:border-[#C5A46D]"
          />
          <button
            onClick={() => handleTestRedirect(testInput)}
            className="px-5 py-2.5 bg-[#101B2A] text-white text-xs font-semibold rounded-lg hover:bg-[#162335] transition-colors shrink-0"
          >
            리다이렉트 판정
          </button>
        </div>

        {/* Test Result Display */}
        {testResult ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>HTTP 301 Moved Permanently (정상 매핑 확인)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700 font-mono">
              <div>
                <span className="text-stone-400 block text-[11px]">요청 레거시 경로</span>
                <strong>{testResult.legacyUrl}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">이전 대상 캐노니컬 URL</span>
                <button
                  onClick={() => onNavigate(testResult.canonicalSlug)}
                  className="text-emerald-700 hover:underline font-bold"
                >
                  {testResult.canonicalSlug}
                </button>
              </div>
            </div>
            <p className="text-stone-500 text-[11px] pt-1">
              사유: {testResult.reason}
            </p>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>미등록 또는 신규 URL</span>
            </div>
            <p className="text-[11px]">
              입력하신 경로는 현재 301 매핑 테이블에 존재하지 않으므로 404 핸들러 또는 표준 백과 인덱스로 연결됩니다.
            </p>
          </div>
        )}
      </div>

      {/* Master 301 Mapping Table */}
      <section className="bg-white rounded-xl p-8 border border-[#E2DFD9] space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#101B2A]">
          공식 URL 이전 및 캐노니컬 매핑 명세표
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#101B2A] text-white">
                <th className="py-3 px-4 font-semibold">구형 레거시 경로</th>
                <th className="py-3 px-4 font-semibold">신규 표준 캐노니컬 경로</th>
                <th className="py-3 px-4 font-semibold">응답 코드</th>
                <th className="py-3 px-4 font-semibold">사유 및 조치</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFD9]">
              {LEGACY_REDIRECT_MAP.map((rule, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? 'bg-[#F7F5F0]/50' : ''}>
                  <td className="py-3 px-4 font-mono font-medium text-[#101B2A]">
                    {rule.legacyUrl}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#C5A46D]">
                    <button
                      onClick={() => onNavigate(rule.canonicalSlug)}
                      className="hover:underline"
                    >
                      {rule.canonicalSlug}
                    </button>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-700">
                    {rule.statusCode}
                  </td>
                  <td className="py-3 px-4 text-[#737780]">
                    {rule.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Googlebot Crawler Directives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#101B2A]">
              Google Robots.txt
            </h3>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#C5A46D] hover:underline flex items-center gap-1"
            >
              <span>전문 보기</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-[#737780] leading-relaxed">
            Googlebot 및 Google-Extended 크롤러에 대한 전체 공개 허용 및 내부 관리자/API 차단 정책을 엄격히 규정하고 있습니다.
          </p>
          <pre className="bg-[#101B2A] text-stone-300 p-3 rounded text-[11px] font-mono overflow-x-auto">
{`User-agent: Googlebot
Allow: /
Disallow: /api/
Sitemap: /sitemap.xml`}
          </pre>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E2DFD9] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#101B2A]">
              Google XML Sitemap
            </h3>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#C5A46D] hover:underline flex items-center gap-1"
            >
              <span>전문 보기</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-[#737780] leading-relaxed">
            7대 대표 기종 및 학술 리포트의 실제 존재하는 정규 Canonical URL만을 선별하여 ISO 8601 lastmod와 함께 제공합니다.
          </p>
          <pre className="bg-[#101B2A] text-stone-300 p-3 rounded text-[11px] font-mono overflow-x-auto">
{`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>/games/bada-story</loc>
    <lastmod>2026-10-17</lastmod>
  </url>
</urlset>`}
          </pre>
        </div>
      </div>
    </div>
  );
};
