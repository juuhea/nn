# Project Media Directory

실제 프로젝트의 웹용 미디어를 `[slug]`별 폴더에 배치합니다.

## 권장 폴더 구조

```text
public/projects/
  <slug>/
    thumb.webp (또는 .png / .jpg)   # 목록 대표 썸네일 (4:5 비율 권장)
    detail-01.webp                   # 상세 이미지 1
    detail-02.webp                   # 상세 이미지 2
    video-01.mp4                     # 직접 재생용 웹 MP4 (선택)
    video-01-poster.webp             # 영상 썸네일 포스터 (선택)
```

## 참고 기준

- 편집 원본 파일은 저장소 외부에 별도 보관하고, 웹용으로 리사이즈·압축한 파일만 배치합니다.
- 직접 재생이 어려운 대용량 영상은 YouTube 업로드 후 `content/projects.ts`에 `{ type: 'youtube', id: '<VIDEO_ID>' }` 형태로 연결합니다.
