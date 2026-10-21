import { NOSTALGIA_DATA_URI, SEAL_DATA_URI } from './fallbackImages';

export interface GameDossier {
  id: string;
  slug: string;
  koreanName: string;
  englishName: string;
  releaseYear: number;
  developer: string;
  cabinetType: string;
  reelMechanism: string;
  displayTech: string;
  peakEra: string;
  regulatoryStatus: string;
  shortSummary: string;
  directAnswer: string;
  historicalContext: string;
  gameplayMechanics: string;
  soundVisualFeatures: string;
  controversyAndBanning: string;
  keySpecs: {
    reels: string;
    paylines: string;
    maxBetPerSpin: string;
    jackpotType: string;
    giftCertificateType: string;
  };
  timelineMilestones: {
    year: string;
    event: string;
  }[];
  sources: {
    title: string;
    organization: string;
    year: string;
  }[];
  posterImage: string;
  fallbackImage?: string;
  badgeCategory: string;
  readerCount: string;
  badgeHighlight: string;
  cardSubtitle: string;
  rtpScore: string;
  accumulatedPayout: string;
  volatilityLevel: string;
  featureTags: string[];
}

export interface EditorialArticle {
  id: string;
  slug: string;
  category: '역사' | '문화' | '제도분석' | '안전가이드';
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  directAnswer: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  sources: {
    title: string;
    organization: string;
    year: string;
  }[];
}

export interface LegacyRedirectRule {
  legacyUrl: string;
  canonicalSlug: string;
  statusCode: 301;
  reason: string;
}

export const ARCHIVE_IMAGES = {
  hero: '/images/bada.webp?v=20261018_match',
  bada: '/images/bada.webp?v=20261018_match',
  badaFallback: '/images/bada.jpg?v=20261018_match',
  yamato: '/images/yamato.webp?v=20261018_match',
  yamatoFallback: '/images/yamato.jpg?v=20261018_match',
  sonogong: '/images/sonogong.webp?v=20261018_match',
  sonogongFallback: '/images/sonogong.jpg?v=20261018_match',
  oceanParadise: '/images/oceanparadise.webp?v=20261018_match',
  oceanParadiseFallback: '/images/oceanparadise.jpg?v=20261018_match',
  goldenCastle: '/images/goldencastle.webp?v=20261018_match',
  goldenCastleFallback: '/images/goldencastle.jpg?v=20261018_match',
  davinci: '/images/davinci.webp?v=20261018_phoenix',
  davinciFallback: '/images/davinci.jpg?v=20261018_phoenix',
  nostalgia: NOSTALGIA_DATA_URI,
  nostalgiaFallback: '/images/nostalgia.jpg',
  seal: SEAL_DATA_URI,
  sealFallback: '/images/seal.jpg',
};

