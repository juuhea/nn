# 개인 포트폴리오 사이트 개발 계획서 (DEV_PLAN)

> 기준 문서: [PRD.md](file:///c:/nn/docs/PRD.md)  
> 현재 상태: Next.js App Router + TypeScript 기반 프론트엔드 UI/라우팅 골격 구현 완료 (샘플 데이터 및 임시 이미지 적용 상태)

---

## 1. 현재 구현 현황 점검

| 영역 | 구현 파일 | 현재 상태 | 비고 |
| --- | --- | --- | --- |
| 공통 프로필 | `content/profile.ts` | 완료 | 이름·직무·이메일·Instagram 단일 관리 (`layout.tsx`, `page.tsx`, `contact.tsx`, `[slug]/page.tsx` 연동) |
| 데이터 스키마 | `content/projects.ts` | 완료 | `CATEGORIES`, `Project`, `MediaItem`(`image` / `video` / `youtube`) 정의 및 샘플 4건 포함 |
| 메인 화면 (`/`) | `app/page.tsx`, `components/project-list.tsx` | 완료 | `ALL` + 6개 카테고리 필터, PC 4열 / 모바일 2열 그리드, 빈 목록 처리 구현 |
| 상세 화면 (`/projects/[slug]`) | `app/projects/[slug]/page.tsx`, `components/media-item.tsx` | 완료 | `generateStaticParams`, `generateMetadata`, `PERIOD·ROLE·CATEGORY`, 이미지·MP4·YouTube 렌더링 구현 |
| 공통 Contact | `components/contact.tsx` | 완료 | `content/profile.ts` 연동 (`박주혜 Juhye`, `Designer`, `mailto:juwisdom0504@gmail.com`, `Instagram @juuhsuun`) |

---

## 2. 남은 개발 및 작업 순서

### Step 1. 공통 프로필 및 데이터 구조 정리 — [완료]
- `content/profile.ts`를 생성해 이름·직무·이메일·Instagram 정보를 단일화하고, `app/layout.tsx`, `app/page.tsx`, `app/projects/[slug]/page.tsx`, `components/contact.tsx`에 연동 완료.
- `pnpm.cmd exec tsc --noEmit` 타입 체크 통과.

### Step 2. 실제 프로젝트 미디어 준비 및 배치 — [구조 완료 · 실제 미디어 교체 대기]
- `public/projects/` 디렉터리 및 미디어 배치 가이드([README.md](file:///c:/nn/public/projects/README.md)) 생성 완료.
- 현재는 `public/placeholders/`의 임시 이미지로 동작하며, 실제 공개 시 편집 원본을 제외한 웹용 썸네일·상세 이미지·MP4 영상을 `public/projects/[slug]/`에 배치하고 YouTube 대체본 ID를 확보하면 즉시 교체 가능.

### Step 3. 실제 프로젝트 데이터 입력 (`content/projects.ts`) — [스키마·샘플 검증 완료 · 실제 데이터 교체 대기]
- `content/projects.ts`에 `CATEGORIES`, `Project`, `MediaItem`(`image` / `video` / `youtube`) 및 샘플 4건(`sample-identity`, `poster-series`, `editorial-layout`, `title-only`)이 구현되어 있음.
- 실제 공개할 3~4개 프로젝트 정보 확정 시 샘플 데이터를 교체하고 미사용 `public/placeholders/` 파일을 정리하면 완료.

### Step 4. 경계 사례 및 반응형 검수 — [코드 구현 검증 완료]
- **그리드 줄바꿈**: `components/project-list.tsx`에서 `grid-cols-2 md:grid-cols-4` (`768px` 기준) 및 필터 `flex-wrap` 적용 확인.
- **콘텐츠 변형**: 빈 목록/빈 카테고리(안내 문구 없이 필터·Contact 유지), `title-only`(제목만 공개 시 선택 필드/라벨 생략), 미디어 없는 상세 처리 확인.
- **텍스트/미디어**: `break-keep [overflow-wrap:anywhere]`로 한영 혼용 모바일 줄바꿈 처리, `components/media-item.tsx`에서 이미지 원본 비율(`object-contain`), MP4 `<video controls>`, YouTube `youtube-nocookie.com` 임베드 구현 확인.
- **Contact**: `content/profile.ts` 기반 `mailto:` 및 `Instagram` 외부 링크 연결 확인.

### Step 5. 프로덕션 빌드 검증 및 Vercel 배포 — [빌드 검증 완료 · 배포 대기]
- `pnpm.cmd exec tsc --noEmit` 타입 체크 통과 (`exit code 0`).
- `pnpm.cmd exec next build --webpack` 프로덕션 빌드 통과 — 정적 페이지 7건(`/`, `/_not-found`, `/projects/sample-identity`, `/projects/poster-series`, `/projects/editorial-layout`, `/projects/title-only`) 생성 확인 (`exit code 0`). *(참고: Windows 환경에서 기본 Turbopack 빌드는 `globals.css` PostCSS 워커 이슈가 있어 `--webpack` 플래그로 검증함)*
- 남은 작업: GitHub 저장소(`juuhea/nn`)를 Vercel에 연결해 배포하고, 외부 브라우저에서 `/` 및 `/projects/[slug]` 최종 확인.
