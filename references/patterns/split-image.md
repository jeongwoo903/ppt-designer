# 좌우 분할 + 이미지 레이아웃

한쪽에 텍스트, 반대쪽에 풀블리드 이미지. 소스: `split-patterns/split-patterns.html`

공통 레이아웃 토큰은 `_layout-tokens.md` 참조.

---

## 다크 인용 + 풀 이미지 (SP-03)

**구도:** 좌 55% 인용문 (다크) + 우 45% 풀 이미지 (그라디언트 오버레이)

**핵심 CSS:**
- `.slide { background: #111; display: flex; flex-direction: row; align-items: stretch; }`
- `.left { width: 55%; padding: 7cqw 5cqw 7cqw 6.5cqw; gap: 2.5cqw; }`
- `.quote-mark { font-size: 5cqw; color: accent; font-family: Georgia, serif; }`
- `.quote-text { font-size: 2.2cqw; font-weight: 600; color: #fff; line-height: 1.55; }`
- 저자: bar(3cqw, accent) + 이름 + 역할
- `.right img { width: 100%; height: 100%; object-fit: cover; }`
- `.img-overlay { background: linear-gradient(to right, #111 0%, transparent 30%); }` — 좌→우 페이드

**레이아웃:**
```
┌──────────────────────┬────────────────────┐
│  (dark)              │                    │
│  "                   │                    │
│                      │    (full image)    │
│  인용 텍스트         │                    │
│  여러 줄...          │  ← gradient fade   │
│                      │                    │
│  ── 이름             │                    │
│     역할             │                    │
└──────────────────────┴────────────────────┘
```

참고: cover.md의 Split Image(03), Image Sidebar(10)도 좌우분할+이미지 구조.

---

## 이미지 좌측 + 텍스트 우측 (C08)

**구도:** 좌 45% 풀블리드 이미지 + 우 55% 텍스트 + 정보 항목
**소스:** `center-patterns/center-07-09.html` C08

**핵심 CSS:**
- `.slide { display: flex; flex-direction: row; align-items: stretch; }`
- 좌측: `width: 45%; img { width: 100%; height: 100%; object-fit: cover; }` — border-radius 없음 (sharp edge)
- 우측: `width: 55%; padding: 5cqw; display: flex; flex-direction: column; justify-content: center;`
- 섹션 라벨: 0.85cqw, accent 컬러 (amber 등)
- 타이틀: 2.5cqw, bold 800, `white-space: pre-line`
- 설명: 1.0cqw, muted, 2-3줄
- 하단 정보 항목: 3개 가로 배치, 각각 이모지(2.5cqw) + 수치 + 라벨, divider로 구분

**레이아웃:**
```
┌─────────────┬────────────────────────┐
│             │  BRAND STORY           │
│             │                        │
│  (image,    │  매일 아침,            │
│   full      │  한 잔의 정성          │
│   bleed)    │                        │
│             │  설명 텍스트...        │
│             │                        │
│             │  🏠 12개 │ 📅 14년 │ ☕ 8만잔 │
└─────────────┴────────────────────────┘
```

**무드:** 에디토리얼, 브랜드 스토리, 제품 소개
