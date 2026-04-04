# 커버 슬라이드 패턴 라이브러리

검증된 커버 슬라이드 8종. 전체 소스는 `cover-patterns/covers.html`, `covers-v2.html` 참조.

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

## 13 — Full Image + Overlay

**구도:** 풀블리드 이미지 + 하단 다크 그라데이션 오버레이
**배경:** 이미지 (Unsplash)

**핵심 CSS:**
- 풀블리드 이미지 배경 (`object-fit: cover`)
- 하단 그라데이션 오버레이: `linear-gradient(transparent → rgba(0,0,0,.82))`
- 타이틀 하단-좌측 (오버레이 위 흰색 텍스트)
- 상단에 pills 2줄 (`max-width: 36cqw`로 래핑, `backdrop-filter: blur` 다크 칩)
- font-weight: 800, letter-spacing: -0.02em

**레이아웃:**
```
┌──────────────────────────────────────┐
│  [pill][pill][pill]  (상단, 2줄)     │
│  [pill][pill]                        │
│         (full-bleed image)           │
│                                      │
│  ▓▓▓▓▓▓▓▓▓▓ (dark gradient overlay) │
│  Title                               │
│  Subtitle         장정우 · 2026.03   │
└──────────────────────────────────────┘
```

**무드:** 시네마틱, 에디토리얼, 임팩트

---

## 16-1 — Stacked Cards + Gradient Stripe ⭐

**구도:** 겹친 패스텔 카드 + 흰 메인 카드 (중앙 정렬) + 하단 컬러 스트라이프
**배경:** 회색 (#e8e8f0)

**핵심 CSS:**
- 배경 카드 3장: 패스텔 yellow/purple/green, 각각 rotate + translate 오프셋
- 메인 카드: 흰색, `text-align: center; align-items: center;`
- 하단 스트라이프: `height: 1.2cqw; background: #1B6EF3; border-radius: 0 0 1.6cqw 1.6cqw;`
- 패딩: `0 6.3cqw`
- 로켓 이모지: `bottom: -1cqw; right: -1.5cqw;` overflow visible로 카드 밖으로
- pills: 카드 바깥 회색 배경에 산포, rotate -8°~+8°
- font-weight: 800, letter-spacing: -0.02em

**칩 배치 (중요 — 이 좌표가 검증됨):**
```
bottom:5.5cqw; left:3.5%   — primary, rotate(-5deg)
bottom:9cqw; right:5%      — purple tint, rotate(6deg)
top:4.5cqw; right:3%       — accent yellow, rotate(-7deg)
top:6.5cqw; left:4.5%      — green tint, rotate(5deg)
bottom:6cqw; right:3.5%    — dark, rotate(3deg)
top:9.5cqw; right:6%       — white, rotate(-5deg)
bottom:10cqw; left:3%      — orange tint, rotate(8deg)
```

**레이아웃:**
```
┌──────────────────────────────────────┐
│ [pill]                      [pill]   │
│ [pill]  ┌────────────────┐  [pill]   │
│         │   GEO Research  │          │
│         │   SEO를 넘어    │          │
│         │   GEO로     🚀  │          │
│         │   뉴스룸 적용   │          │
│         │   장정우·2026   │          │
│ [pill]  │████████████████│  [pill]   │
│ [pill]  └────────────────┘  [pill]   │
└──────────────────────────────────────┘
```

**무드:** 플레이풀, 레이어드, 크리에이티브

---

## 18 — Duotone Image

**구도:** 풀블리드 이미지 + CSS 듀오톤 필터 + 텍스트 오버레이
**배경:** 이미지 (Unsplash) + 듀오톤 처리

**핵심 CSS:**
- 이미지: `filter: grayscale(1) contrast(1.1)`
- 오버레이: `mix-blend-mode: multiply` + primary 컬러 그라데이션
- 추가 오버레이: 우→좌 다크 그라데이션 (텍스트 가독성)
- 타이틀 좌측, 발표자 바로 아래 inline (`장정우 · 2026. 03`)
- font-weight: 800, letter-spacing: -0.02em

**레이아웃:**
```
┌──────────────────────────────────────┐
│                                      │
│  (duotone image, blue-tinted)        │
│                                      │
│  Title                               │
│  Subtitle                            │
│  장정우 · 2026. 03                   │
│                                      │
└──────────────────────────────────────┘
```

**무드:** 스트라이킹, 매거진 커버, 에디토리얼

---

## 22 — Full Image Overlay (여행/관광 변형)

**구도:** 13과 유사하나, 더 큰 타이틀 + 워터마크 + 디테일 조정
**배경:** 이미지 (Unsplash)

**핵심 CSS:**
- label: `font-size: 1.3cqw; font-weight: 700; letter-spacing: .16em; color: rgba(255,255,255,.8);`
- title: `font-size: 6cqw; font-weight: 750; line-height: 1.06; letter-spacing: 0em;`
- subtitle: `font-size: 1.5cqw; color: rgba(255,255,255,.6); margin-top: 2cqw; font-weight: 400;`
- 워터마크: `bottom: 1cqw; right: 4cqw;` (우하단)
- 하단 오버레이 그라데이션

**레이아웃:**
```
┌──────────────────────────────────────┐
│         (full-bleed image)           │
│                                      │
│                                      │
│  ▓▓▓▓▓▓▓▓▓▓ (dark overlay)         │
│  LABEL                               │
│  Big Title                           │
│  Subtitle                 WATERMARK  │
│            장정우 · 2026.03          │
└──────────────────────────────────────┘
```

**무드:** 시네마틱, 대형 타이틀, 비주얼 임팩트

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
| Diagonal Cut (11) | 대각선 분할은 좋으나 불안정 |
| Circle Motif (12) | 원형 배치가 어색 |
| Color Block Grid (14) | 몬드리안식 블록이 PPT에 안 맞음 |
| Gradient Wave (15) | 웨이브 자체는 좋으나 배치 어려움 |
| Neon Accent (17) | 네온 과함, 텍스트 사이 선 넣으면 행간 더 넓어야 함 |
| Blob Image (19) | 블롭 형태가 불안정 |
| 중앙 이모지 bg | 텍스트 가독성 저해 — 절대 금지 |
| 칩 과다 배치 | 필요 없는데 칩 나열 = AI가 채워넣은 느낌 |
