# 좌우 분할 + 카드 레이아웃

좌측 텍스트 패널 + 우측 카드 구성. 소스: `split-patterns/split-patterns.html`

공통 레이아웃 토큰은 `_layout-tokens.md` 참조.

---

## 카드 3장 세로 스택 (SP-01)

**구도:** 좌 55% 텍스트 + 우 45% 이모지 카드 3장

**핵심 CSS:**
- `.left { width: 55%; padding: 7cqw 5cqw 7cqw 6.5cqw; gap: 2cqw; }`
- `.right { width: 45%; padding: 6cqw 5cqw 6cqw 2cqw; gap: 2cqw; }`
- `.kpi-card { display: flex; align-items: center; gap: 1.5cqw; background: #fff; border-radius: 1.2cqw; padding: 1.5cqw 2cqw; box-shadow: 0 2px 12px rgba(0,0,0,.05); }`
- 이모지: 4.5cqw, 타이틀: 3cqw

**레이아웃:**
```
┌──────────────────────┬────────────────────┐
│                      │                    │
│ LABEL                │  🔥 제목           │
│                      │  설명 텍스트       │
│ 메인 타이틀          │                    │
│ 두 줄               │  😵 제목           │
│                      │  설명 텍스트       │
│ 설명 텍스트...       │                    │
│                      │  💸 제목           │
│                      │  설명 텍스트       │
└──────────────────────┴────────────────────┘
```

---

## 아이콘 박스 카드 3장 (SP-02)

**구도:** 좌 42% 텍스트 + 우 58% 기능 카드 3장 (컬러 아이콘 박스 + 텍스트)

**핵심 CSS:**
- `.left { width: 42%; padding: 7cqw 4cqw 7cqw 6cqw; gap: 1.5cqw; }`
- `.right { width: 58%; padding: 5cqw 5cqw 5cqw 2cqw; gap: 2cqw; }`
- `.feat-card { display: flex; align-items: center; gap: 1.5cqw; padding: 1.8cqw 2.2cqw; background: #fff; border-radius: 1cqw; border: 1px solid tint; }`
- `.feat-icon { width: 4.2cqw; height: 4.2cqw; border-radius: .8cqw; background: tint; }` — 아이콘 배경 박스
- 아이콘 내 이모지: 2.6cqw

**레이아웃:**
```
┌─────────────────┬──────────────────────────┐
│                 │                          │
│ LABEL           │  [⚡] 제목              │
│                 │  설명 텍스트...          │
│ 메인 타이틀     │                          │
│ 두 줄          │  [⚙️] 제목              │
│                 │  설명 텍스트...          │
│ 설명...         │                          │
│                 │  [🔒] 제목              │
│                 │  설명 텍스트...          │
└─────────────────┴──────────────────────────┘
```

---

## 다크 패널 + 2x2 카드 그리드 (SP-05)

**구도:** 좌 38% 다크 패널 + 우 62% 라이트 2x2 카드 그리드

**핵심 CSS:**
- `.left { width: 38%; background: #1A1F2E; padding: 6cqw 4cqw 6cqw 5cqw; justify-content: center; gap: 2cqw; }`
- 좌측 하단 통계: `border-top: 1px solid rgba(255,255,255,.1); display: flex; gap: 3cqw;`
- `.right { width: 62%; background: #F3F4FB; display: grid; grid-template-columns: 1fr 1fr; gap: 2cqw; padding: 4.5cqw; align-content: center; }`
- `.grid-card { background: #fff; border-radius: 1cqw; padding: 2.2cqw 2cqw; box-shadow: 0 2px 10px rgba(0,0,0,.04); }`
- 카드 내 이모지: 4cqw

**레이아웃:**
```
┌────────────────┬───────────────────────────┐
│ (dark)         │  (light)                  │
│                │  ┌──────┐  ┌──────┐       │
│ LABEL          │  │🚀    │  │🤝    │       │
│                │  │제목   │  │제목   │       │
│ 메인 타이틀    │  │설명   │  │설명   │       │
│                │  └──────┘  └──────┘       │
│ 설명...        │  ┌──────┐  ┌──────┐       │
│                │  │📈    │  │🧠    │       │
│ ───────        │  │제목   │  │제목   │       │
│ N 수치  N 수치 │  │설명   │  │설명   │       │
└────────────────┴───────────────────────────┘
```

---

## 2x2 메트릭 그리드 (SP-08)

**구도:** 좌 40% 텍스트 + 우 60% 2x2 KPI 카드

**핵심 CSS:**
- `.left { width: 40%; padding: 7cqw 3cqw 7cqw 6cqw; gap: 1.5cqw; }`
- `.right { width: 60%; display: grid; grid-template-columns: 1fr 1fr; gap: 1.8cqw; padding: 5cqw 5cqw 5cqw 2cqw; align-content: center; }`
- `.metric-card { background: #fff; border-radius: 1.2cqw; padding: 2.2cqw 2cqw; box-shadow: 0 1px 6px rgba(0,0,0,.04); }`
- 이모지 아이콘: 3.2cqw
- `.metric-value { font-size: 2.8cqw; font-weight: 800; letter-spacing: -.03em; }`
- `.metric-change { font-size: 0.85cqw; font-weight: 600; }` — 상승 #10B981 / 하락 #EF4444

**레이아웃:**
```
┌─────────────────┬──────────────────────────┐
│                 │                          │
│ LABEL           │  📈 2.4M    🎯 8.7%     │
│                 │  라벨        라벨        │
│ 메인 타이틀     │  +23%       +1.8%p      │
│                 │                          │
│ 설명...         │  💰 ₩32억   😍 78%      │
│                 │  라벨        라벨        │
│                 │  +41%       -2%         │
└─────────────────┴──────────────────────────┘
```

---

## 후기 카드 스택 (SP-09)

**구도:** 좌 40% 텍스트+별점 + 우 60% 후기 카드 2장

**핵심 CSS:**
- `.left { width: 40%; padding: 7cqw 3cqw 7cqw 6cqw; gap: 1.8cqw; }`
- 별점: `★★★★★` 텍스트 + 평균 점수
- `.right { width: 60%; padding: 5cqw 5cqw 5cqw 2cqw; gap: 2cqw; }`
- `.review-card { background: #fff; border-radius: 1.2cqw; padding: 2.2cqw 2.5cqw; box-shadow: 0 2px 10px rgba(0,0,0,.04); }`
- `.review-text { font-size: 1.1cqw; font-style: italic; }`
- 저자 아바타: 3cqw 원형, 이니셜 + 배경색

**레이아웃:**
```
┌─────────────────┬──────────────────────────┐
│                 │                          │
│ LABEL           │  "인용 텍스트..."        │
│                 │  ── 이름, 직함           │
│ 메인 타이틀     │                          │
│                 │  "인용 텍스트..."        │
│ 설명...         │  ── 이름, 직함           │
│                 │                          │
│ ★★★★★ 4.9     │                          │
└─────────────────┴──────────────────────────┘
```

---

## 안티패턴

| 문제 | 설명 |
|------|------|
| 좌우 비율 50:50 | 시각적으로 밋밋 — 38:62 ~ 55:45 비대칭 권장 |
| 카드에 flex:1 | 세로로 늘어남 — padding/gap으로 조절 |
| 이모지 크기 불일치 | 같은 슬라이드 내 이모지는 동일 크기 유지 |