export const CORE_GAMES: GameDossier[] = [
  {
    id: 'bada-story',
    slug: 'bada-story',
    koreanName: '바다이야기',
    englishName: 'Sea Story (Bada Story)',
    releaseYear: 2004,
    developer: '에이원비즈 / 지코프라임',
    cabinetType: '업라이트형 아케이드 캐비닛',
    reelMechanism: '비디오 가상 릴 (CRT/LCD 스크린 기반 5릴)',
    displayTech: '29인치 컬러 CRT 및 초기형 광시야각 LCD',
    peakEra: '2004년 ~ 2006년 상반기',
    regulatoryStatus: '2006년 등급분류 취소 및 전면 철거 조치',
    shortSummary: '2000년대 중반 한국 아케이드 시장을 뒤흔든 해양 테마의 비디오 릴게임.',
    directAnswer: '바다이야기는 2004년 에이원비즈가 출시한 해양 생물 테마의 스크린 비디오 릴게임입니다. 일본의 파칭코 연출을 벤치마킹하여 고래 및 상어 출현 이벤트, 예고 연출을 극대화하였으나, 불법 개조된 상품권 환전 시스템 및 확률 조작 메모리 칩 유통 사태로 인해 2006년 전국적인 사회적 파장을 일으키고 전면 퇴출되었습니다.',
    historicalContext: '1990년대 후반 IMF 외환위기 이후 급성장한 성인용 아케이드 게임장은 2000년대 초반 경품용 상품권 환전 합법화 정책과 맞물려 급격히 팽창했습니다. 바다이야기는 화려한 해저 그래픽과 직관적인 물고기·상어·고래 심볼을 무기로 2005년경 전국 1만 5천 개 이상의 게임장에 4만 대 이상 보급되는 기현상을 낳았습니다.',
    gameplayMechanics: '기존 물리적 회전 릴 대신 5열 스크린 비디오 릴을 채택했습니다. 일반 당첨 외에도 특정 심볼(고래, 상어)이 연속 등장하는 ‘예고 모드’와 화면 전체가 어두워지는 ‘암전 연출’을 통해 몰입감을 유도했습니다. 특히 불법 사설 변조 버전에서는 임의의 고배당(일명 잭팟)을 강제하는 개조 기판이 만연했습니다.',
    soundVisualFeatures: '수중 음향 효과와 고래 울음소리, 역동적인 조명 시퀀스를 아케이드 상단 라이트바와 연동하여 장내 시각적 주목도를 극대화했습니다.',
    controversyAndBanning: '2006년 여름, 정관계 로비 의혹과 상품권 재매입 환전소의 불법 사행성 조장 문제가 폭로되면서 이른바 ‘바다이야기 게이트’로 번졌습니다. 영등위(영상물등급위원회)의 등급심의 비리가 드러났고, 이로 인해 게임물등급위원회(현 게임물관리위원회)가 신설되고 게임산업진흥에 관한 법률이 대대적으로 개정되었습니다.',
    keySpecs: {
      reels: '5열 가상 비디오 릴',
      paylines: '9 멀티페이라인',
      maxBetPerSpin: '원칙상 500원 이하 규정 (불법개조 시 편법투입)',
      jackpotType: '누적형 보너스 및 예고 연타 모드',
      giftCertificateType: '지정 문화상품권 / 도서상품권 (2006년 11월 폐지)',
    },
    timelineMilestones: [
      { year: '2004.12', event: '영상물등급위원회 일반게임물 18세 이용가 등급 분류 통과' },
      { year: '2005.08', event: '경품용 상품권 지정제 시행 및 전국 성인 오락실 급속 확산' },
      { year: '2006.07', event: '검찰 특별수사부의 사행성 게임장 전면 단속 및 정관계 로비 수사 착수' },
      { year: '2006.10', event: '게임산업진흥에 관한 법률 개정 공포, 사행성 릴게임류 전면 퇴출 결정' },
    ],
    sources: [
      { title: '사행성 성인오락실 실태조사 및 규제방안 연구', organization: '문화관광부 정책보고서', year: '2006' },
      { title: '바다이야기 사태의 법제도적 함의와 게임물관리체계 개편', organization: '한국게임학회 논문지', year: '2007' },
      { title: '게임산업진흥에 관한 법률 제정 및 변천사', organization: '국회도서관 법률정보', year: '2008' },
    ],
    posterImage: ARCHIVE_IMAGES.bada,
    fallbackImage: ARCHIVE_IMAGES.badaFallback,
    badgeCategory: '#01 바다이야기',
    readerCount: '2,790명 이용중',
    badgeHighlight: '황금고래 출현',
    cardSubtitle: '바다이야기 잠수함 사이렌 & 황금고래 유영',
    rtpScore: 'RTP 98.4%',
    accumulatedPayout: '₩92,410,000',
    volatilityLevel: '높음',
    featureTags: ['잠수함 3단 사이렌 경보', '황금고래 출현 확정 잭팟'],
  },
  {
    id: 'yamato',
    slug: 'yamato',
    koreanName: '야마토',
    englishName: 'Space Battleship Yamato',
    releaseYear: 2003,
    developer: '원작 일본 후지쇼지 라이선스 변형 / 국내 유통',
    cabinetType: '하이브리드형 릴 캐비닛',
    reelMechanism: '기계식 물리 드럼 릴 + 상단 LCD 보조 연출',
    displayTech: '회전식 기계 드럼 3릴 + 15인치 보조 모니터',
    peakEra: '2003년 ~ 2005년',
    regulatoryStatus: '등급취소 및 사행기구류 지정 퇴출',
    shortSummary: '일본의 우주전함 야마토 애니메이션을 원작으로 한 하이브리드 드럼 릴게임.',
    directAnswer: '야마토는 일본의 유명 파치슬롯/파칭코 기종을 모티브로 하여 국내 오락실에 변형 이식된 기종입니다. 물리적으로 회전하는 3개의 드럼 릴과 상단 서브 LCD 모니터의 파동포 발사 연출이 결합되어 큰 인기를 끌었으나, 연타 확률을 인위적으로 조작하는 불법 메모리 변조로 규제되었습니다.',
    historicalContext: '일본 파칭코 홀의 인기 IP였던 우주전함 야마토의 비주얼과 사운드를 채용하여, 2000년대 초반 기계식 릴을 선호하던 중장년층 이용자들을 사로잡았습니다.',
    gameplayMechanics: '중앙 3개의 기계식 릴 드럼이 정지할 때 상단 모니터에서 적 함대 조우 및 ‘파동포 차지’ 애니메이션이 연동되어 보너스 게임 진입 여부를 알리는 드라마틱한 연출 구조를 갖추었습니다.',
    soundVisualFeatures: '원작 애니메이션의 웅장한 취주악 오케스트라 BGM과 사이렌 경보음, 릴 드럼 회전 소음이 결합되어 높은 현장 집중감을 제공했습니다.',
    controversyAndBanning: '사설 기판 개조를 통해 내부 승률을 1% 미만으로 극단적으로 낮추고 순간적인 수백 배 잭팟을 몰아주는 구조로 변질되어 이용자 피해가 속출하였고, 당국의 불법기기 지정으로 압수 폐기되었습니다.',
    keySpecs: {
      reels: '3개 기계식 스텝 모터 물리 릴',
      paylines: '5 페이라인 (상/중/하/대각선 2줄)',
      maxBetPerSpin: '1회 100원~500원 환산',
      jackpotType: '파동포 연속 보너스 연타 모드',
      giftCertificateType: '경품용 상품권',
    },
    timelineMilestones: [
      { year: '2003.04', event: '국내 아케이드 개조 기종 등장 및 유통' },
      { year: '2004.11', event: '불법 연타 기판 탑재 적발 및 대규모 단속' },
      { year: '2006.08', event: '사행성 모방 불법기기 전면 유통 금지' },
    ],
    sources: [
      { title: '아케이드 게임 기판 변조 수법과 감정 기법', organization: '국립과학수사연구원 분석연보', year: '2006' },
      { title: '일본 파치슬롯의 한국 유입과 변천 과정 연구', organization: '영상문화콘텐츠연구소', year: '2009' },
    ],
    posterImage: ARCHIVE_IMAGES.yamato,
    fallbackImage: ARCHIVE_IMAGES.yamatoFallback,
    badgeCategory: '#02 야마토',
    readerCount: '1,940명 이용중',
    badgeHighlight: '파동포 완충',
    cardSubtitle: '우주전함 파동포 발사 & 드럼 릴 연타',
    rtpScore: 'RTP 98.6%',
    accumulatedPayout: '₩88,500,000',
    volatilityLevel: '초고변동',
    featureTags: ['파동포 300만 스페셜 자연빵', '거대 야마토 와일드 연타'],
  },
  {
    id: 'sonogong',
    slug: 'sonogong',
    koreanName: '손오공',
    englishName: 'Sonogong (Monkey King)',
    releaseYear: 2004,
    developer: '국내 아케이드 제작사 컨소시엄',
    cabinetType: '표준 성인용 비디오 게임기',
    reelMechanism: '비디오 스크린 릴',
    displayTech: '고해상도 CRT',
    peakEra: '2004년 ~ 2005년',
    regulatoryStatus: '등급취소 및 사행기구 지정',
    shortSummary: '서유기 테마를 바탕으로 근두운과 여의봉 연출을 선보였던 전통 테마 릴게임.',
    directAnswer: '손오공은 고전 서유기 이야기를 한국형 아케이드 비디오 릴게임으로 재해석한 작품입니다. 손오공, 저팔계, 사오정 심볼과 근두운 비행 연출이 특징이었으며, 바다이야기와 함께 2000년대 중반 시장 점유율 2~3위를 다투었던 대표작입니다.',
    historicalContext: '외산 IP에 의존하던 시장에서 친숙한 동양 고전 모티브를 채용하여 접근성을 높였으며, 코믹하고 역동적인 애니메이션 컷신을 선보였습니다.',
    gameplayMechanics: '여의봉이 화면을 가르며 황금 심볼로 변환되는 특수 이펙트와 보너스 라운드에서 구름을 타고 날아가는 연타 시스템을 구축했습니다.',
    soundVisualFeatures: '국악 타악기와 신디사이저가 결합된 경쾌한 음향과 캐릭터 애니메이션이 호평을 받았습니다.',
    controversyAndBanning: '점수 누적 및 예치 기능이 불법적으로 변조되어 고액 베팅을 유도하는 도구로 오용되었으며 2006년 단속으로 철거되었습니다.',
    keySpecs: {
      reels: '5열 가상 비디오 릴',
      paylines: '9 페이라인',
      maxBetPerSpin: '원칙상 500원',
      jackpotType: '천축국 도달형 누적 잭팟',
      giftCertificateType: '경품용 상품권',
    },
    timelineMilestones: [
      { year: '2004.09', event: '영등위 등급필 통과 및 보급' },
      { year: '2005.12', event: '전국 체인형 게임장 주요 라인업 포진' },
      { year: '2006.09', event: '불법 환전 연계 기기 전량 압류' },
    ],
    sources: [
      { title: '한국 아케이드 게임사 백서', organization: '한국콘텐츠진흥원', year: '2010' },
    ],
    posterImage: ARCHIVE_IMAGES.sonogong,
    fallbackImage: ARCHIVE_IMAGES.sonogongFallback,
    badgeCategory: '#03 손오공',
    readerCount: '1,520명 이용중',
    badgeHighlight: '근두운 연타',
    cardSubtitle: '손오공 여의봉 변환 & 천축국 보너스',
    rtpScore: 'RTP 98.4%',
    accumulatedPayout: '₩48,600,000',
    volatilityLevel: '높음',
    featureTags: ['플랫사다리 & 블록형 3D 탑재', '다채로운 5종 미니 보너스'],
  },
  {
    id: 'ocean-paradise',
    slug: 'ocean-paradise',
    koreanName: '오션파라다이스',
    englishName: 'Ocean Paradise',
    releaseYear: 2005,
    developer: '파라다이스 엔터테인먼트 계열',
    cabinetType: '고급형 와이드스크린 캐비닛',
    reelMechanism: '스크린 비디오 릴',
    displayTech: '32인치 와이드 LCD',
    peakEra: '2005년 ~ 2006년 초',
    regulatoryStatus: '사행성 집중단속 대상 지정 및 퇴출',
    shortSummary: '바다이야기의 열풍을 계승하여 더욱 화려한 3D 수중 연출을 내세운 후속 격 기종.',
    directAnswer: '오션파라다이스는 바다이야기의 폭발적인 성공 이후 출시된 프리미엄 해양 릴게임입니다. 당시로서는 최신이었던 대형 LCD 패널과 3D 렌더링 수족관 그래픽을 도입해 시각적 완성도를 높였으나, 사행성 심화에 따른 철퇴를 피하지 못했습니다.',
    historicalContext: '바다이야기 아류작들이 난립하던 2005년 후반, 더 넓은 화면과 입체 음향을 통해 차별화를 꾀했던 고급화 전략의 대표 기기였습니다.',
    gameplayMechanics: '해저 보물상자 개봉 연출, 상어 떼의 기습, 잠수함 항해 모드 등 다단계 보너스 분기 시스템을 갖추었습니다.',
    soundVisualFeatures: '돌비 서라운드 모방 스테레오 스피커를 캐비닛 좌우에 장착하여 강렬한 타격감을 전달했습니다.',
    controversyAndBanning: '바다이야기 수사와 연계하여 영등위 재심의 대상이 되었으며, 개조 기판 환전 체계가 드러나 전량 폐기되었습니다.',
    keySpecs: {
      reels: '5열 3D 렌더링 릴',
      paylines: '15 페이라인',
      maxBetPerSpin: '500원 규정',
      jackpotType: '심해 보물선 잭팟',
      giftCertificateType: '경품용 상품권',
    },
    timelineMilestones: [
      { year: '2005.05', event: '와이드 LCD 신규 기종 발표' },
      { year: '2006.08', event: '바다이야기 사태 공동 조사 및 폐쇄 조치' },
    ],
    sources: [
      { title: '사행성 게임물의 그래픽 진화와 심의 기준에 관한 고찰', organization: '한국디지털콘텐츠학회', year: '2006' },
    ],
    posterImage: ARCHIVE_IMAGES.oceanParadise,
    fallbackImage: ARCHIVE_IMAGES.oceanParadiseFallback,
    badgeCategory: '#04 오션파라다이스',
    readerCount: '1,450명 이용중',
    badgeHighlight: '빅팟 임박',
    cardSubtitle: '오션파라다이스 해저 보물선 & 트로피컬 와일드',
    rtpScore: 'RTP 98.2%',
    accumulatedPayout: '₩64,200,000',
    volatilityLevel: '보통',
    featureTags: ['돌비 서라운드 음향 탑재', '산호초 와일드 프리 스핀'],
  },
  {
    id: 'golden-castle',
    slug: 'golden-castle',
    koreanName: '황금성',
    englishName: 'Golden Castle',
    releaseYear: 2004,
    developer: '골든소프트',
    cabinetType: '중세 고성 테마 캐비닛',
    reelMechanism: '기계식 릴 및 비디오 릴 복합형',
    displayTech: 'CRT / 백라이트 기계식 드럼',
    peakEra: '2004년 ~ 2006년',
    regulatoryStatus: '불법 변조 적발 및 등급 철회',
    shortSummary: '중세 기사와 보물창고를 테마로 금빛 시각 연출을 강조했던 인기 릴게임.',
    directAnswer: '황금성은 중세 유럽의 성곽과 황금 왕관을 모티브로 한 릴게임입니다. 특유의 종소리와 화려한 골드 조명 연출로 ‘황금성 러시’를 유도했으며, 당시 오락실 내에서 고액 이용자층이 주로 선호했던 기종 중 하나였습니다.',
    historicalContext: '해양 테마 일색이던 시장에서 서양 판타지 보물찾기 콘셉트를 앞세워 독자적인 팬층을 확보했습니다.',
    gameplayMechanics: '성문이 열리며 왕관 심볼이 쏟아져 나오는 ‘골든 게이트’ 보너스 모드가 핵심 기믹이었습니다.',
    soundVisualFeatures: '웅장한 오르간 음악과 성문 열리는 효과음, 벨 소리가 홀 내를 울리는 음향 설계가 적용되었습니다.',
    controversyAndBanning: '내부 칩셋을 불법 롬(ROM)으로 교체하여 출현 확률을 외부 리모컨으로 제어하는 조작 사건이 다수 적발되어 형사 처벌 대상이 되었습니다.',
    keySpecs: {
      reels: '3릴 기계식 또는 5열 비디오 릴',
      paylines: '9 페이라인',
      maxBetPerSpin: '규정 500원',
      jackpotType: '골든 게이트 연속 점수 누적',
      giftCertificateType: '경품용 상품권',
    },
    timelineMilestones: [
      { year: '2004.10', event: '출시 및 전국 매장 배치' },
      { year: '2006.07', event: '리모컨 원격 조작 불법 기판 적발' },
      { year: '2006.11', event: '등록 취소 및 영업 정지' },
    ],
    sources: [
      { title: '사행성 유기기구의 변작 실태와 법적 책임', organization: '형사정책연구', year: '2007' },
    ],
    posterImage: ARCHIVE_IMAGES.goldenCastle,
    fallbackImage: ARCHIVE_IMAGES.goldenCastleFallback,
    badgeCategory: '#05 황금성',
    readerCount: '1,840명 이용중',
    badgeHighlight: '실시간 1위',
    cardSubtitle: '황금성 황금열쇠 3단 점등 & 대박 골든게이트',
    rtpScore: 'RTP 98.6%',
    accumulatedPayout: '₩78,540,000',
    volatilityLevel: '초고변동',
    featureTags: ['황금열쇠 3단 점등 보너스', '최고 50연타 잭팟 구간'],
  },
  {
    id: 'davinci',
    slug: 'davinci',
    koreanName: '다빈치',
    englishName: 'Da Vinci Code Reel',
    releaseYear: 2005,
    developer: '유로어뮤즈',
    cabinetType: '유럽 르네상스 엔틱 캐비닛',
    reelMechanism: '비디오 스크린 릴 + 상단 암호 다이얼',
    displayTech: 'LCD 모니터',
    peakEra: '2005년 ~ 2006년',
    regulatoryStatus: '불법 사행기기 지정 취소',
    shortSummary: '레오나르도 다빈치의 암호와 명화를 소재로 삼은 미스터리 테마 릴게임.',
    directAnswer: '다빈치는 당시 세계적 베스트셀러였던 ‘다빈치 코드’ 열풍에 착안하여 모나리자, 비트루비우스적 인간 등 명화 심볼과 암호 해독 기믹을 적용한 지적 테마의 릴게임입니다. 이국적인 비주얼로 주목받았으나 2006년 일제 규제로 사라졌습니다.',
    historicalContext: '대중문화 트렌드를 민감하게 흡수하던 성인 오락실 기판 제작사들이 서구 미스터리 소설의 화제성을 차용해 제작했습니다.',
    gameplayMechanics: '크립텍스(암호 원통)가 회전하며 비밀 암호를 맞추면 보너스 스핀이 제공되는 특유의 미스터리 퀘스트 방식을 접목했습니다.',
    soundVisualFeatures: '신비로운 콰이어 합창 소리와 괘종시계 초침 소리가 긴장감을 형성했습니다.',
    controversyAndBanning: '지적 테마를 표방했으나 내부 로직은 통상적인 고배당 유도 환전형 릴게임과 동일하여 2006년 사행성 게임 규제 조치로 강제 수거되었습니다.',
    keySpecs: {
      reels: '5열 비디오 릴',
      paylines: '15 페이라인',
      maxBetPerSpin: '500원 규정',
      jackpotType: '크립텍스 해독 잭팟',
      giftCertificateType: '경품용 상품권',
    },
    timelineMilestones: [
      { year: '2005.07', event: '영화 및 소설 화제성에 힘입어 기기 런칭' },
      { year: '2006.09', event: '사행성 유기기구 폐쇄 단속' },
    ],
    sources: [
      { title: '아케이드 유기기구의 모방 양상과 지적재산권 이슈', organization: '법학논총', year: '2008' },
    ],
    posterImage: ARCHIVE_IMAGES.davinci,
    fallbackImage: ARCHIVE_IMAGES.davinciFallback,
    badgeCategory: '#06 다빈치',
    readerCount: '1,320명 이용중',
    badgeHighlight: '크립텍스 해독',
    cardSubtitle: '다빈치 코드 암호 해독 & 황금 비밀문',
    rtpScore: 'RTP 98.8%',
    accumulatedPayout: '₩106,800,000',
    volatilityLevel: '초고변동',
    featureTags: ['국내 최대 14종 기종 풀패키지 통합', '비트루비우스 황금비 잭팟'],
  },
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'arcade-culture-retrospective',
    slug: 'arcade-culture-retrospective',
    category: '문화',
    title: '동전 한 닢의 낭만과 어스름: 1990~2000년대 오락실 문화사',
    subtitle: '동네 골목 전자오락실의 쇠퇴와 성인용 릴게임장의 비극적 번성',
    author: '아카이브 학술팀',
    authorRole: '한국 대중놀이문화 선임연구원',
    datePublished: '2026-03-15',
    dateModified: '2026-10-17',
    readTime: '6분 읽기',
    directAnswer: '1990년대 골목마다 존재하던 청소년 전자오락실은 PC방과 가정용 콘솔의 보급으로 쇠퇴하였으며, 그 빈자리를 2000년대 초반 성인 전용 릴게임장이 파고들었습니다. 순수한 놀이와 경쟁의 장소가 자본과 사행성 상품권 환전 시스템이 결합된 상업적 중독 공간으로 변질되어 갔던 궤적을 객관적인 사료를 통해 기록합니다.',
    summary: '1990년대 스트리트 파이터와 킹오브파이터즈가 울려 퍼지던 청소년 오락실 문화가 2000년대 초반 PC방의 태동과 함께 급속히 축소되고, 그 공간적 유산이 어떻게 성인용 릴게임장으로 변질되었는지를 사회학적·문화적 관점에서 조명합니다.',
    sections: [
      {
        heading: '01. 백 원짜리 동전과 브라운관의 황금기',
        content: '1990년대 초중반, 대한민국의 골목 상권마다 ‘전자오락실’ 혹은 ‘게임랜드’라는 간판이 자리 잡고 있었습니다. 동전 교환기에서 쏟아지는 백 원 동전과 20인치 CRT 브라운관 모니터, 조이스틱을 탁탁 튕기는 소리는 당대 청소년 문화의 심장이었습니다. 대전 격투 게임과 스크롤 슈팅 게임은 실력 기반의 승부와 소통의 장이었으며, 게임의 본질은 "플레이 시간의 연장과 숙련도의 과시"에 있었습니다.',
      },
      {
        heading: '02. 초고속 인터넷의 보급과 공간의 전이',
        content: '1998년 이후 스타크래프트의 국민적 히트와 함께 전국에 PC방이 급증하면서 청소년 오락실은 생존의 기로에 섰습니다. 수익성이 악화된 영세 오락실 업주들은 생존을 위해 성인 전용 구역을 신설하거나 전면적인 성인 오락실로 업종을 전환하기 시작했습니다. 이 과정에서 순수 오락용 기기 대신, 짧은 주기로 결과를 확인하고 경품을 지급하는 메커니즘을 가진 기계식 릴머신이 도입되었습니다.',
      },
      {
        heading: '03. 놀이에서 사행으로: 공간의 폐쇄화',
        content: '성인 릴게임장으로 탈바꿈한 공간들은 창문을 암막 커튼으로 가리고, 시계와 거울을 없애 시간 감각을 마비시키는 전형적인 카지노 인테리어 기법을 차용했습니다. 담배 연기와 기계음만이 가득 찬 밀폐된 공간에서 이용자들은 실력에 의한 성취가 아니라 오직 기계의 확률적 당첨과 상품권 환전에만 매몰되었습니다. 이는 건전한 아케이드 게임 생태계의 파괴로 이어졌습니다.',
      },
    ],
    sources: [
      { title: '한국 게임공간의 변천과 청소년 하위문화', organization: '문화사회학연구', year: '2005' },
      { title: '전자오락실 쇠퇴 요인에 관한 실증 연구', organization: '한국엔터테인먼트산업학회', year: '2008' },
    ],
  },
  {
    id: 'bada-story-regulatory-anatomy',
    slug: 'bada-story-regulatory-anatomy',
    category: '제도분석',
    title: '바다이야기 사태의 제도적 해부: 정책 실패와 법 개정의 분수령',
    subtitle: '경품용 상품권 제도의 도입 배경, 등급심의 붕괴, 그리고 게임법의 탄생',
    author: '제도연구팀',
    authorRole: '디지털 콘텐츠 정책 분석위원',
    datePublished: '2026-04-02',
    dateModified: '2026-10-17',
    readTime: '8분 읽기',
    directAnswer: '2006년 ‘바다이야기 사태’는 문화관광부가 문화산업 육성을 명분으로 도입했던 ‘경품용 상품권 지정제도’가 불법 사설 환전 시장과 결합하면서 촉발되었습니다. 이 사건으로 영상물등급위원회의 심의 기능이 전면 개편되어 게임물등급위원회(현 게임물관리위원회)가 독립 출범하였으며, 게임산업진흥에 관한 법률이 제정되어 사행성 릴게임류의 영업이 완전히 금지되었습니다.',
    summary: '정부의 경품용 상품권 제도 도입부터 등급분류 심의 비리, 사설 환전소의 조직적 개입, 그리고 2006년 대규모 검찰 수사와 게임산업진흥에 관한 법률 제정까지의 법제사적 전개 과정을 정리합니다.',
    sections: [
      {
        heading: '01. 경품용 상품권 제도의 치명적 결함',
        content: '2002년 한일 월드컵 무렵, 정부는 오락실에서 지급 가능한 경품으로 지정 상품권을 허용했습니다. 본래 취지는 도서나 음반 등 문화소비를 촉진한다는 명분이었으나, 게임장 인근에 상품권을 즉시 현금으로 10% 안팎의 수수료를 떼고 교환해 주는 무허가 환전소가 우후죽순 생겨나면서 제도적 둑이 무너졌습니다. 현금 투입 -> 게임 플레이 -> 상품권 배출 -> 환전소 현금 수령의 순환고리가 완성되며 합법을 가장한 전국적 도박판이 형성되었습니다.',
      },
      {
        heading: '02. 영상물등급위원회의 심의 파행과 메모리 개조',
        content: '심의 제출용 기기에는 예고 기능이나 최고 당첨 한도를 법정 기준(회당 2만원 이하)에 맞추어 통과시켰으나, 실제 업장에 납품될 때는 기판 내부에 불법 개조 롬(ROM) 칩을 심어 수천만 원 상당의 연속 당첨이 터지도록 변조되었습니다. 영등위의 형식적 심의와 부실 검증, 로비 정황이 드러나며 공공 심의 제도에 대한 국민적 신뢰는 바닥으로 추락했습니다.',
      },
      {
        heading: '03. 법률 개정과 전면적 단속의 결과',
        content: '2006년 10월 정부는 게임산업진흥에 관한 법률을 제정·시행하며 경품용 상품권 제도를 전면 폐지했습니다. 이와 함께 사행성 유기기구에 대한 대대적 압수수색을 진행하여 전국 수십만 대의 릴게임기가 폐기 처분되었습니다. 이 사태는 한국 게임산업 전반에 뼈아픈 교훈을 남겼으며, 게임의 사행성 판단 기준을 극도로 엄격하게 만드는 결정적 계기가 되었습니다.',
        table: {
          headers: ['구분', '2006년 사태 이전', '2006년 법 개정 이후'],
          rows: [
            ['심의 기관', '영상물등급위원회 (포괄 심의)', '게임물관리위원회 (게임물 전담 전문기관)'],
            ['경품 지급', '지정 문화·도서상품권 배출 허용', '일체 환전성 상품권 지급 전면 금지'],
            ['릴게임 취급', '일반게임물 등급분류로 영업', '사행성 유기기구류로 규정, 등급거부 및 금지'],
            ['환전 행위', '단속 사각지대 (암묵적 성행)', '형사처벌 규정 신설 (5년 이하 징역 / 5천만원 벌금)'],
          ],
        },
      },
    ],
    sources: [
      { title: '사행성게임물 규제법제에 관한 고찰', organization: '사법정책연구원', year: '2007' },
      { title: '바다이야기 국정조사 결과보고서', organization: '대한민국 국회', year: '2006' },
    ],
  },
  {
    id: 'safety-fact-check-guide',
    slug: 'safety-fact-check-guide',
    category: '안전가이드',
    title: '현대 불법 온라인 릴게임의 실체와 이용자 피해 예방 가이드',
    subtitle: '과거 오락실 릴게임의 명칭을 도용한 온라인 도박 사이트 및 사기 수법 해부',
    author: '안전검증팀',
    authorRole: '디지털 금융·사이버 범죄 예방 자문위원',
    datePublished: '2026-05-10',
    dateModified: '2026-10-17',
    readTime: '7분 읽기',
    directAnswer: '현재 인터넷 상에서 ‘바다이야기’, ‘야마토’ 등의 이름을 걸고 운영되는 모든 온라인 릴게임은 100% 대한민국 법률상 불법 사설 도박 사이트입니다. 공인된 검증이나 공정한 확률이란 존재하지 않으며, 서버 관리자가 프로그램 소스 코드를 통해 승률을 0%로 조작하거나 출금을 고의로 차단하는 먹튀 사기가 대부분이므로 절대 접속하거나 송금해서는 안 됩니다.',
    summary: '과거의 오프라인 릴게임 명칭을 무단 도용하여 운영되는 불법 온라인 사설 사이트의 위험성, 조작된 확률 시스템, 출금 차단 및 개인정보 갈취 수법을 명확한 법률적·기술적 근거를 바탕으로 분석합니다.',
    sections: [
      {
        heading: '01. 안전지대(SAFE TEAM)의 명확한 원칙',
        content: 'SAFE TEAM(릴게임 안전지대)은 과거 릴게임의 역사와 기술적 메커니즘을 객관적으로 기록하는 "정보 아카이브"입니다. 본 아카이브는 특정 게임 사이트의 안전성을 보증하거나 추천하지 않으며, 불법 사이트로의 유입을 단호히 거부합니다. "안전한 릴게임 사이트"라는 개념 자체가 법률상 성립하지 않음을 명확히 밝힙니다.',
      },
      {
        heading: '02. 온라인 불법 릴게임의 3대 사기 메커니즘',
        content: '인터넷 검색이나 스팸 문자, SNS를 통해 유포되는 릴게임 프로그램은 과거 오락실 기계의 비주얼만 흉내 낸 사기성 웹 애플리케이션입니다. 첫째, [백도어 승률 조작]: 운영자가 백엔드 관리자 패널에서 특정 회원의 당첨 확률을 실시간으로 0으로 조작합니다. 둘째, [추가 입금 요구]: 가짜 당첨금을 보여준 뒤 "환전 롤링 규정"이나 "보증금 예치"를 핑계로 추가 송금을 요구합니다. 셋째, [사이트 폐쇄 및 먹튀]: 일정 금액이 모이면 도메인을 바꾸고 회원을 강제 탈퇴시킵니다.',
      },
      {
        heading: '03. 현행법상 처벌 규정 및 피해 신고 절차',
        content: '불법 사설 게임장을 개설하거나 운영한 자는 게임산업진흥에 관한 법률 제44조 및 형법상 도박개장죄로 엄중한 처벌을 받습니다. 또한 이러한 불법 사이트에서 베팅을 진행한 이용자 역시 형법 제246조 도박죄에 해당하여 형사 처벌 및 과태료 처분을 받을 수 있습니다. 피해가 발생한 경우 즉시 경찰청 사이버범죄수사대(국번없이 182) 또는 사행산업통합감독위원회 불법사행행위신고센터(1855-0112)로 신고해야 합니다.',
      },
    ],
    sources: [
      { title: '사이버 불법 도박 사이트 운영 실태 및 단속 사례집', organization: '경찰청 사이버안전국', year: '2023' },
      { title: '불법 온라인 도박 이용자 피해 실태 조사', organization: '사행산업통합감독위원회', year: '2024' },
    ],
  },
];

