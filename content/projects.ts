/**
 * Portfolio content — the single source of truth for the list and detail pages.
 * To add a project, append an object to `projects`. Only `title` and `slug` are required.
 *
 * Sample entries below use temporary images under /public/placeholders.
 * Replace the `thumbnail` / `media` paths (and text) with real work later.
 */

export const CATEGORIES = [
  'Branding',
  'Graphic',
  'Editorial',
  'Typography',
  '3D',
  'Motion',
] as const

export type Category = (typeof CATEGORIES)[number]

export type Thumbnail = {
  src: string
  alt?: string
  width: number
  height: number
}

export type MediaItem =
  | { type: 'image'; src: string; alt?: string; width: number; height: number }
  | { type: 'video'; src: string; poster?: string; title?: string }
  | { type: 'youtube'; id: string; title?: string }

export type Project = {
  title: string
  slug: string
  category?: Category
  year?: string
  thumbnail?: Thumbnail
  period?: string
  role?: string
  description?: string
  media?: MediaItem[]
}

export const projects: Project[] = [
  {
    title: 'Sample Identity 샘플 브랜드 아이덴티티 시안',
    slug: 'sample-identity',
    category: 'Branding',
    year: '2025',
    thumbnail: {
      src: '/placeholders/thumb-branding.png',
      alt: '임시 썸네일: 기하학적 도형이 놓인 브랜드 시안',
      width: 928,
      height: 1152,
    },
    period: '2025.03 – 2025.06',
    role: 'Concept, Visual Design',
    description:
      '상세 화면 레이아웃을 확인하기 위한 샘플 설명입니다. 실제 프로젝트 내용으로 교체해 주세요.\nThis is placeholder copy used to check the detail layout.',
    media: [
      {
        type: 'image',
        src: '/placeholders/detail-portrait.png',
        alt: '임시 상세 이미지: 세로형 포스터',
        width: 848,
        height: 1264,
      },
      {
        type: 'image',
        src: '/placeholders/detail-landscape.png',
        alt: '임시 상세 이미지: 가로형 배너',
        width: 1376,
        height: 768,
      },
    ],
  },
  {
    title: 'Poster Series',
    slug: 'poster-series',
    category: 'Graphic',
    year: '2024',
    thumbnail: {
      src: '/placeholders/thumb-graphic.png',
      alt: '임시 썸네일: 컬러 도형 포스터',
      width: 928,
      height: 1152,
    },
  },
  {
    title: 'Editorial Layout',
    slug: 'editorial-layout',
    category: 'Editorial',
    year: '2024',
    thumbnail: {
      src: '/placeholders/thumb-editorial.png',
      alt: '임시 썸네일: 에디토리얼 레이아웃',
      width: 928,
      height: 1152,
    },
  },
  {
    title: 'Title Only 제목만 있는 프로젝트',
    slug: 'title-only',
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
