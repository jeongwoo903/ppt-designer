# 커버 슬라이드 패턴 라이브러리

검증된 커버 슬라이드 4종. 전체 소스는 `cover-patterns/covers.html` 참조.

## 01 — Scatter Pills ⭐

**구도:** 좌상단 타이틀 + 우하단 pills/이모지 대각선 흐름
**배경:** Light (#F5F6FA)

**핵심 CSS:**
- pills를 `position: absolute`로 우하단 영역에 배치
- 각 pill에 `rotate(-15° ~ 15°)` 랜덤 기울기
- pills 크기: `font-size: 1.1-1.3cqw; padding: 0.6-0.8cqw 1.6-2cqw;`
- 3D 이모지 3-4개를 pill 사이에 산포 (5-7cqw 크기)
- 타이틀은 좌측, 발표자는 좌하단 absolute

**레이아웃:**
```
┌──────────────────────────────────────┐
│  Presentation                        │
│  SEO를 넘어                           │
│  GEO로              🔍 [ChatGPT]     │
│  뉴스룸 적용 사례    [AI Search] 🤖   │
│                   [Perplexity]       │
│                [Citability] [llms]   │
│                     📄 [E-E-A-T]    │
│  장정우 · 2026.03     [JSON-LD] 🧠  │
└──────────────────────────────────────┘
```

**무드:** 에너지, 키워드 풍부, 테크 컨퍼런스

---

## 02 — Dark Cinematic

**구도:** 중앙 정렬, 다크 배경 + 블루 글로우
**배경:** Dark (#0a0e17)

**핵심 CSS:**
- 배경: radial-gradient로 중앙에 블루 글로우 (opacity 15-20%)
- 타이틀 중앙 정렬, "GEO" 부분만 primary 컬러
- 상하에 thin line (1px, 반투명 white)
- label: `font-size: 1cqw; letter-spacing: .2em; uppercase`
- 주변 장식 텍스트 없이 깔끔하게

**레이아웃:**
```
┌──────────────────────────────────────┐
│             (dark bg + blue glow)    │
│                                      │
│  ─────────────────────────────────── │
│        Presentation — 뉴스룸         │
│         SEO를 넘어 GEO로             │
│         뉴스룸 적용 사례              │
│  ─────────────────────────────────── │
│                                      │
│           장정우 · 2026. 03          │
└──────────────────────────────────────┘
```

**무드:** 프리미엄, 시네마틱, 임팩트

---

## 03 — Split Image

**구도:** 좌 55% 텍스트 + 우 45% 풀블리드 이미지
**배경:** 좌 White / 우 이미지

**핵심 CSS:**
- `display: flex` 좌우 분할
- 좌측: padding 5cqw, 텍스트 세로 중앙
- 우측: `width: 45%; img { width:100%; height:100%; object-fit:cover; }`
- 태그 pill 1개 (좌상단)
- 이미지는 sharp rectangle (분할 경계 직선)

**레이아웃:**
```
┌────────────────────┬─────────────────┐
│  Presentation      │                 │
│                    │                 │
│  SEO를 넘어        │    (full-bleed  │
│  GEO로             │     image)      │
│  뉴스룸 적용 사례   │                 │
│                    │                 │
│  장정우 · 2026.03  │                 │
└────────────────────┴─────────────────┘
```

**무드:** 클린, 프로페셔널, 범용

---

## 10 — Image Sidebar

**구도:** 좌 35% 이미지 + 우 65% 텍스트+pills
**배경:** 좌 이미지 / 우 White

**핵심 CSS:**
- `display: flex` 좌우 분할
- 좌측: `width: 35%; img { width:100%; height:100%; object-fit:cover; }`
- 우측: padding 5cqw, 타이틀 + subtitle + pills + 발표자
- pills: `flex-wrap: wrap; gap: 0.5cqw;` 자연스러운 흐름
- 이모지 없음 — pills + 텍스트만으로 구성

**레이아웃:**
```
┌─────────────┬────────────────────────┐
│             │  Presentation          │
│             │                        │
│  (image,    │  SEO를 넘어            │
│   full      │  GEO로                 │
│   bleed)    │  뉴스룸 적용 사례       │
│             │  [pill] [pill] [pill]   │
│             │                        │
│             │  장정우 · 2026.03      │
└─────────────┴────────────────────────┘
```

**무드:** 에디토리얼, 매거진, 세련

---

## 안티패턴 (탈락 사유 기록)

| 패턴 | 탈락 사유 |
|------|----------|
| Gradient Mesh | 아이콘이 제각각 배치 — 통일감 없음 |
| Card Mosaic | 배치/사이즈 중구난방 |
| Asymmetric Blocks | 레이아웃 자체가 불안정 |
| Minimal Line | 라인이 디자인에 기여하지 않음 |
| Emoji Hero | 중앙 이모지가 텍스트 가독성 저해 |
| Bold Typography | 깔끔하지만 타협 수준 — 패턴으로 미채택 |
