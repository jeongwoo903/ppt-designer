# Design Inspiration — 참조 패턴

유저가 "다양하게", "창의적으로", "심심하지 않게" 요청할 때 참조하는 디자인 영감 모음.
ADR(금지 규칙)과 달리 이건 **"이런 것도 할 수 있다"**는 가능성 확장용.

디자인을 볼 때 **배경 · 콘텐츠 · 레이아웃 · 용도** 4가지 축으로 분석한다.

---

## 1. 배경 (Background)

### 이미지 + 컬러 오버레이
- **배경:** 실제 사진 위에 단색 오버레이 (70-80% opacity)
- **콘텐츠:** 오버레이 위에 흰 카드나 밝은 텍스트
- **레이아웃:** 상단 니즈 카드 → 하단 솔루션 카드, 점선 연결
- **용도:** Problem/Solution, Needs & Solution, 서비스 소개

### 단색 컬러 배경 + 장식 도형
- **배경:** 전면 컬러 (초록, 노랑, 보라 등) + 큰 원형/블롭 도형 (같은 계열 명암 변화)
- **콘텐츠:** 모서리에 3D 에셋(이모지)을 배치해서 여백 채우기, 중앙에 데이터 카드
- **레이아웃:** 센터 타이틀 + 2-3개 카드 + 장식 에셋
- **용도:** 배경/맥락 설명, 데이터 강조, 시장 현황

### 컬러 블록 분할
- **배경:** 슬라이드를 2-3개의 컬러 블록으로 나눔 (다크 + 컬러 + 화이트)
- **콘텐츠:** 각 블록 안에 서로 다른 콘텐츠 (기능 목록 / 앱 목업 / 텍스트)
- **레이아웃:** 비대칭 블록 — 좌상 다크 카드 + 좌하 텍스트 + 우측 전면 컬러+이미지
- **용도:** 기능 소개, 제품 소개, 서비스 비교

### 전면 컬러 배경 + 앱 목업
- **배경:** 노란, 보라, 블루 등 대담한 단색
- **콘텐츠:** 앱 스크린샷 2-3장 겹침 배치 + 레이블 chip이 화살표로 특정 부분 가리킴
- **레이아웃:** 좌우 분할 — 좌측 설명 텍스트 + 우측 목업 이미지
- **용도:** 앱/서비스 소개, 홈 화면 설명, UX 플로우

---

## 2. 콘텐츠 (Content)

### 에셋으로 여백 채우기
- 빈 공간에 3D 이모지를 rotate해서 장식으로 배치
- 카드 경계에서 삐져나오는 느낌 (overflow visible)
- 크기: 5-8cqw, opacity 100%
- 여백이 "비어 보이는" 문제를 해결

### Pill Chip 적극 활용
- 해시태그: `#캠핑족 #홈파티 #미니아웃`
- 카테고리 태그: pill 그룹으로 분류 체계 시각화
- 기능 목록: 이모지 + 텍스트 pill (어두운 카드 위에 밝은 pill)
- 어두운 배경에는 밝은 pill, 밝은 배경에는 outlined pill

### 그룹핑은 배경 카드로
- 선(divider)으로 구분하는 대신, 라운드 카드 배경으로 그룹 경계 표현
- 카드 안에 서브 세그먼트를 나열 — 시각적으로 논리 구조가 한눈에 읽힘
- 그룹 라벨은 카드 상단에 작은 텍스트로

---

## 3. 레이아웃 (Layout)

### Needs → Solution 수직 흐름
- **배경:** 이미지+오버레이
- **콘텐츠:** 상단 니즈 카드 N개 (반투명 테두리) → 점선 → 하단 솔루션 카드 N개 (흰 카드, 체크 아이콘)
- **레이아웃:** 수직 2단 + 점선 연결
- **용도:** Problem/Solution, 서비스 가치 제안

### 2-Point 좌우 구조
- **배경:** 연한 회색 또는 화이트
- **콘텐츠:** 좌우 각각 제목 + 설명 + 하단 카드 (태그/카테고리 chip 그룹)
- **레이아웃:** 좌우 2컬럼, 상단 섹션 제목 + 수평선
- **용도:** 서비스 장점, 비교, 포인트 정리

