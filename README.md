# 짐싸 - 다방 이사 앱 (Zimssa Dabang Movers App)

이사, 청소, 운송 서비스를 제공하는 모바일-퍼스트 웹 애플리케이션입니다.

## 🚀 기술 스택

- **프론트엔드**: Next.js 14, React 18, TypeScript
- **스타일링**: Tailwind CSS, Framer Motion
- **빌드 도구**: PostCSS, TypeScript
- **테스팅**: Playwright E2E Tests
- **배포**: Vercel 호환

## 📁 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 홈페이지
│   ├── moving/            # 이사 서비스 페이지
│   ├── cleaning/          # 청소 서비스 페이지
│   ├── delivery/          # 운송 서비스 페이지
│   ├── service/           # 통합 서비스 페이지
│   └── main/              # 서브 메인 페이지
├── components/
│   ├── layout/            # 헤더, 푸터 레이아웃 컴포넌트
│   ├── modals/            # 모달 컴포넌트
│   ├── sections/          # 페이지별 섹션 컴포넌트
│   │   ├── delivery/      # 운송 서비스 전용 섹션
│   │   ├── main/          # 메인 페이지 전용 섹션
│   │   ├── moving/        # 이사 서비스 전용 섹션
│   │   └── transportation/# 교통 서비스 전용 섹션
│   ├── ui/                # 재사용 가능한 UI 컴포넌트
│   ├── performance/       # 성능 모니터링 컴포넌트
│   └── hooks/             # 커스텀 React 훅
├── lib/                   # 유틸리티 함수
│   ├── constants.ts       # 앱 상수 및 설정
│   ├── utils.ts           # 헬퍼 함수
│   └── performance.ts     # 성능 최적화 유틸
├── public/                # 정적 리소스
│   ├── images/            # 이미지 에셋
│   └── icons/             # 아이콘 파일
├── docs/                  # 프로젝트 문서
├── tests/                 # E2E 테스트
└── hooks/                 # 전역 커스텀 훅
```

## 🛠️ 개발 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속

### 3. 빌드
```bash
npm run build
npm start
```

## 🧪 테스팅

### E2E 테스트 실행
```bash
npx playwright test
```

### 헤드리스 브라우저로 테스트
```bash
npm run test:e2e
```

## 📱 주요 기능

### 🏠 서비스 카테고리
- **이사**: 포장이사, 반포장이사, 원룸이사
- **청소**: 입주청소, 이사청소, 정기청소  
- **운송**: 용달, 화물, 퀵서비스
- **인터넷**: 신규설치, 이전설치

### 🎨 UI/UX 특징
- Zimssa 디자인 시스템 기반
- 모바일-퍼스트 반응형 디자인
- 부드러운 애니메이션 (Framer Motion)
- 성능 최적화된 이미지/비디오 로딩

### ⚡ 성능 최적화
- Next.js 14 App Router 활용
- 동적 임포트를 통한 코드 스플리팅
- 이미지 최적화 (next/image)
- Core Web Vitals 성능 모니터링

## 🚀 배포

Vercel에 최적화되어 있으며, 다음 명령으로 배포 가능:

```bash
npm run build
```

## 📄 라이센스

이 프로젝트는 다방무버스의 소유입니다.