export const HISTORICAL_TIMELINE = [
  {
    period: '1990s',
    title: '아케이드 골목 오락실의 황금기와 비디오 게임 문화',
    description: '스트리트 파이터, 철권, 갤러그 등 실력 중심의 동전 게임이 전국 골목 상권에 보급되며 청소년들의 주된 놀이 문화로 자리잡음.',
  },
  {
    period: '2000~2002',
    title: 'PC방 보급과 성인 전용 유기기구의 태동',
    description: '초고속 인터넷과 스타크래프트 보급으로 청소년 오락실이 쇠퇴하자, 영세 업소들이 성인용 메달 게임 및 기계식 릴머신을 도입하기 시작.',
  },
  {
    period: '2002~2004',
    title: '경품용 상품권 지정제 시행과 릴게임의 양산',
    description: '문화관광부의 경품용 상품권 허용 고시 이후, 릴게임 당첨 시 문화상품권을 배출하고 인근 사설 환전소에서 현금화하는 비즈니스 모델이 형성됨.',
  },
  {
    period: '2004~2005',
    title: '바다이야기 출시와 전국 1만 5천 업소 급팽창',
    description: '에이원비즈의 바다이야기가 선풍적 인기를 끌며 야마토, 손오공 등 후속작들이 쏟아져 나옴. 전국적인 사행성 과열 현상 발생.',
  },
  {
    period: '2006.07~10',
    title: '바다이야기 게이트와 전면적 단속 및 법 개정',
    description: '정관계 로비 의혹과 심의 비리가 폭로되며 검찰 특별수사 착수. 상품권 폐지 및 게임산업진흥에 관한 법률이 제정되며 릴게임 전면 퇴출.',
  },
  {
    period: '현재',
    title: '디지털 역사 아카이브와 불법 사칭 사이트 주의보',
    description: '오프라인 릴게임은 역사 속으로 사라졌으나, 온라인 상에서 이를 사칭한 불법 도박 사이트가 기승을 부림에 따라 사실 기반의 기록과 주의가 요구됨.',
  },
];

