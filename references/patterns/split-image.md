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