### 세그먼트 그룹핑
- **배경:** 연한 회색 + 하단에 큰 라운드 카드
- **콘텐츠:** 카드 안에 3컬럼 세그먼트 + 해시태그 chip + 설명
- **레이아웃:** 카드의 범위가 그룹 경계 (main group / sub group으로 분리)
- **용도:** 타겟 분석, 시장 세분화, 페르소나

### 비대칭 블록 조합
- **배경:** 다크 블록 + 컬러 블록 + 화이트
- **콘텐츠:** 다크 카드에 기능 pill 목록 + 컬러 영역에 앱 목업 겹침 배치
- **레이아웃:** 50:50이 아닌 불균형 (좌상+좌하 / 우측 전체)
- **용도:** 기능 소개, 제품 비교, 서비스 설명

---

## 4. 용도별 추천 조합

| 용도 | 추천 배경 | 추천 콘텐츠 | 추천 레이아웃 |
|------|---------|-----------|------------|
| Problem/Solution | 이미지+오버레이 | 니즈→솔루션 카드 | 수직 2단 흐름 |
| 서비스 소개 | 컬러 블록 분할 | 앱 목업 + pill chip | 비대칭 블록 |
| 시장 배경 | 컬러+장식 도형 | 데이터 카드 + 3D 에셋 | 센터 타이틀 + 카드 |
| 타겟 분석 | 연한 회색 | 세그먼트 카드 + 해시태그 | 그룹핑 카드 |
| 기능 나열 | 다크 + 컬러 블록 | pill chip 목록 + 이모지 | 비대칭 블록 |
| 앱 UX 설명 | 전면 컬러 | 목업 겹침 + 레이블 | 좌우 분할 |
| 포인트 정리 | 화이트/연회색 | Point 카드 + chip 그룹 | 2-Point 좌우 |

| As-is / To-be 비교 | 연한 회색 | 번호 배지 + 상하 분할 카드 (상 회색/하 컬러) | 4-column 카드 |
| 뉴스/기사 인용 | 화이트/연블루 | 기사 카드 + 분류 태그 chip | 좌1 + 우2 비대칭 그리드 |
| 차트 + KPI | 연한 회색 | radar/bar 차트 + KPI 카드 그리드 | 좌 차트 + 우 2x2 카드 |
| 리서치 결과 | 다크 | donut 차트 + speech bubble 카드 | 좌 차트 + 우 버블 스택 |
| A/B 테스트 결과 | 다크 | bar 차트 카드 + delta 숫자 + 설명 | 2-column 카드 |
| 의사결정/플로우 | 라이트 | 원형 도형 + 화살표 흐름 | 수평 circle flow |
| Pain→Solution | 다크 | 3x2 그리드 (상 문제 / 하 솔루션) + 연결 dot | 3-col × 2-row |
| UX 전략 | 다크 | grouped cards + 그룹 라벨 + separator | ESSENCE + CORE wrapping |

---

## 5. Additional Patterns (Round 2)