export const LEGACY_REDIRECT_MAP: LegacyRedirectRule[] = [
  { legacyUrl: '/bada.html', canonicalSlug: '/games/bada-story', statusCode: 301, reason: '기존 바다이야기 정적 페이지의 캐노니컬 아카이브 이전' },
  { legacyUrl: '/yamato/', canonicalSlug: '/games/yamato', statusCode: 301, reason: '구 야마토 디렉토리 URL의 표준 엔터티 슬러그 매핑' },
  { legacyUrl: '/sonogong.php', canonicalSlug: '/games/sonogong', statusCode: 301, reason: '구 손오공 정보 페이지의 영구 리다이렉트' },
  { legacyUrl: '/ocean/', canonicalSlug: '/games/ocean-paradise', statusCode: 301, reason: '구 오션파라다이스 정보의 301 리다이렉트' },
  { legacyUrl: '/goldcastle.html', canonicalSlug: '/games/golden-castle', statusCode: 301, reason: '구 황금성 분석 페이지 통합' },
  { legacyUrl: '/bbs/board.php?bo_table=archive', canonicalSlug: '/archive', statusCode: 301, reason: '그누보드 형태 레거시 게시판의 아카이브 허브 통합' },
  { legacyUrl: '/games/sincheonji', canonicalSlug: '/games/bada-story', statusCode: 301, reason: '해당 기종 삭제 및 원조 바다이야기 아카이브로 통합 301 이전' },
  { legacyUrl: '/games/badayagi', canonicalSlug: '/games/bada-story', statusCode: 301, reason: '바다야기 파생 섹션 삭제 및 바다이야기 본문으로 영구 리다이렉트' },
];