### Staggered 3-Column Cards
- **Background:** Light blue/gray (#EDF2F7)
- **Content:** 3 cards at different vertical heights (staircase effect), each with colored title + description + abstract graphic/icon at bottom
- **Layout:** 3-column, cards offset vertically (left: high, center: middle, right: low OR center elevated)
- **Purpose:** Service keywords, feature categories, value propositions

### News/Article Citation Grid
- **Background:** White/light blue tint
- **Content:** Article excerpt cards (source logo + date + headline + body) with category tag chips at card corners
- **Layout:** Left large card (60%) + right 2 smaller cards stacked (40%) — asymmetric grid
- **Purpose:** Problem awareness, market background, press coverage, user pain points

### Dual-Persona Feature Layout
- **Background:** White with colored block sections (dark card + colored card side by side)
- **Content:** Two persona blocks — each with title + emoji pill chips listing features, plus app mockup screenshots overlapping on the colored side
- **Layout:** 2x2 grid (top-left: dark feature card, top-right: logo+label, bottom-left: text+pills, bottom-right: colored bg + overlapping mockups)
- **Purpose:** Two-sided service explanation (employer/employee, buyer/seller, etc.)

### As-Is → To-Be Comparison Cards
- **Background:** Light gray
- **Content:** N cards (3-4), each split vertically — top half gray (As-is problem) + bottom half colored (To-be solution), numbered badge at top, arrow ↓ between halves
- **Layout:** 4-column equal cards, title left-aligned above
- **Purpose:** UX improvement summary, feature comparison, before/after analysis

### Title + Staggered Feature Cards
- **Background:** Light gray
- **Content:** Left: title block + description text. Right: 3 cards at ascending heights (staircase), each with icon + subtitle + description. Cards vary in bg color (white, accent, white)
- **Layout:** Left 35% text + Right 65% staggered cards
- **Purpose:** Service introduction, feature highlights, value proposition

### Chart + KPI Card Combo
- **Background:** Light gray
- **Content:** Left: radar/spider chart or bar chart (use Chart.js or pure CSS). Right: 2x2 KPI card grid — each card with icon + big number + label. Some cards with colored bg (accent), others white
- **Layout:** Left 50% chart + Right 50% KPI grid
- **Purpose:** Performance dashboard, competitive analysis, survey results
- **Note:** For charts, consider using Chart.js CDN (`https://cdn.jsdelivr.net/npm/chart.js`) for radar/bar/line charts

---

## 6. Additional Patterns (Round 3)

### Donut Chart + Speech Bubbles (Dark)
- **Background:** Dark (#1a1a2e)
- **Content:** Left: title + description + donut/ring chart (CSS `conic-gradient`) with percentage in center + source note. Right: 2 dark speech bubble cards stacked, each with category tag chip (accent color) + numbered point + description
- **Layout:** Left 45% (text + chart) + Right 55% (speech bubbles)
- **Purpose:** Survey results, user research findings, pain point analysis with data backing

### Result Data — Bar Chart Cards (Dark)
- **Background:** Dark gray (#2a2a3a)
- **Content:** 2 side-by-side dark cards, each containing: big delta number at top (+10.5%p), bar chart (2-3 bars, before/after comparison), title + highlighted metric + explanation paragraph
- **Layout:** 2-column equal cards, section label + title at top-left
- **Purpose:** A/B test results, before/after metrics, performance comparison

### Circle Flow — Decision Process
- **Background:** Light gray
- **Content:** Large circles (dark/light alternating) connected by arrows in a horizontal flow. Center circles form a group wrapped by a label. Text inside each circle describes a step
- **Layout:** Horizontal flow, circles sized to content importance (outer = large, inner = medium)
- **Purpose:** Service direction, decision framework, value chain, brand positioning
- **Note:** Circle sizing and spacing are critical — equal-sized circles look mechanical

### Pain Point → Solution (Dark Grid)
- **Background:** Dark (#1e1e2e)
- **Content:** Top row: 3 pain point cards (dark glass bg, light text). Bottom row: 3 solution cards (slightly lighter glass bg, bold title + description). Small decorative accent dots between rows connecting pain→solution
- **Layout:** 3-column × 2-row grid with section labels ("Pain Point & Needs" / "Solution")
- **Purpose:** Problem/solution mapping, service direction, feature justification

### Narrative Journey (Dark + Accent Wave)
- **Background:** Dark with gradient wave/curve at bottom (accent color, e.g. orange/coral)
- **Content:** Top-left: section label + large title. Center-right: accent-colored callout badge + speech bubble with quote. Hashtag chips scattered. Bottom: subtle wave gradient
- **Layout:** Asymmetric — title top-left, callout center-right, wave bottom
- **Purpose:** Brand story, user journey moment, case study highlight
- **Note:** Wave implemented via `border-radius` or `clip-path` on a colored div

### Strategy + Core Wrapping
- **Background:** Dark (#1a1a2e)
- **Content:** Top: centered title + bilingual description. Bottom: grouped cards — left group ("ESSENCE") has 3 cards with emoji/icon + Korean title + English subtitle + description. Right group ("CORE") has 1 card, separated by a `+` symbol. All cards have subtle dark glass bg
- **Layout:** Center title + bottom card group with visible grouping labels
- **Purpose:** UX strategy, core value proposition, strategic framework
- **Note:** The group labels (ESSENCE / CORE) above the card groups with + separator create clear logical structure

---

## 색상 활용 원칙

- **단색 배경은 대담하게** — 연두, 노랑, 보라, 코랄을 두려워하지 마
- **어두운 배경 + 밝은 카드** — 대비가 콘텐츠를 살림
- **같은 색의 명암 변화** — 배경 초록 + 도형 진한초록 + 텍스트 흰색
- **회색만 쓰지 마** — 기본이 #F5F6FA면 무난하지만 심심. 유저가 원하면 컬러 적극 사용
